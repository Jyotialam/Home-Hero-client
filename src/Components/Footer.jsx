import { Link } from 'react-router';
import { Facebook, Instagram, Mail } from 'lucide-react';
import { FaHome, } from 'react-icons/fa';
import { PiXLogoBold } from 'react-icons/pi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#001E38] py-8 px-4 mt-20">
      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Brand */}
        <div>
          <div className="flex items-center space-x-2 text-white">
            <FaHome size={25} />
            <span className="text-xl font-bold text-gray-100">HomeHero</span>
          </div>
          <ul className="space-y-2 mt-4">
            <li><Link to="/services" className="text-gray-200 hover:text-yellow-300">All Services</Link></li>
            <li><Link to="/add-service" className="text-gray-200 hover:text-yellow-300">Add Service</Link></li>
            <li><Link to="/my-bookings" className="text-gray-200 hover:text-yellow-300">My Bookings</Link></li>
            <li><Link to="/login" className="text-gray-200 hover:text-yellow-300">Login</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-gray-100">Resources</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="text-gray-200 hover:text-yellow-300">Help Center</Link></li>
            <li><Link to="/" className="text-gray-200 hover:text-yellow-300">How It Works</Link></li>
            <li><Link to="/" className="text-gray-200 hover:text-yellow-300">Safety Guidelines</Link></li>
            <li><Link to="/" className="text-gray-200 hover:text-yellow-300">Pricing Policy</Link></li>
          </ul>
        </div>

        {/* Community */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-gray-100">Community</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="text-gray-200 hover:text-yellow-300">Customer Stories</Link></li>
            <li><Link to="/" className="text-gray-200 hover:text-yellow-300">Partner With Us</Link></li>
            <li><Link to="/" className="text-gray-200 hover:text-yellow-300">Events</Link></li>
            <li><Link to="/" className="text-gray-200 hover:text-yellow-300">Support</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-gray-100">Connect With Us</h3>
          <div className="flex space-x-4 mb-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-blue-700">
              <Facebook size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-sky-400">
              <PiXLogoBold size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-pink-600">
              <Instagram size={24} />
            </a>
          </div>
          <a
            href="mailto:support@homehero.com"
            className="flex items-center text-gray-200 hover:text-yellow-300"
          >
            <Mail size={18} className="mr-2" /> support@homehero.com
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-blue-300 mt-8 pt-4 text-center">
        <p className="text-sm text-gray-200">
          © {currentYear} HomeHero. All Rights Reserved.
          <span className="ml-4">
            <Link to="/" className="hover:text-yellow-300 mr-3">Privacy Policy</Link>
            <Link to="/" className="hover:text-yellow-300">Terms of Service</Link>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
