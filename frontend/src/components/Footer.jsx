import React from "react";
import { usePersonal } from "../hooks/useContent.js";
import { FaLinkedin, FaGithub, FaTwitter, FaResearchgate } from "react-icons/fa";

const Footer = () => {
  const { data: personalData, isLoading, error } = usePersonal();
  console.log(personalData);
  // Helper function to get icon for social links
  const getIconForSocialLink = (name) => {
    const iconMap = {
      'LinkedIn': <FaLinkedin className="w-6 h-6" />,
      'GitHub': <FaGithub className="w-6 h-6" />,
      'Twitter': <FaTwitter className="w-6 h-6" />,
      'ResearchGate': <FaResearchgate className="w-6 h-6" />,
    };
    return iconMap[name] || <span className="w-6 h-6">🔗</span>;
  };

  if (isLoading) {
    return (
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-lg">Loading contact information...</p>
        </div>
      </footer>
    );
  }

  if (error) {
    return (
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-lg text-red-400">Error loading contact information</p>
        </div>
      </footer>
    );
  }

  const {
    name,
    email1,
    email2,
    phone,
    office,
    address,
    socialLinks,
    linkedin,
    github,
    twitter,
    researchGate
  } = personalData || {};

  // Create social links array from individual fields if socialLinks is empty
  const displaySocialLinks = socialLinks && socialLinks.length > 0 
    ? socialLinks.map(link => ({
        ...link,
        icon: getIconForSocialLink(link.name)
      }))
    : [
        linkedin && { name: 'LinkedIn', url: linkedin, icon: getIconForSocialLink('LinkedIn') },
        github && { name: 'GitHub', url: github, icon: getIconForSocialLink('GitHub') },
        twitter && { name: 'Twitter', url: twitter, icon: getIconForSocialLink('Twitter') },
        researchGate && { name: 'ResearchGate', url: researchGate, icon: getIconForSocialLink('ResearchGate') },
      ].filter(Boolean);

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto text-center">
        {/* Contact Details */}
        <div className="mb-6">
          <p className="text-xl font-semibold">Contact Details</p>
          {email1 && (
            <p className="text-lg mt-2">
              <a href={`mailto:${email1}`} className="hover:text-[#8a36fe] transition-colors">
                {email1}
              </a>
            </p>
          )}
          {email2 && (
            <p className="text-lg mt-2">
              <a href={`mailto:${email2}`} className="hover:text-[#8a36fe] transition-colors">
                {email2}
              </a>
            </p>
          )}
          {phone && <p className="text-lg mt-2">{phone}</p>}
          {office && <p className="text-lg mt-2">{office}</p>}
          {address && <p className="text-lg mt-2">{address}</p>}
        </div>

        {/* Social Media Links */}
        {displaySocialLinks && displaySocialLinks.length > 0 && (
          <div className="flex justify-center space-x-6 mt-6">
            {displaySocialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#8a36fe] transition-colors"
                title={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
        )}

        {/* Copyright Section */}
        <p className="mt-6 text-sm">
          © 2024 {name || "Professor"} - All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
