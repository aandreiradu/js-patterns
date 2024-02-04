import { Aggregator, Message } from './aggregator';
import { v4 as uuidv4 } from 'uuid';

const Vendors = ['V1', 'V2', 'V3', 'V4'];
const cachedCorrelationIds = [uuidv4(), uuidv4(), uuidv4(), uuidv4()];

const main = () => {
  const aggregator = new Aggregator();

  const message = producer();
  aggregator.onMessage(message);

  setInterval(() => {
    const message = producer();
    aggregator.onMessage(message);
  }, 1000);
};

const producer = () => {
  const itemId = uuidv4();

  const message: Message = {
    correlationId:
      cachedCorrelationIds[
        Math.floor(Math.random() * cachedCorrelationIds.length)
      ],
    itemId,
    price: Math.floor(Math.random() * 100),
    vendor: Vendors[Math.floor(Math.random() * Vendors.length)],
  };

  return message;
};

main();
