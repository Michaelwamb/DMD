import React from "react";
import "./location.css";
import Navbar from "../../components/Navbar";
import Sidebar from "../../Menu/Menu";

function Location() {
  return (
    <div>
      <Sidebar />
      <div className="Navbar-location">
        <Navbar title="Locações" />
      </div>
      <main className="main-location">
        <h1>Location</h1>
      </main>
    </div>
  );
}

export default Location;



