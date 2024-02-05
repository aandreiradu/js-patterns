import { Singleton } from './singleton';

const main = () => {
  try {
    const dbInstance = Singleton.getInstance();
    dbInstance.setConnectionString(
      'Server=myServerNamemyInstanceName;Database=myDataBase;User Id=myUsername;Password=myPassword;',
    );
    const anotherInstance = Singleton.getInstance();
    console.log(anotherInstance.getConnectionString());
    console.log('Save dbInstance ', dbInstance === anotherInstance);
  } catch (error) {
    console.error(`Error ${error}`);
    return null;
  }
};

main();
