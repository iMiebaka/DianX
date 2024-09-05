const containerDisplay = document.getElementById("container");
const inputField = document.querySelector("textarea");
const form = document.getElementById("myForm");
const menuBtn = document.getElementById("menuBtn");
const errorField = document.getElementById("error-field");
const uploadBtn = document.getElementById("add-file");
const fileAdd = document.getElementById("file-add");

uploadBtn.addEventListener("click", function () {
  fileAdd.click();
});

fileAdd.addEventListener("change", async function (event) {
  const file = event.target.files[0];
  console.log(file);

  const formData = new FormData();
  formData.append("file", file);

  // You can then send the file to the server using fetch
  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  if (response.ok) {
    socket.emit("receive_message", { data, file_type: "file" });
    fileAdd.value = "";
  } else {
    console.log(data);
    errorField.innerText = data.detail;
  }
});

inputField.addEventListener("keyup", function () {
  if (this.value) {
    menuBtn.removeAttribute("disabled");
  } else {
    menuBtn.setAttribute("disabled", true);
  }
});

menuBtn.setAttribute("disabled", true);
menuBtn.addEventListener("click", async function () {
  // Initialize pending state
  errorField.innerText = "";
  this.setAttribute("disabled", true);

  // Send Data
  const body = JSON.stringify({ payload: inputField.value });
  const response = await fetch("/api/upload-payload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  
  const data = await response.json();
  if (response.ok) {
    socket.emit("receive_message", { data, file_type: "text" });
  } else {
    console.log(data);
    errorField.innerText = data.detail;
  }

  this.removeAttribute("disabled");
  inputField.value = "";
});