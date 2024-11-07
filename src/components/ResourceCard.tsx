/*
import React, { useState } from 'react';
import { motion } from "framer-motion"
import { IconType } from 'react-icons';

interface ResourceCardProps {
  language: string;
  Icon: IconType;
  description: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ language, Icon, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="p-4">
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
        className="w-full max-w-xs overflow-hidden rounded-lg"
        style={{
          boxShadow: isHovered
            ? '0 10px 25px -5px rgba(241, 96, 254, 0.4), 0 8px 10px -6px rgba(241, 96, 254, 0.4)'
            : '0 4px 6px -1px rgba(241, 96, 254, 0.1), 0 2px 4px -2px rgba(241, 96, 254, 0.1)'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          initial={false}
          animate={{
            backgroundColor: isHovered ? "#F160FE" : "#0D0D0D",
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="h-full"
        >
          <div className="flex flex-col items-center p-6 space-y-4">
            <motion.div
              className="w-16 h-16 flex items-center justify-center"
              animate={{
                color: isHovered ? "#000" : "#fff",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Icon size={48} />
            </motion.div>
            <motion.h3
              className="text-xl font-semibold"
              animate={{
                color: isHovered ? "#000" : "#fff",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {language}
            </motion.h3>
            <motion.p
              className="text-sm text-center"
              animate={{
                color: isHovered ? "#000" : "rgba(255, 255, 255, 0.8)",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {description}
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ResourceCard;
*/
import React, { useState } from 'react';
import { motion } from "framer-motion"
import { IconType } from 'react-icons';
import { Link } from 'react-router-dom';

interface ResourceCardProps {
  language: string;
  Icon: IconType;
  description: string;
  link: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ language, Icon, description, link }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="p-4">
      <Link to={link} className="block">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
          className="w-full max-w-xs overflow-hidden rounded-lg cursor-pointer"
          style={{
            boxShadow: isHovered 
              ? '0 20px 25px -5px rgba(241, 96, 254, 0.5), 0 10px 10px -5px rgba(241, 96, 254, 0.4)' 
              : '0 10px 15px -3px rgba(241, 96, 254, 0.3), 0 4px 6px -2px rgba(241, 96, 254, 0.2)'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            initial={false}
            animate={{
              backgroundColor: isHovered ? "#F160FE" : "#0D0D0D",
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="h-full"
          >
            <div className="flex flex-col items-center p-6 space-y-4">
              <motion.div 
                className="w-16 h-16 flex items-center justify-center"
                animate={{
                  color: isHovered ? "#000" : "#fff",
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <Icon size={48} />
              </motion.div>
              <motion.h3 
                className="text-xl font-semibold"
                animate={{
                  color: isHovered ? "#000" : "#fff",
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {language}
              </motion.h3>
              <motion.p 
                className="text-sm text-center"
                animate={{
                  color: isHovered ? "#000" : "rgba(255, 255, 255, 0.8)",
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {description}
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      </Link>
    </div>
  );
};

export default ResourceCard;