import React, { useState, useRef } from "react";

const MediaSender = ({sendItem}) => {
  const [sendFile, setSendFile] = useState(true);

  const inputBox = useRef();
  const mediaObject = useRef();

  const inputText = () => {
    const textVal = inputBox.current.value;
    {
      textVal.length == 0 ? setSendFile(true) : setSendFile(false);
    }
  };

  const sendMedia = () => {
    mediaObject.current.click();
    mediaObject.current.onchange = () => {
      const newImage = mediaObject.current.files[0];
      console.log(newImage);
    };
  };

  const sendText = () => {
    console.log(inputBox.current.value);
    inputBox.current.value = "";
  };

  const getBase64 = (file) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setImageBlob(reader.result);
      setCanUpload(true);
    };
    reader.onerror = function (error) {
      setImageErrorPrompt({ type: "text-danger", text: error });
    };
  };
  return (
    <div class="bg-gray-100 rounded-lg px-2 flex flex-col md:ml-auto w-full relative md:mt-0">
      <div class="mb-2 flex">
        <input
          ref={inputBox}
          onChange={inputText}
          type="text"
          id="text"
          autoComplete="off"
          class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
        <input type="file" name="" hidden ref={mediaObject} id="" />
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
