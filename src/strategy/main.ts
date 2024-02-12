import { BubbleSort, Conext, CountSort } from './strategy';

const context = new Conext(new CountSort());
console.log(context.sort([0, 5, 3, 1, 2, 1]));

context.setAlgorithm(new BubbleSort());
console.log(context.sort([0, 5, 3, 1, 2, 1]));
