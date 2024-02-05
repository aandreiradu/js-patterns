# Singleton

This example shows the implementation of _`Singleton`_.

The _`Singleton`_ is a creational design pattern, which ensures that only one object of its kind exists and provides a single point of access to it for any other code.

All implementations of the Singleton have these two steps in common:

    Make the default constructor private, to prevent other objects from using the new operator with the Singleton class.
    Create a static creation method that acts as a constructor. Under the hood, this method calls the private constructor to create an object and saves it in a static field. All following calls to this method return the cached object.

If your code has access to the Singleton class, then it’s able to call the Singleton’s static method. So whenever that method is called, the same object is always returned.

## Problem :(

The Singleton pattern solves two problems at the same time, violating the Single Responsibility Principle:

1. Ensure that a class has just a single instance. Why would anyone want to control how many instances a class has? The most common reason for this is to control access to some shared resource—for example, a database or a file.

2. Provide a global access point to that instance. Those global variables used to store some essential objects? While they’re very handy, they’re also very unsafe since any code can potentially overwrite the contents of those variables and crash the app.

## Pros and Cons

| Pros                                                                             |                                                                                                                                                                                                   Cons                                                                                                                                                                                                    |
| -------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| You can be sure that a class has only a single instance.                         |                                                                                                                                                        Violates the Single Responsibility Principle. The pattern solves two problems at the time.                                                                                                                                                         |
| You gain a global access point to that instance.                                 |                                                                                                                                        The Singleton pattern can mask bad design, for instance, when the components of the program know too much about each other.                                                                                                                                        |
| The singleton object is initialized only when it’s requested for the first time. |                                                                                                                               The pattern requires special treatment in a multithreaded environment so that multiple threads won’t create a singleton object several times.                                                                                                                               |
|                                                                                  | It may be difficult to unit test the client code of the Singleton because many test frameworks rely on inheritance when producing mock objects. Since the constructor of the singleton class is private and overriding static methods is impossible in most languages, you will need to think of a creative way to mock the singleton. Or just don’t write the tests. Or don’t use the Singleton pattern. |

## How to implement

1. Add a private static field to the class for storing the singleton instance.

2. Declare a public static creation method for getting the singleton instance.

3. Implement “lazy initialization” inside the static method. It should create a new object on its first call and put it into the static field. The method should always return that instance on all subsequent calls.

4. Make the constructor of the class private. The static method of the class will still be able to call the constructor, but not the other objects.

5. Go over the client code and replace all direct calls to the singleton’s constructor with calls to its static creation method.

## How to run it

```sh
pnpm singleton
```

[TS implementation here](/singleton.ts)
