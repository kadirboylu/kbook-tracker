import React from "react";
import { Link } from "react-router-dom";

const HeaderMenu = () => {
  const links = [
    { name: "HOME", to: "/" },
    { name: "MY BOOKS", to: "/my-books" },
  ];

  return (
    <ul>
      {links.map((link) => {
        return (
          <li key={link.name}>
            <Link to={link.to}>{link.name}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default HeaderMenu;
