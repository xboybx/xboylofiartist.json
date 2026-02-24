import React from 'react';
import { motion } from 'framer-motion';
import { PageSection } from '../../types';
import Navbar from './Navbar';

interface PageLayoutProps {
  children: React.ReactNode;
  section: PageSection;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, section }) => {
  return (
    <motion.div
      className="min-h-screen flex flex-col relative bg-cover bg-center bg-no-repeat bg-scroll md:bg-fixed"
      style={{
        backgroundImage: section.backgroundImage ? `url(${section.backgroundImage})` : undefined,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeIn", duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px] z-0"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <motion.main
          className="flex-grow pt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <section
            id={section.id}
            className="w-full py-12 md:py-16"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </section>
        </motion.main>

      </div>
    </motion.div>
  );
};

export default PageLayout;