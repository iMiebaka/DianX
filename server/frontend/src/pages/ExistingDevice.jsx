import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Conversation, MediaSender } from "../components";

const ExistingDevice = () => {
  const [isLoading, setIsLoading] = useState(false);
  const toggleState = useRef();
  const [responsiveToggle, setResponsiveToggle] = useState(false);
  const navigate = useNavigate()

  const navigateItem = (value) => {
    navigate("/existing-device/" + value)
    // setResponsiveToggle(true)
  }

  return (
    <div className="relative overflow-hidden w-full h-screen">
      <div className="container">
        <section className="text-gray-600 body-font h-auto">
          <div className="px-5 py-24 mx-auto flex ">
            <div
              className="lg:w-3/5 bg-gray-100 rounded-lg lg:flex flex-col md:ml-auto w-full mt-10 md:mt-0 
              relative overflow-hidden max-h-screen"
              hidden={!responsiveToggle}
            >
              <button
                onClick={() => setResponsiveToggle(false)}
                className="block lg:hidden self-start m-0 p-0"
              >
                <i className="mdi mdi-arrow-left mdi-36px"></i>
              </button>
              <Conversation />
              <MediaSender sendItem={null} />
            </div>
            {isLoading ? (
              <div
                className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0
              relative overflow-auto 
              "
              >
                <h2 className="animate-pulse text-gray-900 text-lg font-medium title-font mb-3">
                  Seaching...
                </h2>
                <div className="animate-pulse border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                  <div className=" flex space-x-4 items-center">
                    <div className="rounded-full bg-slate-300 h-10 w-10 flex items-center justify-center">
                      <i className="mdi mdi-cellphone"></i>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="h-2 bg-slate-700 rounded"></div>
                      <div className="h-2 bg-slate-700 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0  

               "
                hidden={responsiveToggle}
              >
                <h2 className="text-gray-900 text-lg font-medium title-font mb-3">
                  Select to Send
                </h2>

                {[
                  { name: "Stonbee", device: "desktop" },
                  { name: "Matre", device: "mobile" },
                ].map((res, key) => {
                  return (
                    <button
                      key={key}
                      onClick={() => navigateItem(key)}
                      class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto my-1 hover:scale-x-105 duration-500"
                    >
                      <div class=" flex space-x-4 items-center">
                        <div class="rounded-full bg-slate-300 h-10 w-10 flex items-center justify-center">
                          {res.device == "mobile" ? (
                            <i className="mdi mdi-cellphone mdi-36px"></i>
                          ) : (
                            <i className="mdi mdi-desktop-mac mdi-36px"></i>
                          )}
                        </div>
                        <div class="space-y-2">
                          <div class="h-2 bg-slate-100 rounded">{res.name}</div>
                          <div class="h-2 bg-slate-100 rounded"></div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ExistingDevice;
