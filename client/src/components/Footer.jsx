import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">

                    {/* Brand and Copyright */}
                    <div className="text-center md:text-left">
                        <p className="text-sm text-gray-500 font-medium">
                            &copy; {currentYear} College Events Aggregator. All rights reserved.
                        </p>
                        <p className="text-xs text-gray-400 mt-1 flex items-center justify-center md:justify-start gap-1">
                            Made with <Heart size={12} className="text-red-500 fill-current" /> by Md Sadik
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center space-x-6">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-gray-900 transition-colors duration-300"
                            aria-label="GitHub"
                        >
                            <Github size={20} />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-blue-600 transition-colors duration-300"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={20} />
                        </a>
                        <a
                            href="mailto:contact@example.com"
                            className="text-gray-400 hover:text-red-500 transition-colors duration-300"
                            aria-label="Email"
                        >
                            <Mail size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
