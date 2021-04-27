import React from "react";
import './Menu.css'
import Image from "../assets/dmd_massa.png";
import { SidebarData } from "../components/SidebarData";
import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <aside id="menu">
          <ul className="sidebar">
            <img src={Image} alt="a" />
            <span className="hr"></span>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
    </aside>
  );
}
