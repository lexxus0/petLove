import { useState, useEffect } from "react";
import mobBg from "../assets/images/loading/mobLoadingImg@2x.webp";
import tabBg from "../assets/images/loading/tabLoadingImg@2x.webp";
import deskBg from "../assets/images/loading/deskLoadingImg@2x.webp";
import heart from "../assets/images/logo/hearticon.png";
import { motion, AnimatePresence } from "framer-motion";

const Loader = ({
  setShowLoader,
}: {
  setShowLoader: (value: boolean) => void;
}) => {
  const [bgImage, setBgImage] = useState(
    window.innerWidth < 768 ? mobBg : window.innerWidth < 1024 ? tabBg : deskBg
  );

  useEffect(() => {
    const handleResize = () => {
      setBgImage(
        window.innerWidth < 768
          ? mobBg
          : window.innerWidth < 1024
          ? tabBg
          : deskBg
      );
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [setShowLoader]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex flex-col items-center justify-center bg-cover bg-center text-white text-4xl font-bold z-50"
        style={{ backgroundImage: `url(${bgImage})` }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
      >
        <motion.h1
          className="flex items-center gap-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Petl
          <img src={heart} alt="Decorative heart icon" className="w-10 h-10" />
          ve
        </motion.h1>
      </motion.div>
    </AnimatePresence>
  );
};

export default Loader;
