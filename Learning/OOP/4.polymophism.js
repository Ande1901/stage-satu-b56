class Animal {
  speak() {
    console.log("animal is speaking");
  }
}

class Duck extends Animal {
  speak() {
    console.log("Quack!");
  }
}

class Dog extends Animal {
  speak() {
    console.log("Guk Guk!");
  }
}

class Cat extends Animal {
  speak() {
    console.log("Meow");
  }
}

const animal = new Animal();
animal.speak();

const duck = new Duck();
duck.speak();
