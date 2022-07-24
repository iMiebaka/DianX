import "./assets/css/materialdesignicons.min.css";
import "./output.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ExistingDevice, ExistingDevices, Home, NewDevice } from "./pages";
import { useEffect } from "react";
import api from "./request/axios";
import { useDispatch } from "react-redux";
import { started } from "./redux/action";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    let mounted = true;
    {
      mounted &&
        api.get("/device-details").then((res) => {
          if (res.status == 200) {
            localStorage.setItem("dian-xchange", JSON.stringify(res.data));
            dispatch(started(res.data));
          }
        });
    }
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="" element={<Home />} />
        <Route exact path="find" element={<NewDevice />} />
        <Route exact path="existing-devices" element={<ExistingDevices />} />
        <Route exact path="existing-device/:id" element={<ExistingDevice />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
