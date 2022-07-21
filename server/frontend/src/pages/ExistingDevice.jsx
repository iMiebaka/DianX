import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Conversation, MediaSender, Sidebar } from "../components";
import { useSelector } from "react-redux";
import { socket, api } from "../request";

const ExistingDevice = () => {
  const userDetails = useSelector((state) => state.userDetail);
  const [isLoading, setIsLoading] = useState(false),
    [responsiveToggle, setResponsiveToggle] = useState(false),
    [progressBar, setProgressBar] = useState("0%"),
    [isUploading, setIsUploading] = useState(false),
    [conversation, setConversation] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    let mounted = true;
    {
      mounted &&
        api.get("/get-conversation?deviceid=" + id).then((res) => {
          if (res.status == 200) {
            setConversation(res.data);
          }
        });
    }
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {});
    return () => {
      socket.emit("leave_room", id);
      socket.close();
    };
  }, [socket]);

  const sendMedia = async (data) => {
    if (data.type == "file") {
      const theFile = data.obj;
      const fileReader = new FileReader();
      fileReader.onload = async (ev) => {
        const CHUNK_SIZE = 500000;
        const chunkCount = ev.target.result.byteLength / CHUNK_SIZE;
        console.log("Read successfully");
        const fileName = Math.random() * 1000 + theFile.name;
        setIsUploading(true);
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
        }
        setIsUploading(false);
      };
      fileReader.readAsArrayBuffer(theFile);
    } else {
      socket.emit("receive_text", { data, room: id });
      api.post("/send/text", data).then((res) => {
        console.log(res);
      });
    }
  };

  return (
    <main className="relative flex flex-row">
      <Sidebar />
      <div className="relative overflow-hidden w-full h-screen">
        <div className="container">
          <section className="text-gray-600 body-font h-auto ">
            <div className="px-5 py-24 mx-auto flex ">
              <div
                className="lg:w-3/5 bg-gray-100 rounded-lg lg:flex flex-col md:ml-auto w-full mt-10 md:mt-0 
              relative bg-opacity-60 backdrop-filter backdrop-blur-lg"
                hidden={!responsiveToggle}
              >
                <button
                  onClick={() => setResponsiveToggle(false)}
                  className="block lg:hidden self-start m-0 p-0"
                >
                  <i className="mdi mdi-arrow-left mdi-36px"></i>
                </button>
                <Conversation data={conversation} />
                {isUploading && (
                  <div className="w-full bg-gray-100">
                    <div
                      className="text-xs text-center h-.5 text-white bg-purple-700"
                      style={{ width: progressBar }}
                    >
                      {progressBar}
                    </div>
                  </div>
                )}
                <MediaSender sendItem={sendMedia} />
              </div>
              {isLoading ? (
                <div
                  className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 
              relative 
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
                    Paired Device
                  </h2>

                  {[{ name: "Matre", device: "mobile" }].map((res, key) => {
                    return (
                      <div
                        key={key}
                        className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto my-1 hover:scale-x-105 duration-500"
                      >
                        <div className=" flex space-x-4">
                          <div className="rounded-full bg-slate-300 h-10 w-10 flex items-center justify-center">
                            {res.device == "mobile" ? (
                              <i className="mdi mdi-cellphone mdi-36px"></i>
                            ) : (
                              <i className="mdi mdi-desktop-mac mdi-36px"></i>
                            )}
                          </div>
                          <div className="flex flex-col items-start space-y-4">
                            <div className=" h-1 bg-slate-100 rounded">
                              {res.name}
                            </div>
                            <div className="h-1 bg-slate-100 rounded">
                              status: connected
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ExistingDevice;
