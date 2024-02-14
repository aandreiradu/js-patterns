import {
  HouseDirector,
  HouseWithPoolBuilder,
  StandardHouseBuilder,
} from './builder';

const standardHouseBuilder = new StandardHouseBuilder();
const houseDirectorStandard = new HouseDirector(standardHouseBuilder);

houseDirectorStandard.constructHouse();
console.log(houseDirectorStandard.getHouse());

const houseWithPoolBuilder = new HouseWithPoolBuilder();
const houseDirectorPool = new HouseDirector(houseWithPoolBuilder);

houseDirectorPool.constructHouseWithPool(30, 30, 4);
console.log(houseDirectorPool.getHouse());
