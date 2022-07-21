import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HomeStats, Sidebar } from "../components";
import { api } from "../request";

const ExistingDevices = () => {
  const [isLoading, setIsLoading] = useState(false),
    [pairedDevice, setPairedDevice] = useState([]);
  useEffect(() => {
    api.get("/find-hosts").then((res) => {
      if (res.status == 200) {
        setPairedDevice(res.data);
      }
    });
  }, []);
  return (
    <main className="relative flex flex-row">
      <Sidebar />
      <div className="relative overflow-hidden w-full h-screen">
        <div className="container">
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
              <HomeStats />
              {isLoading ? (
                <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                  <h2 className="text-gray-900 text-lg font-medium title-font mb-3">
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
                <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                  <h2 className="text-gray-900 text-lg font-medium title-font mb-3">
                    Search completed
                  </h2>

                  {[
                    { name: "Stonbee", device: "desktop" },
                    { name: "Matre", device: "mobile" },
                  ].map((res, key) => {
                    return (
                      <Link
                        to={"/existing-device/" + key}
                        key={key}
                        className="border border-blue-100 shadow rounded-md p-4 max-w-sm w-full mx-auto my-1 duration-500 hover:scale-x-105"
                      >
                        <div className=" flex space-x-4 items-center ">
                          <div className="rounded-full bg-slate-300 h-10 w-10 flex items-center justify-center">
                            {res.device == "mobile" ? (
                              <i className="mdi mdi-cellphone mdi-24px"></i>
                            ) : (
                              <i className="mdi mdi-desktop-mac mdi-24px"></i>
                            )}
                          </div>
                          <div className="flex flex-col items-start space-y-4">
                            {/* <div className="flex-1 space-y-2"> */}
                            <div className="h-1 bg-slate-100 rounded">
                              {res.name}
                            </div>
                            <div className="h-1 bg-slate-100 rounded"></div>
                          </div>
                        </div>
                      </Link>
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

export default ExistingDevices;
