class Animal {
  brain = true;
  legs = 0;

  Angry() {
    console.log("angry");
  }
}

class Human extends Animal {
  legs = 2;

  Talk() {
    console.log("Talk");
  }
}

class Pet extends Animal {
  legs = 4;
  fleas = 0;
}

const animal = new Animal();
const human = new Human();
human.Talk();
human.Angry();
