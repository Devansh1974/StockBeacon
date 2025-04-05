import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 px-6 py-10">
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-indigo-600 mb-2">StockBeacon</h2>
          <p className="text-sm text-gray-600">
            Stay informed with AI-powered stock insights and personalized alerts. Built with passion in India.
          </p>
          <div className="flex gap-4 mt-4 text-lg text-gray-600">
            <a href="#"><FaFacebook className="hover:text-indigo-600" /></a>
            <a href="#"><FaTwitter className="hover:text-indigo-600" /></a>
            <a href="#"><FaInstagram className="hover:text-indigo-600" /></a>
            <a href="#"><FaLinkedin className="hover:text-indigo-600" /></a>
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="hover:text-indigo-600 cursor-pointer">Home</li>
            <li className="hover:text-indigo-600 cursor-pointer">About Us</li>
            <li className="hover:text-indigo-600 cursor-pointer">Notice & Rules</li>
            <li className="hover:text-indigo-600 cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Get in Touch</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2"><FaPhoneAlt /> +1 372-288-2782</li>
            <li className="flex items-center gap-2"><FaEnvelope /> contact@stockbeacon.in</li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Newsletter</h4>
          <p className="text-sm text-gray-600 mb-4">Stay ahead with market updates and AI trends.</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="p-2 border border-gray-300 rounded-l w-full focus:outline-none"
            />
            <button className="bg-indigo-600 px-4 py-2 rounded-r text-white hover:bg-indigo-700">
              <MdOutlineEmail className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      <hr className="my-6 border-gray-300" />
      <p className="text-center text-sm text-gray-500 font-medium">
        © 2025 StockBeacon – All Rights Reserved | Built with ❤️ in India
      </p>
    </footer>
  );
};

export default Footer;
