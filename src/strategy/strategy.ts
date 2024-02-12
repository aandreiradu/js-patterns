interface SortAlgorithm {
  sort(list: number[]): number[];
}

class BubbleSort implements SortAlgorithm {
  sort(list: number[]): number[] {
    if (list.length <= 1) return list;

    const copy = list.slice();
    for (let i = 0; i < copy.length - 1; i++) {
      for (let j = i + 1; j < copy.length; j++) {
        if (copy[i] > copy[j]) {
          const temp = copy[i];
          copy[i] = copy[j];
          copy[j] = temp;
        }
      }
    }

    return copy;
  }
}

class CountSort implements SortAlgorithm {
  sort(list: number[]): number[] {
    const max = Math.max(...list);
    const occurrences = [];

    for (let i = 0; i < max + 1; i++) {
      occurrences[i] = 0;
    }

    for (let j = 0; j < list.length; j++) {
      occurrences[list[j]]++;
    }

    let index = 0;
    for (let j = 0; j < occurrences.length; j++) {
      for (let i = 0; i < occurrences[j]; i++) {
        list[index] = j;
        index++;
      }
    }

    return list;
  }
}

class Conext {
  private algorithm: SortAlgorithm;

  constructor(algorithm: SortAlgorithm) {
    this.algorithm = algorithm;
  }

  public setAlgorithm(algorithm: SortAlgorithm) {
    this.algorithm = algorithm;
  }

  public sort(list: number[]): number[] {
    return this.algorithm.sort(list);
  }
}

const context = new Conext(new CountSort());
console.log(context.sort([0, 5, 3, 1, 2, 1]));

context.setAlgorithm(new BubbleSort());
console.log(context.sort([0, 5, 3, 1, 2, 1]));
