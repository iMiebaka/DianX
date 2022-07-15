import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HomeStats } from "../components";

const NewDevice = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let getData = true;
    {
      getData &&
        setTimeout(() => {
          setIsLoading(false);
        }, 10000);
    }

    return () => {
      getData = false;
    };
  }, []);

  return (
    <div className="relative overflow-hidden w-full h-screen">
      <div className="container">
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
            <HomeStats />
            {isLoading ? (
              <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                <h2 className="animate-pulse text-gray-900 text-lg font-medium title-font mb-3">
                  Seaching...
                </h2>
                <div class="animate-pulse border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                  <div class=" flex space-x-4 items-center">
                    <div class="rounded-full bg-slate-300 h-10 w-10 flex items-center justify-center">
                      <i className="mdi mdi-cellphone"></i>
                    </div>
                    <div class="flex-1 space-y-2">
                      <div class="h-2 bg-slate-700 rounded"></div>
                      <div class="h-2 bg-slate-700 rounded"></div>
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
                      key={key}
                      to={"/existing-device/" + key}
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
                        <div class="flex-1 space-y-2">
                          <div class="h-2 bg-slate-100 rounded">{res.name}</div>
                          <div class="h-2 bg-slate-100 rounded"></div>
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
  );
};

export default NewDevice;
