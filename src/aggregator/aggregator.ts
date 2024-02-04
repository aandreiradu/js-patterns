import { AuctionAggregate } from './auctionAggregate';

export interface Message {
  correlationId: string;
  itemId: string;
  vendor: string;
  price: number;
}

export class Aggregator {
  private activeAggregates: Map<string, AuctionAggregate>;

  constructor() {
    this.activeAggregates = new Map();
  }

  public onMessage(message: Message) {
    try {
      const correlationId = message.correlationId;
      let aggregate = this.activeAggregates.get(correlationId);

      if (!aggregate) {
        aggregate = new AuctionAggregate(3, 100000);
        this.activeAggregates.set(correlationId, aggregate);
        this.monitorAggregator(correlationId);
      }

      if (!aggregate.isComplete()) {
        aggregate.addMessage(message);
        if (aggregate.isComplete()) {
          const result = aggregate.getResultsMessage();
          console.log(
            `Aggregator finished for correlationId ${correlationId}; The best result found is ${JSON.stringify(result)}`,
          );
          return result;
        }
      } else {
        console.warn(
          `Aggregator with correlationId ${correlationId} is already completed. Skipping this message...`,
        );
      }
    } catch (error) {
      console.error(`Exception occured`, error);
      return null;
    }
  }

  public monitorAggregator(correlationId: string) {
    const aggregator = this.activeAggregates.get(correlationId);
    if (!aggregator) {
      console.error(
        `Cannot start monitoring aggregator with correlationId ${correlationId} because it's not in the active aggregates`,
      );
      return null;
    }

    const interval = setInterval(() => {
      const isCompleted = aggregator.isComplete();
      if (isCompleted) {
        console.log(
          `Aggregator with correlationId ${correlationId} is completed. Stop monitoring`,
        );
        clearInterval(interval);
        return;
      }

      const now = Date.now();
      const aggregatorTTL = aggregator.getTTL();

      if (now > aggregatorTTL) {
        clearInterval(interval);
        console.log(
          `Aggregator with correlationId ${correlationId} expired. Picking the best result...`,
        );
        aggregator.setComplete();
        const result = aggregator.getResultsMessage();
        console.log(
          `Aggregator finished for correlationId ${correlationId}; The best result found is ${JSON.stringify(result)}`,
        );
        return result;
      }
    }, 3000);
  }
}
