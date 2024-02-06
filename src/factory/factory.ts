import * as fs from 'fs';
import * as fsp from 'fs/promises';
import * as path from 'path';

type FileReaderType = 'async' | 'promises';
interface IProduct {
  readFile(filePath: string): Promise<string>;
}

class ReadFileConcrete implements IProduct {
  readFile(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      resolve('this is the default implementation of the product');
    });
  }
}

class ReadFilePromises extends ReadFileConcrete {
  readFile(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const pathToFile = path.join(__dirname, filePath);

      fs.readFile(pathToFile, 'utf-8', (err, data) => {
        if (err) {
          console.log('error reading file for ConcreteProductA', err);
          reject(err);
        }

        resolve(data);
      });
    });
  }
}

class ReadFileAsyncAwait extends ReadFileConcrete {
  async readFile(filePath: string): Promise<string> {
    try {
      const pathToFile = path.join(__dirname, filePath);

      const data = await fsp.readFile(pathToFile, 'utf-8');
      return data;
    } catch (error) {
      console.log('unable to read file using ConcreteProductB', error);
      throw new Error('Unable to read file');
    }
  }
}

export class FileReaderFactory {
  static createFileReader(type: FileReaderType): IProduct {
    switch (type) {
      case 'async': {
        return new ReadFileAsyncAwait();
      }

      case 'promises': {
        return new ReadFilePromises();
      }

      default: {
        throw new Error(`Unsupported type ${type}`);
      }
    }
  }
}
