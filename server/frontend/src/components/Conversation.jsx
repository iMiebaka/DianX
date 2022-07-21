import React, { useState, useRef } from "react";
import LeftConversation from "./LeftConversation";
import RightConversation from "./RightConversation";

const Conversation = () => {
  const data = ""
  return (
    <div
      className=" bg-gray-100 rounded-lg lg:flex flex-col md:ml-auto w-full mt-10 md:mt-0 overflow-y-scroll 
    "
      style={{ maxHeight: "75vh" }}
    >
      {/* <div className="self-end mb-8 h-1/2 md:w-4/5 w-2/4">
        <img
          className="px-8 py-4 rounded"
          src={IMAGE.imageOne}
          alt=""
          srcSet=""
        />
      </div> */}
      <LeftConversation data={data} />
      <RightConversation data={data} />
      <RightConversation data={data} />
      {/* <RightConversation data={data} />
      <RightConversation data={data} /> */}
    </div>
  );
};

export default Conversation;
