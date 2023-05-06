import React from "react";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import ConnectWithoutContactOutlinedIcon from "@mui/icons-material/ConnectWithoutContactOutlined";
import DatasetLinkedOutlinedIcon from "@mui/icons-material/DatasetLinkedOutlined";

const Footer = () => {
  return (
    <div>
      <footer className="section footer">
        <ul className="footer-icons">
          <li>
            <a href="#" className="footer-icon">
              <FacebookOutlinedIcon />
            </a>
          </li>

          <li>
            <a href="#" className="footer-icon">
              <ConnectWithoutContactOutlinedIcon />
            </a>
          </li>

          <li>
            <a href="#" className="footer-icon">
              <DatasetLinkedOutlinedIcon />
            </a>
          </li>
        </ul>

        <p className="copyright">
          copyright &copy; TeeRex Store
          <span> {new Date().getFullYear()}</span>. all rights reserved
        </p>
      </footer>
    </div>
  );
};

export default Footer;
