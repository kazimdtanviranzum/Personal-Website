import React from "react";

import Personal from "../data/personal.jsx";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto text-center">
        {/* Contact Details */}
        <div className="mb-6">
          <p className="text-xl font-semibold">Contact Details</p>
          <p className="text-lg mt-2"><a href={`mailto:${Personal?.email1}`}>{Personal?.email1}</a> </p>
          <p className="text-lg mt-2"><a href={`mailto:${Personal?.email1}`}>{Personal?.email2}</a> </p>
          <p className="text-lg mt-2">{Personal?.phone}</p>
          <p className="text-lg mt-2">{Personal?.office}</p>
          <p className="text-lg mt-2">{Personal?.address}</p>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 mt-6">
          {Personal?.socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#8a36fe] transition-colors"
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Copyright Section */}
        <p className="mt-6 text-sm">© 2024 Kazi Md. Tanvir Anzum - All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
