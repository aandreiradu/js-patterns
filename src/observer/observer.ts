interface Subject {
  subscribe(observer: Observer): void;
  unsubscribe(observer: Observer): void;
  notify(...args: unknown[]): void;
}

interface Observer {
  update(subject: Subject): void;
}

export class ConcreteSubject implements Subject {
  private observers: Observer[] = [];

  public state: number = 0;

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
    console.log(`Starting to notify the observers...`);
    for (const observer of this.observers) {
      console.log('this is', this);
      observer.update(this);
    }
  }

  public someBusinessLogic(): void {
    console.log("\nSubject: I'm doing something important.");
    this.state = Math.floor(Math.random() * (10 + 1));

    console.log(`Subject: My state has just changed to: ${this.state}`);
    this.notify();
  }
}

export class ConcreteObserverA implements Observer {
  update(subject: Subject): void {
    console.log('ConcreteObserverA reacting to the state change');
  }
}

export class ConcreteObserverB implements Observer {
  update(subject: Subject): void {
    console.log('ConcreteObserverA reacting to the state change');
  }
}
