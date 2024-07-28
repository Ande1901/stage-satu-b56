// function greeting(helloFn) {
//   console.log(`Hallo :`);
//   helloFn();
// }

// greeting(function test() {
//   for (let x = 0; x < 10; x++) {
//     console.log(`bro`);
//   }
// });

// function sum(a) {
//   return function (b) {
//     return a + b;
//   };
// }

// const number1 = sum(10);
// console.log(number1(5));

// product

const product = [
  {
    name: "Product 1",
    price: 1000,
  },
  {
    name: "Product 2",
    price: 150,
  },
  {
    name: "Product 3",
    price: 300,
  },
];
const filterProductByPice = product.filter((product) => {
  return product.price > 200;
});

console.log(filterProductByPice);
