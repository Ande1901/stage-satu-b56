function isPayDebt(isPay) {
  return new Promise((resolve, reject) => {
    if (!isPay) return reject("Failed to pay debt!");

    resolve("Success pay debt!");
  });
}

// function isPayDebt2(isPay) {
//   return new Promise((resolve, reject) => {
//     if (!isPay) return reject("gagal mayie ");

//     resolve("berhasil mayie");
//   });
// }

async function payDebt() {
  try {
    //error handling
    // console.log(await isPayDebt2(true));
    console.log(await isPayDebt(false));
    console.log(error);
  } catch (error) {}
}

payDebt();
