var socket = io();
socket.on("connect", () => {
  //   console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

socket.on("disconnect", (reason, details) => {
  console.error(`Socket connetion error: ${reason}`);
});

socket.on("receive_message", (arg) => {
  console.log(arg);

  if (arg.file_type == "text") {
    const data = arg.data;
    const parent = document.createElement("div");
    parent.classList.add("text-content-child");

    const element = document.createElement("div");
    element.textContent = data;
    element.classList.add("content-child");
    parent.appendChild(appendBtn(data));
    parent.appendChild(element);
    containerDisplay.appendChild(parent);
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

async function copyText(text) {

navigator.permissions.query({ name: "write-on-clipboard" }).then((result) => {
  if (result.state == "granted" || result.state == "prompt") {
    alert("Write access granted!");
  }
});
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Text copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  } else {
    // Fallback for older browsers
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      console.log("Text copied to clipboard (fallback)!");
    } catch (err) {
      console.error("Failed to copy text (fallback): ", err);
    } finally {
      document.body.removeChild(textarea);
    }
  }
}

function appendBtn(text) {
  const span = document.createElement("span");
  const img = document.createElement("img");

  img.classList.add("clipboard-img");
  img.src = "/static/icons/copy-outline.svg";
  span.setAttribute("onclick", `copyText('${text}')`);
  span.appendChild(img);
  return span;
}
