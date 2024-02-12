# Strategy

This example shows the implementation of _`Strategy`_.

_`Strategy`_ is a behavioral design pattern that turns a set of behaviors into objects and makes them interchangeable inside original context object.

The original object, called context, holds a reference to a strategy object. The context delegates executing the behavior to the linked strategy object. In order to change the way the context performs its work, other objects may replace the currently linked strategy object with another one.

## Pros and Cons

| Pros                                                     |                                                                                          Cons                                                                                          |
| -------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| You can swap algorithms used inside an object at runtime | If you only have a couple of algorithms and they rarely change, there’s no real reason to overcomplicate the program with new classes and interfaces that come along with the pattern. |

| You can isolate the implementation details of an algorithm from the code that uses it. | Clients must be aware of the differences between strategies to be able to select a proper one. |
| You can replace inheritance with composition. | A lot of modern programming languages have functional type support that lets you implement different versions of an algorithm inside a set of anonymous functions. Then you could use these functions exactly as you’d have used the strategy objects, but without bloating your code with extra classes and interfaces. |
| Open/Closed Principle. You can introduce new strategies without having to change the context. | |
