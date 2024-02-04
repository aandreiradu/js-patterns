export interface Bid {
  auctionId: string;
  itemId: string;
  vendor: string;
  price: number;
}

export class Auction {
  private bids: Bid[] = [];
  private maxBids = 5;
  private auctionCompleted: boolean = false;

  constructor(maxBids: number) {
    this.maxBids = maxBids;
  }

  public addBid(bid: Bid) {
    this.bids.push(bid);
  }

  public isComplete() {
    const isCompleted =
      this.auctionCompleted === true ? true : this.bids.length === this.maxBids;

    if (isCompleted) {
      this.auctionCompleted = true;
    }

    return isCompleted;
  }

  public setComplete() {
    this.auctionCompleted = true;
  }

  public getBestBid(): Bid | undefined {
    if (!this.bids.length) {
      return undefined;
    }

    return this.bids.reduce((maxBid, currentBid) => {
      return currentBid.price > maxBid.price ? currentBid : maxBid;
    }, this.bids[0]);
  }
}
