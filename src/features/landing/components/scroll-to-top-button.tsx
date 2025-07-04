// import { ArrowUp } from "lucide-react";
import { useEffect, useState } from 'react';

import { ChevronUp } from 'lucide-react';

const ScrollToTopButton = () => {
   const [visible, setVisible] = useState(false);

   // Show button only when scrolling down
   useEffect(() => {
      const toggleVisibility = () => {
         if (window.scrollY > 300) {
            setVisible(true);
         } else {
            setVisible(false);
         }
      };

      window.addEventListener('scroll', toggleVisibility);
      return () => window.removeEventListener('scroll', toggleVisibility);
   }, []);

   const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
   };

   return (
      <button
         onClick={scrollToTop}
         className={`fixed bottom-6 right-6 z-50 rounded-full bg-blue-600 p-3 text-white shadow-lg transition-all duration-300 hover:bg-blue-700 ${
            visible ? 'opacity-100' : 'pointer-events-none opacity-0'
         }`}
         aria-label='Scroll to top'
      >
         <ChevronUp size={20} />
      </button>
   );
};

export default ScrollToTopButton;

// const ScrollToTopButton = () => {
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const toggleVisibility = () => {
//       setVisible(window.scrollY > 300);
//     };

//     window.addEventListener("scroll", toggleVisibility);
//     return () => window.removeEventListener("scroll", toggleVisibility);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <button
//       onClick={scrollToTop}
//       className={`fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg
//         backdrop-blur-md bg-white/20 border border-white/30
//         text-blue-600 hover:text-white hover:bg-blue-600 transition-all duration-300
//         hover:rotate-12 ${
//           visible ? "opacity-100" : "opacity-0 pointer-events-none"
//         }`}
//       aria-label="Scroll to top"
//     >
//       <ChevronUp size={22} strokeWidth={2.5} />
//     </button>
//   );
// };

// export default ScrollToTopButton;

// const ScrollToTopButton = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsVisible(window.scrollY > 200);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <button
//       onClick={scrollToTop}
//       aria-label="Scroll to top"
//       className={`fixed bottom-6 right-6 z-50 transition-all duration-300 rounded-full
//         ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"}
//         bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600
//         text-white shadow-lg hover:shadow-2xl w-12 h-12 flex items-center justify-center`}
//     >
//       <ArrowUp size={22} />
//     </button>
//   );
// };

// export default ScrollToTopButton;
