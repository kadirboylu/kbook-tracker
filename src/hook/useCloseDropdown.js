import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { closeDropdown } from "@/store/bookSlice";

export const useCloseDropdown = () => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    const header = document.getElementById("header"); // header
    const footer = document.getElementById("footer"); // footer
    const routes = document.getElementById("routes"); // routes
    const dropdown = document.getElementById("dropdown"); // dropdown
    const links = document.querySelectorAll("a"); // all links

    // close dropdown if click outside of dropdown
    const condition =
      ((header && header.contains(e.target)) ||
        (footer && footer.contains(e.target)) ||
        (routes && routes.contains(e.target))) &&
      !dropdown.contains(e.target);

    if (condition) {
      dispatch(closeDropdown());
    }

    // close dropdown if click on links
    links.forEach((link) => {
      if (link && link.contains(e.target)) {
        dispatch(closeDropdown());
      }
    });
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};
