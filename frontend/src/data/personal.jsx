import { FaLinkedin, FaGithub, FaTwitter, FaResearchgate } from "react-icons/fa"; // Import social icons
import { usePersonal } from "../hooks/useContent";

// This component now serves as a data provider using the API
const usePersonalData = () => {
  const { data: personalData, isLoading, error } = usePersonal();
  
  // Fallback data if API fails
  const fallbackData = {
    name: "Kazi Md. Tanvir Anzum",
    cv_link: "https://www.google.com",
    designation: "Lecturer",
    department: "Industrial Engineering & Management",
    institution: "Khulna University of Engineering & Technology",
    city: "Khulna",
    country: "Bangladesh",
    email1: "anzumtanvir052@gmail.com",
    email2: "",
    phone: "+880 123 456 7890",
    office: "Academic Building D, Room 102, KUET, Khulna",
    address: "Address is here",
    linkedin: "https://www.linkedin.com/in/professor",
    github: "",
    twitter: "",
    researchGate: "https://www.researchgate.net/profile/Professor",
    socialLinks: [
      { name: "LinkedIn", url: "https://www.linkedin.com/in/professor", icon: <FaLinkedin className="w-6 h-6 text-white hover:text-[#8a36fe]" /> },
      { name: "GitHub", url: "https://github.com/professor", icon: <FaGithub className="w-6 h-6 text-white hover:text-[#8a36fe]" /> },
      { name: "Twitter", url: "https://twitter.com/professor", icon: <FaTwitter className="w-6 h-6 text-white hover:text-[#8a36fe]" /> },
      { name: "ResearchGate", url: "https://www.researchgate.net/profile/Professor", icon: <FaResearchgate className="w-6 h-6 text-white hover:text-[#8a36fe]" /> },
    ]
  };

  // Use API data if available, otherwise fallback
  const personal = personalData || fallbackData;
  
  // Transform socialLinks to include icons
  const transformedSocialLinks = personal.socialLinks?.map(link => ({
    ...link,
    icon: getIconForSocialLink(link.name)
  })) || fallbackData.socialLinks;

  return {
    ...personal,
    socialLinks: transformedSocialLinks,
    isLoading,
    error
  };
};

const getIconForSocialLink = (name) => {
  const iconMap = {
    'LinkedIn': <FaLinkedin className="w-6 h-6 text-white hover:text-[#8a36fe]" />,
    'GitHub': <FaGithub className="w-6 h-6 text-white hover:text-[#8a36fe]" />,
    'Twitter': <FaTwitter className="w-6 h-6 text-white hover:text-[#8a36fe]" />,
    'ResearchGate': <FaResearchgate className="w-6 h-6 text-white hover:text-[#8a36fe]" />,
  };
  return iconMap[name] || <span className="w-6 h-6">🔗</span>;
};

// Legacy export for backward compatibility
const Personal = {
  name: "Kazi Md. Tanvir Anzum",
  cv_link: "https://www.google.com",
  designation: "Lecturer",
  department: "Industrial Engineering & Management",
  institution: "Khulna University of Engineering & Technology",
  city: "Khulna",
  country: "Bangladesh",
  email1: "anzumtanvir052@gmail.com",
  email2: "",
  phone: "+880 123 456 7890",
  office: "Academic Building D, Room 102, KUET, Khulna",
  address: "Address is here",
  linkedin: "https://www.linkedin.com/in/professor",
  github: "",
  twitter: "",
  researchGate: "https://www.researchgate.net/profile/Professor",
  socialLinks: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/professor", icon: <FaLinkedin className="w-6 h-6 text-white hover:text-[#8a36fe]" /> },
    { name: "GitHub", url: "https://github.com/professor", icon: <FaGithub className="w-6 h-6 text-white hover:text-[#8a36fe]" /> },
    { name: "Twitter", url: "https://twitter.com/professor", icon: <FaTwitter className="w-6 h-6 text-white hover:text-[#8a36fe]" /> },
    { name: "ResearchGate", url: "https://www.researchgate.net/profile/Professor", icon: <FaResearchgate className="w-6 h-6 text-white hover:text-[#8a36fe]" /> },
  ]
};

export default Personal;
export { usePersonalData };