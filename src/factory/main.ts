import { FileReaderFactory } from './factory';

const main = async () => {
  const fileName = 'factory.txt';

  try {
    const readerAsync = FileReaderFactory.createFileReader('async');
    const readerPromises = FileReaderFactory.createFileReader('promises');
    const fileContentAsync = await readerAsync.readFile(fileName);
    const fileContentPromises = await readerPromises.readFile(fileName);

    console.log({ fileContentAsync, fileContentPromises });

    return {
      fileContentAsync,
      fileContentPromises,
    };
  } catch (error) {
    console.error('errrroooorrr', error);
    return null;
  }
};

main();
