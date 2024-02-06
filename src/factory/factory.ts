interface Product {
  operation(): string;
}

abstract class Creator {
  private version = 22;

  public abstract factoryMethod(): Product;

  public changeVersion(version: number): void {
    this.version = version;

    const product = this.factoryMethod();

    console.log(
      `Creator: The same creator's code has just worked with ${product.operation()}`,
    );
  }
}

class ConcreteCreator1 extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProduct1();
  }
}

class ConcreteCreator2 extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProduct2();
  }
}

class ConcreteProduct1 implements Product {
  operation(): string {
    return '{Result of the ConcreteProduct1}';
  }
}

class ConcreteProduct2 implements Product {
  operation(): string {
    return '{Result of the ConcreteProduct2}';
  }
}
