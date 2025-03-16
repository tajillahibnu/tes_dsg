import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TableBooks from "./pages/buku/table";
import FormBooks from "./pages/buku/form";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/" element={<TableBooks />} />
        <Route path="/form" element={<FormBooks />} />
      </Routes>
    </Router>
  );
};

export default App;