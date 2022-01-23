import React from "react";
import ReactDOM from "react-dom";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { render } from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Login from "./routes/user/Login";
import Register from "./routes/user/Register";
import MyProjects from "./routes/MyProjects";
import Projects from "./routes/Projects";
import Activities from "./routes/Activities";
import NewProject from "./routes/forms/NewProject";
import NewActivity from "./routes/forms/NewActivity";
import NewSubactivity from "./routes/forms/NewSubactivity";
import DisplayProject from "./routes/forms/DisplayProject";
import EditProject from "./routes/forms/EditProject";
import EditActivity from "./routes/forms/EditActivity";
import DisplayActivity from "./routes/forms/DisplayActivity";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({ colors });

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="activities" element={<Activities/>}/>
            <Route path="projects" element={<Projects/>}/>
            <Route path="myProjects" element={<MyProjects/>}/>

            {/* FORMS PROJECT */}
            <Route path="newProject" element={<NewProject/>}/>
            <Route path="displayProject/:id" element={<DisplayProject/>}/>
            <Route path="editProject/:id" element={<EditProject/>}/>
            <Route path="newSubactivity/:id" element={<NewSubactivity/>}/>

            <Route path="newActivity" element={<NewActivity/>}/>
            <Route path="displayActivity/:id" element={<DisplayActivity/>}/>
            <Route path="editActivity/:id" element={<EditActivity/>}/>
            
          </Route>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,

  document.getElementById("root")
);

reportWebVitals();
