const xhr = new XMLHttpRequest(); //ajax

// HTTP REQUEST => suatu cara untuk melakukan proses ke server / API
// GET => Mendapatkan data (R => read)
// POST => create data  (C => create)
// PATCH / PUT => update data  (U => update)
// DELETE   => Delete data (D => delete)
// yang biasa dipakai

// menggunakan MOCK API dengan menggunakan npoint.io
xhr.open("GET", "https://api.npoint.io/d5c9855e6ee257eaa2e9", true);

xhr.onerror = () => {
  console.log("Network error");
};

xhr.onload = () => {
  console.log(xhr.responseText);
};

xhr.send();
