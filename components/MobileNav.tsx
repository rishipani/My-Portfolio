import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface MobileNavProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  activeSection: string;
  scrollToSection: (section: string) => void;
}

const sections = ["home", "about", "skills", "projects", "contact"];

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, setIsOpen, activeSection, scrollToSection }) => {
  if (!isOpen) return null;
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end"
    >
      <div className="w-3/4 max-w-xs bg-slate-900/95 h-full p-6 flex flex-col">
        <button
          className="self-end mb-8 text-white/80 hover:text-purple-400"
          onClick={() => setIsOpen(false)}
          aria-label="Close navigation"
        >
          <X className="h-6 w-6" />
        </button>
        <nav className="flex flex-col space-y-6">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => {
                scrollToSection(section);
                setIsOpen(false);
              }}
              className={`capitalize text-lg font-medium transition-all duration-300 text-left ${
                activeSection === section ? "text-purple-400 font-bold" : "text-white/80 hover:text-purple-400"
              }`}
            >
              {section}
            </button>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};
