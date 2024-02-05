export class Singleton {
  private static instance: Singleton | null = null;
  private dbConnectionString: string = '';

  private constructor() {}

  static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }

    return Singleton.instance;
  }

  public setConnectionString(connectionString: string): void {
    this.dbConnectionString = connectionString;
  }

  public getConnectionString(): string | null {
    return this.dbConnectionString ?? null;
  }
}
