interface Subject {
  request(): void;
}

class RealSubject implements Subject {
  public request(): void {
    console.log('Real subject implementation');
  }
}

class Proxyy implements Subject {
  private realSubject: RealSubject;

  /*
        Proxy maintains a reference to an object of the RealSubject class.
        It can be either lazy-loaded or passed to the Proxy by the client.
    */
  constructor(realSubject: RealSubject) {
    this.realSubject = realSubject;
  }

  public request(): void {
    if (this.checkAccess()) {
      this.realSubject.request();
      this.logAccess();
    }
  }

  private checkAccess(): boolean {
    console.log(`Proxy checking acces prior to firing a real request`);

    return true;
  }

  private logAccess(): void {
    console.log('Proxy: Logging the time of request.');
  }
}

function clientCode(subject: Subject) {
  subject.request();
}

console.log('Client: Executing the client code with a real subject:');
const realSubject = new RealSubject();
clientCode(realSubject);

console.log('');

console.log('Client: Executing the same client code with a proxy:');
const proxy = new Proxyy(realSubject);
proxy.request();
