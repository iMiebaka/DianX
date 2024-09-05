var socket = io();
socket.on("connect", () => {
  //   console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

socket.on("disconnect", (reason, details) => {
  console.error(`Socket connetion error: ${reason}`);
});

socket.on("receive_message", (arg) => {
  if (arg.file_type == "text") {
    const element = document.createElement("div");
    element.textContent = arg.data;
    element.classList.add("content-child");
    containerDisplay.appendChild(element);
  }
  if (arg.file_type == "file") {
    const element = document.createElement("a");
    element.textContent = arg.data;
    element.href = arg.data;
    element.setAttribute("download", true);
    element.classList.add("content-child");
    containerDisplay.appendChild(element);
  }
});
