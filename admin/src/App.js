import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./Sign Up";
import AddClasses from "./AddClasses";
import Students from "./Students";
import Classes from "./Classes";
import FileUpload from "./Files";
import WithDrawals from "./WithDrawals";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/add-classes" element={<AddClasses />} />
          <Route path="/students" element={<Students />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/files/:classId" element={<FileUpload />} />
          <Route path="/withdrawals" element={<WithDrawals />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
