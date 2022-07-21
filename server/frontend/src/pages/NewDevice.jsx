import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HomeStats, socket } from "../components";
import QRCode from "qrcode";
import api from "../request/axios";

const NewDevice = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [qrGist, setQrGist] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let getData = true;
    {
      getData &&
        api
          .get("/connect-client")
          .then((res) => {
            if (res.status == 200) {
              const text = JSON.stringify(res.data);
              try {
                QRCode.toDataURL(text)
                  .then((code) => {
                    setQrGist(code);
                  })
                  .catch((err) => {
                    console.error(err);
                  });
              } catch (err) {
                console.error(err);
              }
            }
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setIsLoading(false);
          });
    }

    return () => {
      getData = false;
    };
  }, []);

  useEffect(() => {
    let getData = true;
    {
      getData &&
        socket.on("make_handshake", (data) => {
          console.log(data);
        });
    }
    return () => {
      getData = false;
    };
  }, [socket]);

  return (
    <div className="relative overflow-hidden w-full h-screen">
      <div className="container">
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
            <HomeStats />
            {isLoading ? (
              <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                <h2 className="animate-pulse text-gray-900 text-lg font-medium title-font mb-3">
                  Generating Code...
                </h2>
              </div>
            ) : (
              <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto  w-full mt-10 md:mt-0">
                <h2 className="text-gray-900 text-lg font-medium title-font mb-3">
                  Scan to Connect
                </h2>

                <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto my-1 flex justify-center hover:scale-x-105 duration-500">
                  <img className="w-100 h-100" src={qrGist} alt="" srcSet="" />
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default NewDevice;
