import React from "react";
import "./App.css"
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { URLShortenerContextProvider } from "./Context/Context";
import { NotFound } from "./components/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <URLShortenerContextProvider>

      <React.Fragment>

        <Header/>
        
        <BrowserRouter>
          
          <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/404" element={<NotFound/>}/>
          </Routes>
        
        </BrowserRouter>

      </React.Fragment>

    </URLShortenerContextProvider>
  );
}

export default App
