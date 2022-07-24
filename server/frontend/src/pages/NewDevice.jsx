import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HomeStats, Sidebar } from "../components";
import QRCode from "qrcode";
import { socket, api } from "../request";

const NewDevice = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [qrGist, setQrGist] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let getData = true;
    {
      getData &&
        QRCode.toDataURL('{ data: ["127.0.0.1"] }').then((code) => {
          setQrGist(code);
        });
      api
        .get("/connect-client")
        .then((res) => {
          if (res.status == 200) {
            const text = JSON.stringify(res.data);
            try {
              QRCode.toDataURL(text)
                .then((code) => {
                  setQrGist(code);
                  // console.log(text);
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
    let mounted = true;
    {
      mounted &&
        socket.on("make_handshake", (data) => {
          navigateItem(data.data);
        });
    }
    return () => {
      mounted = false;
    };
  }, [socket]);

  const navigateItem = (value) => {
    navigate("/existing-device/" + value);
  };

  return (
    <main className="relative flex flex-row">
      <Sidebar />
      <div className="relative overflow-hidden w-full h-screen">
        <div className="container">
          <section className="text-gray-600 body-font">
            <div className="px-5 py-24 mx-auto flex flex-wrap items-center">
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
                    <img
                      className="w-100 h-100"
                      src={qrGist}
                      alt=""
                      srcSet=""
                    />
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default NewDevice;
