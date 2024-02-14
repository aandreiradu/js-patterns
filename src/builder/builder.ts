type RoofType = 'meditarinean' | 'oriental' | 'occidental';

class House {
  walls: number;
  doors: number;
  roofType: RoofType | undefined;
  pool?: {
    width: number;
    length: number;
    height: number;
  };

  constructor() {
    this.walls = 0;
    this.doors = 0;
    this.roofType = undefined;
  }

  getHouse(): void {}
}

interface HouseBuilder {
  addWalls(): void;
  addDoors(): void;
  addRoof(): void;
  addPool(width: number, length: number, height: number): void;
  getHouse(): House;
}

export class StandardHouseBuilder implements HouseBuilder {
  private house: House;

  constructor() {
    this.house = new House();
  }

  addDoors(): void {
    this.house.doors = 1;
  }

  addWalls(): void {
    this.house.walls = 4;
  }

  addRoof(): void {
    this.house.roofType = 'oriental';
  }

  addPool(width: number, length: number, height: number): void {
    throw new Error('Standard house cannot have a pool');
  }

  getHouse(): House {
    return this.house;
  }
}

export class HouseWithPoolBuilder implements HouseBuilder {
  private house: House;

  constructor() {
    this.house = new House();
  }

  addDoors(): void {
    this.house.doors = 2;
  }

  addWalls(): void {
    this.house.walls = 4;
  }

  addRoof(): void {
    this.house.roofType = 'meditarinean';
  }

  addPool(width: number, length: number, height: number): void {
    this.house.pool = {
      height,
      length,
      width,
    };
  }

  getHouse(): House {
    return this.house;
  }
}

export class HouseDirector {
  private builder: HouseBuilder;

  constructor(builder: HouseBuilder) {
    this.builder = builder;
  }

  constructHouse(): void {
    this.builder.addWalls();
    this.builder.addDoors();
    this.builder.addRoof();
  }

  constructHouseWithPool(width: number, length: number, height: number): void {
    this.builder.addWalls();
    this.builder.addDoors();
    this.builder.addRoof();
    this.builder.addPool(width, length, height);
  }

  getHouse(): House {
    return this.builder.getHouse();
  }
}
