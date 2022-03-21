import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import React from "react";

interface MenuArrowProps {
  isOpen: boolean;
}

const MenuArrow: React.FC<MenuArrowProps> = ({ isOpen }) => {
  return (
    <div
      style={{
        display: "flex",
        rotate: isOpen ? "-90deg" : "90deg",
        transition: "0.5s",
        transitionDelay: "0.1s",
      }}
    >
      <ChevronRightIcon />
    </div>
  );
};

export default MenuArrow;
