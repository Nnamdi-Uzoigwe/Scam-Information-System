import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A2A] text-gray-300 pt-12 pb-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex flex-col ">
            <div className="logo text-[#0F766E] font-bold">FraudTrackr</div>
              <span className="text-white text-xl font-bold">ScamAlert</span>
            </div>
            <p className="text-gray-400">
              Empowering users to report and prevent scams through community vigilance and education.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Report a Scam</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Search Database</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Scam Prevention Tips</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Recent Scams</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">FAQ</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Statistics</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Safety Guides</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">API Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Press Kit</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 flex-shrink-0 text-gray-400" />
                <span className="text-gray-400">123 Main Ave, Cyber City, Nigeria</span>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="mr-3 text-gray-400" />
                <a href="tel:+1234567890" className="text-gray-400 hover:text-white transition">+234 004 346 4089</a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-gray-400" />
                <a href="mailto:help@scamalert.com" className="text-gray-400 hover:text-white transition">help@cliffordreporters.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} ScamAlert. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-white text-sm transition">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}