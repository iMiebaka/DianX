import React, { useState, useRef, useEffect } from "react";
import api from "../request/axios";

const MediaSender = ({ sendItem }) => {
  const [sendFile, setSendFile] = useState(true);
  const progressBar = useRef()
  useEffect(() => {
    let isMount = true;
    if (isMount) {
    }

    return () => {
      isMount = false;
    };
  }, []);

  // window.addEventListener("beforeunload", function (e) {
  //   e.preventDefault();
  //   e.returnValue = "";
  // });
  const inputBox = useRef();
  const mediaObject = useRef();

  const inputText = () => {
    const textVal = inputBox.current.value;
    {
      textVal.length == 0 ? setSendFile(true) : setSendFile(false);
    }
  };

  const sendMedia = () => {
    const file = document.getElementById("file-type");
    file.click();
    file.onchange = () => {
      const data = {
        type: "file",
        obj: file.files[0],
      };
      console.log(file.files[0]);
      sendItem(data);
    };
  };

  const sendText = () => {
    const textVal = inputBox.current.value;
    const data = {
      type: "text",
      obj: textVal,
    };
    sendItem(data);
    inputBox.current.value = "";
    setSendFile(true);
  };

  const getBase64 = (theFile) => {
    const fileReader = new FileReader();
    fileReader.onload = async (ev) => {
      const CHUNK_SIZE = 500000;
      const chunkCount = ev.target.result.byteLength / CHUNK_SIZE;
      console.log("Read successfully");
      const fileName = Math.random() * 1000 + theFile.name;
      for (let chunkId = 0; chunkId < chunkCount + 1; chunkId++) {
        const chunk = ev.target.result.slice(
          chunkId * CHUNK_SIZE,
          chunkId * CHUNK_SIZE + CHUNK_SIZE
        );
        api.defaults.headers.common["content-type"] =
          "application/octet-stream";
        api.defaults.headers.common["file-name"] = fileName;
        api.defaults.maxBodyLength = 1000000000;
        api.defaults.maxBodyLength = 1000000000;
        await api.post("/send/file", chunk);
        setProgressBar(Math.round((chunkId * 100) / chunkCount, 0) + "%");
        // console.log(Math.round((chunkId * 100) / chunkCount, 0) + "%");
      }
      console.log(ev.target.result.byteLength);
    };
    fileReader.readAsArrayBuffer(theFile);
  };
  return (
    <div className="bg-gray-100 rounded-lg px-2 flex flex-col md:ml-auto w-full relative md:mt-0">
      {/* <div class="w-full bg-gray-100">
        <div ref={progressBar} class="py-0.5 text-xs text-center text-white bg-purple-700" style={{width: "10%"}}>
          
        </div>
      </div> */}
      <div className="mb-2 flex">
        <input
          ref={inputBox}
          onChange={inputText}
          type="text"
          id="text"
          autoComplete="off"
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
        <input type="file" hidden ref={mediaObject} id="file-type" />
        <button
          onClick={sendFile ? sendMedia : sendText}
          className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          {sendFile ? (
            <i className="mdi mdi-paperclip mdi-rotate-45 mdi-24px"></i>
          ) : (
            <i className="mdi mdi-message-text mdi-24px"></i>
          )}
        </button>
      </div>
    </div>
  );
};

export default MediaSender;
