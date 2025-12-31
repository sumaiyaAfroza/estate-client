import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import faqAnimation from "../assets/FAQ Blue.json"; // Variable name changed to avoid conflict
import Lottie from "lottie-react";

const faqs = [
  {
    question: "How can I list my property?",
    answer: "Sign up on our platform and use the 'List Your Property' option to submit your property details for listing.",
  },
  {
    question: "What options are available for renting or selling?",
    answer: "You can post your property for rent, sale, or a rent-to-own option, based on your requirements.",
  },
  {
    question: "Do I need to schedule an appointment to view a property?",
    answer: "Yes, you'll need to schedule an appointment. Contact the owner or agent from the property page to set it up.",
  },
  {
    question: "How does the payment process work?",
    answer: "Payments are handled securely via our online gateway. Multiple payment methods are available for your convenience.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 bg-clip-text text-transparent pb-2"
        >
          Frequently Asked Questions
        </motion.h2>
        <p className="mt-4 text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
          আমাদের প্ল্যাটফর্ম সম্পর্কে আপনার মনে থাকা সাধারণ প্রশ্নগুলোর উত্তর এখানে পাবেন।
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Lottie Animation Side */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="w-full lg:w-1/2 flex justify-center"
        >
          <div className="w-full max-w-[500px] h-auto">
            <Lottie animationData={faqAnimation} loop={true} />
          </div>
        </motion.div>

        {/* FAQ Accordion Side */}
        <div className="w-full lg:w-1/2 space-y-4">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={false}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen 
                  ? "bg-white dark:bg-slate-900 border-emerald-500/50 shadow-xl shadow-emerald-500/5" 
                  : "bg-slate-50 dark:bg-slate-800/50 border-transparent hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left outline-none"
                >
                  <span className={`text-lg font-bold transition-colors duration-300 ${
                    isOpen ? "text-emerald-600 dark:text-emerald-400" : "text-slate-700 dark:text-slate-200"
                  }`}>
                    {item.question}
                  </span>
                  
                  <div className={`flex-shrink-0 ml-4 p-2 rounded-full transition-all duration-300 ${
                    isOpen ? "bg-emerald-500 text-white rotate-180" : "bg-slate-200 dark:bg-slate-700 text-slate-500"
                  }`}>
                    {isOpen ? <FaMinus size={14} /> : <FaPlus size={14} />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQ;



// import React, { useState } from "react";
// import { FaChevronDown, FaChevronUp } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import faq from "../assets/FAQ Blue.json";
// import Lottie from "lottie-react";

// const faqs = [
//   {
//     question: "How can I list my property?",
//     answer:
//       "Sign up on our platform and use the 'List Your Property' option to submit your property details for listing.",
//   },
//   {
//     question: "What options are available for renting or selling?",
//     answer:
//       "You can post your property for rent, sale, or a rent-to-own option, based on your requirements.",
//   },
//   {
//     question: "Do I need to schedule an appointment to view a property?",
//     answer:
//       "Yes, you'll need to schedule an appointment. Contact the owner or agent from the property page to set it up.",
//   },
//   {
//     question: "How does the payment process work?",
//     answer:
//       "Payments are handled securely via our online gateway. Multiple payment methods are available for your convenience.",
//   },
// ];

// const FAQ = () => {
//   const [openIndex, setOpenIndex] = useState(null);

//   const toggleFAQ = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <div>
//       <div className="text-center mt-20">
//         <h2 className="text-3xl md:text-4xl font-bold  bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
//           Frequently Asked Questions
//         </h2>
//         <p className="mt-2 text-base md:text-lg text-gray-600 dark:text-gray-300">
//           Everything you need to know about using our Estate Platform.
//         </p>
//       </div>

      
//       <div className="flex justify-center mx-40 items-center">
//         {/* FAQ */}
//         <div
//           className="
//     max-w-[600px] 
//     mx-auto  
//     font-sans 
//     bg-[#f9fafc] 
//     dark:bg-gray-900
//     rounded-2xl 
//     border-green-500
//     shadow-[0_6px_26px_rgba(80,80,171,0.11)] 
//     p-8
//   "
//           // style={{

//           //   maxWidth: 600,
//           //   margin: "30px auto",
//           //   fontFamily: "Arial, sans-serif",
//           //   background: "#f9fafc",
//           //   borderRadius: 16,
//           //   boxShadow: "0 6px 26px rgba(80, 80, 171, 0.11)",
//           //   padding: "32px 24px",
//           // }}
//         >
//           <h2
//             style={{ textAlign: "center", marginBottom: 24 }}
//             className="text-[#26326c] text-2xl underline dark:text-white"
//           >
//             FAQ — Estate Platform
//           </h2>
//           {faqs.map((faq, index) => (
//             <div key={index} style={{ marginBottom: 16 }}>
//               <button
//                 onClick={() => toggleFAQ(index)}
//                 className={`
//     w-full 
//     bg-[#e7eafd] 
//     dark:bg-[#1E2939]
//     border-0 
//     outline-none 
//     flex 
//     items-center 
//     justify-between 
//     px-5 py-[18px] 
//     rounded-lg 
//     font-semibold 
//     text-[16px] 
//     text-[#38425c] 
//     dark:text-white
//     cursor-pointer 
//     transition-colors 
//     ${openIndex === index ? "shadow-[0_3px_10px_rgba(80,80,171,0.09)]" : ""}
//   `}
//                 // style={{
//                 //   width: "100%",
//                 //   background: "#e7eafd",
//                 //   border: "none",
//                 //   outline: "none",
//                 //   display: "flex",
//                 //   alignItems: "center",
//                 //   justifyContent: "space-between",
//                 //   padding: "18px 20px",
//                 //   borderRadius: 8,
//                 //   fontWeight: "600",
//                 //   fontSize: 16,
//                 //   color: "#38425c",
//                 //   cursor: "pointer",
//                 //   boxShadow: openIndex === index ? "0 3px 10px rgba(80,80,171,0.09)" : "none",
//                 //   transition: "background 0.25s",
//                 // }}
//               >
//                 <span
//                   style={{ display: "flex", alignItems: "center", gap: 10 }}
//                 >
//                   {/* Optionally, place category icon here */}
//                   {faq.question}
//                 </span>
//                 {openIndex === index ? (
//                   <FaChevronUp size={20} color="#26326c" />
//                 ) : (
//                   <FaChevronDown size={20} color="#26326c" />
//                 )}
//               </button>

//               <AnimatePresence initial={false}>
//                 {openIndex === index && (
//                   <motion.div
//                     initial={{ opacity: 0, height: 0 }}
//                     animate={{ opacity: 1, height: "auto" }}
//                     exit={{ opacity: 0, height: 0 }}
//                     transition={{ duration: 0.33 }}
//                     className="
//     overflow-hidden 
//     px-5 pt-3 pb-[10px] 
//     bg-white 
//     dark:bg-black 
//     rounded-b-lg 
//     border border-[#e7eafd] border-t-0 
//     text-[#1e222c] 
//     dark:text-white
//     -mt-[6px] 
//     text-[15px] 
//     shadow-[0_2px_4px_rgba(80,80,171,0.06)]
//   "
//                     // style={{
//                     //   overflow: "hidden",
//                     //   padding: "12px 20px 10px 20px",
//                     //   background: "#fff",
//                     //   borderRadius: "0 0 8px 8px",
//                     //   border: "1px solid #e7eafd",
//                     //   borderTop: "none",
//                     //   color: "#495789",
//                     //   marginTop: -6,
//                     //   fontSize: 15,
//                     //   boxShadow: "0 2px 4px rgba(80,80,171,0.06)",
//                     // }}
//                   >
//                     {faq.answer}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           ))}
//         </div>

//         {/* lottie files  */}
//         <div className=" h-[700px] w-[700px] ">
//           <Lottie animationData={faq} loop={true} />;
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FAQ;
