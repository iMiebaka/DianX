import React, { useState, useRef } from "react";
import copy from "copy-to-clipboard";
import IMAGE from "../assets/images";

const Conversation = () => {
  return (
    <div
      className=" bg-gray-100 rounded-lg lg:flex flex-col md:ml-auto w-full mt-10 md:mt-0 overflow-y-scroll 
    "
      style={{ height: "78vh" }}
    >
      <div className="self-end mb-8 h-1/2 md:w-4/5 w-2/4">
        <img
          className="px-8 py-4 rounded"
          src={IMAGE.imageOne}
          alt=""
          srcSet=""
        />
      </div>
      <div className="self-end md:w-4/5 w-full">
        <div className="px-8 py-4 rounded hover:border hover:cursor-pointer">
          <p className="leading-relaxed mb-1">
            Synth chartreuse iPhone lomo cray raw denim brunch everyday carry
            neutra before they sold out fixie 90's microdosing. Tacos pinterest
            fanny pack venmo, post-ironic heirloom try-hard pabst authentic
            iceland.
          </p>
          <p className="flex justify-end self-end">8:30PM</p>
        </div>
      </div>
      <div className="self-start md:w-4/5 w-full">
        <div className="px-8 py-4 rounded hover:border hover:cursor-pointer">
          <p className="leading-relaxed mb-1">
            Synth chartreuse iPhone lomo cray raw denim brunch everyday carry
            neutra before they sold out fixie 90's microdosing. Tacos pinterest
            fanny pack venmo, post-ironic heirloom try-hard pabst authentic
            iceland.
          </p>
          <p className="flex justify-end self-end">8:30PM</p>
        </div>
      </div>
      <div className="self-end md:w-4/5 w-full mb-20 flex">
        <div className="px-8 py-4 rounded hover:border hover:cursor-pointer">
          <p className="leading-relaxed mb-1">
            Synth chartreuse iPhone lomo cray raw denim brunch everyday carry
            neutra before they sold out fixie 90's microdosing. Tacos pinterest
            fanny pack venmo, post-ironic heirloom try-hard pabst authentic
            iceland.
          </p>
          <p className="flex justify-end self-end">8:30PM</p>
        </div>
        <button className="" onClick={() => copy("Text to copy sdh")}>
          <i className="mdi mdi-clipboard-text mdi-36px"></i>
        </button>
      </div>
      <div className="self-end md:w-4/5 w-full mb-20">
        <div
          onClick={() => copy("Text to copy sdh")}
          className="px-8 py-4 rounded hover:border hover:cursor-pointer"
        >
          <p className="leading-relaxed mb-1">
            Synth chartreuse iPhone lomo cray raw denim brunch everyday carry
            neutra before they sold out fixie 90's microdosing. Tacos pinterest
            fanny pack venmo, post-ironic heirloom try-hard pabst authentic
            iceland.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
