import { Message } from './aggregator';
import { Auction, Bid } from './auction';

abstract class Aggregate {
  abstract addMessage(message: Message): void;
  abstract isComplete(): boolean;
  abstract getResultsMessage(): Bid | undefined;
  abstract getTTL(): number;
  abstract setComplete(): void;
}

export class AuctionAggregate implements Aggregate {
  private auction: Auction;
  private bid: Bid | null = null;
  private TTL: number = 0;

  constructor(maxBids: number, ttl: number) {
    this.auction = new Auction(maxBids);
    this.TTL = Date.now() + ttl;
  }

  public addMessage(message: Message): void {
    try {
      const { correlationId, itemId, price, vendor } = message;

      this.bid = {
        auctionId: correlationId,
        itemId,
        price: price,
        vendor,
      };

      console.log(
        `Adding bid ${JSON.stringify(this.bid)} to aggregator with correlationId ${correlationId}`,
      );
      this.auction.addBid(this.bid);
    } catch (error) {
      console.error(`Unable to add bid; message ${JSON.stringify(message)}`);
      console.error(error);
      throw new Error('Error adding bid');
    }
  }

  public isComplete(): boolean {
    return this.auction.isComplete();
  }

  public getResultsMessage() {
    const bestBid = this.auction.getBestBid();

    return bestBid;
  }

  public getTTL(): number {
    return this.TTL;
  }

  public setComplete(): void {
    this.auction.setComplete();
  }
}
