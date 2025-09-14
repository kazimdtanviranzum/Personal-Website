import React from "react";
import { usePersonal } from "../hooks/useContent";
import LoadingScreen from "./LoadingScreen";
import {
    EnvelopeIcon,
    DocumentArrowDownIcon,
    AcademicCapIcon,
    BuildingLibraryIcon,
    MapPinIcon,
    PhoneIcon
} from "@heroicons/react/24/outline";
import {
    FaLinkedin,
    FaGithub,
    FaTwitter,
    FaResearchgate,
    FaOrcid
} from "react-icons/fa";
import { SiGooglescholar } from "react-icons/si";
import "../styles/HeroSection.css";

const HeroSection = () => {
    const { data: personalData, isLoading, error } = usePersonal();

    if (isLoading) return <LoadingScreen />;

    if (error) {
        return (
            <section className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">Failed to load personal information</p>
                    <p className="text-gray-600">Please try refreshing the page</p>
                </div>
            </section>
        );
    }

    const getSocialIcon = (platform) => {
        const iconProps = { className: "w-5 h-5" };
        switch (platform?.toLowerCase()) {
            case 'linkedin': return <FaLinkedin {...iconProps} />;
            case 'github': return <FaGithub {...iconProps} />;
            case 'twitter': return <FaTwitter {...iconProps} />;
            case 'researchgate': return <FaResearchgate {...iconProps} />;
            case 'orcid': return <FaOrcid {...iconProps} />;
            case 'googlescholar':
            case 'google scholar':
                return <SiGooglescholar {...iconProps} />;
            default: return <span {...iconProps}>🔗</span>;
        }
    };

    return (
        <section className="hero-section">{/* Clean background without floating elements */}

            <div className="hero-container container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh]">

                    {/* Left Section - Content */}
                    <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
                        {/* Greeting */}
                        <div className="space-y-2">
                            <p className="text-lg text-blue-600 font-medium animate-fade-in">
                                {personalData?.greetings || "Welcome to my academic profile"}
                            </p>
                            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight animate-slide-up">
                                {personalData?.name || "Dr. Academic Name"}
                </h1>
                        </div>

                        {/* Position & Institution */}
                        <div className="space-y-4 animate-slide-up delay-200">
                            {/* Designation & Department */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-3">
                                <div className="p-2 bg-blue-100 rounded-lg mx-auto sm:mx-0 mb-2 sm:mb-0">
                                    <AcademicCapIcon className="h-6 w-6 text-blue-600" />
                                </div>
                                <div className="text-center sm:text-left w-full sm:w-auto">
                                    <p className="text-xl font-semibold text-gray-800">
                                        {personalData?.designation || "Lecturer"}
                                    </p>
                                    <p className="text-gray-600 text-sm sm:text-base">
                                        {personalData?.department || "Department"}
                                    </p>
                                </div>
                            </div>

                            {/* Institution & Location */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-3">
                                <div className="p-2 bg-green-100 rounded-lg mx-auto sm:mx-0 mb-2 sm:mb-0">
                                    <BuildingLibraryIcon className="h-6 w-6 text-green-600" />
                                </div>
                                <div className="text-center sm:text-left w-full sm:w-auto">
                                    <p className="text-lg font-medium text-gray-800">
                                        {personalData?.institution || "University Name"}
                                    </p>
                                    <div className="flex items-center justify-center sm:justify-start space-x-1 text-gray-600">
                                        <MapPinIcon className="h-4 w-4" />
                                        <span className="text-sm sm:text-base">{personalData?.city || "City"}, {personalData?.country || "Country"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="animate-slide-up delay-300">
                            <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                {personalData?.short_description || "Dedicated educator and researcher committed to advancing knowledge and inspiring the next generation of engineers."}
                            </p>
                        </div>

                        {/* Contact Info */}
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 animate-slide-up delay-400">
                            {personalData?.email1 && (
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <EnvelopeIcon className="h-5 w-5" />
                                    <a href={`mailto:${personalData.email1}`} className="hover:text-blue-600 transition-colors">
                                        {personalData.email1}
                                    </a>
                                </div>
                            )}
                            {personalData?.phone && (
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <PhoneIcon className="h-5 w-5" />
                                    <a href={`tel:${personalData.phone}`} className="hover:text-blue-600 transition-colors">
                                        {personalData.phone}
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start animate-slide-up delay-500">
                            <a
                                href={`mailto:${personalData?.email1 || personalData?.contact_me_button_email}`}
                                className="action-button group px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 shadow-lg hover:shadow-xl flex items-center space-x-2"
                            >
                                <EnvelopeIcon className="h-5 w-5 group-hover:animate-bounce" />
                                <span>Contact Me</span>
                            </a>

                            {/* {personalData?.cv_link && (
                                <a
                                    href={personalData.cv_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="action-button group px-8 py-4 bg-gray-800 text-white font-semibold rounded-xl hover:bg-gray-900 shadow-lg hover:shadow-xl flex items-center space-x-2"
                                >
                                    <DocumentArrowDownIcon className="h-5 w-5 group-hover:animate-bounce" />
                                    <span>Download CV</span>
                                </a>
                            )} */}
                        </div>

                        {/* Social Links */}
                        {personalData?.socialLinks && personalData.socialLinks.length > 0 && (
                            <div className="animate-slide-up delay-600">
                                <p className="text-sm text-gray-600 mb-4">Connect with me:</p>
                                <div className="flex items-center justify-center lg:justify-start space-x-4">
                                    {personalData.socialLinks.map((link, index) => (
                                        <a
                                            key={index}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="social-link p-3 bg-white rounded-xl shadow-md hover:shadow-lg text-gray-600"
                                            title={link.name}
                                        >
                                            {getSocialIcon(link.name)}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Section - Profile Image */}
                    <div className="order-1 lg:order-2 flex justify-center items-center">
                        <div className="profile-image-container">
                            {personalData?.profile_picture || personalData?.cover_photo ? (
                                <img
                                    src={personalData.profile_picture || personalData.cover_photo}
                                    alt={personalData?.name || "Profile"}
                                    className="w-80 h-96 object-cover rounded-2xl shadow-lg border-2 border-gray-200"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextElementSibling.style.display = 'flex';
                                    }}
                                />
                            ) : null}

                            {/* Fallback placeholder */}
                            <div
                                className="w-80 h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-lg border-2 border-gray-200 flex flex-col items-center justify-center text-gray-500"
                                style={{ display: (!personalData?.profile_picture && !personalData?.cover_photo) ? 'flex' : 'none' }}
                            >
                                <AcademicCapIcon className="h-16 w-16 mb-4 text-gray-400" />
                                <p className="text-lg font-medium">Profile Photo</p>
                                <p className="text-sm">Coming Soon</p>
                            </div>

                            {/* Floating Academic Elements */}
                            <div className="floating-element absolute -top-4 -right-4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                                <AcademicCapIcon className="h-6 w-6 text-white" />
                            </div>

                            <div className="floating-element absolute -bottom-4 -left-4 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                                <BuildingLibraryIcon className="h-5 w-5 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </section>
    );
};

export default HeroSection;
