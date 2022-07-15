import "./assets/css/materialdesignicons.min.css";
import "./output.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ExistingDevice, ExistingDevices, Home, NewDevice } from "./pages";

const App = () => {
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
