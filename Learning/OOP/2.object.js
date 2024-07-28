class Dog {
  // properties
  name = "";
  color = "";
  age = 12;
  weight = 50;
  isHappy = false;

  // special method
  constructor(name, color, age, weight, isHappy) {
    this.name = name;
    this.color = color;
    this.age = age;
    this.weight = weight;
    this.isHappy = isHappy;
  }

  // method
  sit() {
    console.log(`${this.name} berwarna ${this.color}`);
    console.log(`dia berumur ${this.age}`);
    console.log(`beratnya ${this.weight}`);
    console.log(`dan dia ${this.isHappy}`);
  }

  layDown() {}

  shake() {}

  come() {}
}

const bobby = new Dog("bobby", "merah", 12, 50, "happy");
bobby.sit();
