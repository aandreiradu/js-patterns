interface Observable {
  subscribe(observer: Observer): void;
  unsubscribe(observer: Observer): void;
  notify(...args: unknown[]): void;
}

interface Observer {
  update(...args: unknown[]): void;
}

export class ProductCatalog implements Observable {
  private observers: Observer[] = [];

  subscribe(observer: Observer): void {
    const exists = this.observers.includes(observer);
    if (exists) {
      return console.log(`This observer ${observer} already exists`);
    }

    this.observers.push(observer);
  }

  unsubscribe(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);

    if (observerIndex === -1) {
      return console.log(`This observer ${observer} does not exists`);
    }

    this.observers.splice(observerIndex, 1);
  }

  notify(...args: unknown[]): void {
    this.observers.forEach((observer) => {
      observer.update(...args);
    });
  }

  addProduct(name: string, price: number) {
    this.notify(name, price);
  }
}

export class AdminDashboardObserver implements Observer {
  update(name: string, price: number): void {
    console.log(
      `Received new product on admin dashboard: ${name}, price: ${price}`,
    );
  }
}

export class UserNotificationObserver implements Observer {
  update(name: string, price: number): void {
    if (name === 'iPhone' && price <= 100) {
      console.log('Sending a notification to users interested on this product');
    }
  }
}
