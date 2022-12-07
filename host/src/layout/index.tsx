import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./MainLayout";

export default function Layout() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<MainLayout />}>
            {/* <Route path="*" element={<Navigate to="/" />} /> */}
            {/* <Route path="*" element={<RenderApp />}></Route> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
