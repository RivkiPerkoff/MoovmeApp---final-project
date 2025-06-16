import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <p>&copy; {new Date().getFullYear()} MoovMe - כל הזכויות שמורות</p>
    </footer>
  );
};

export default Footer;
