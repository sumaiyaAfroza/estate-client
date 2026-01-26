import React, { useState } from "react";
import { Plus, Minus, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import faqAnimation from "../assets/FAQ Blue.json";
import Lottie from "lottie-react";

const faqs = [
  {
    category: "Listing",
    question: "How can I list my property?",
    answer: "Sign up on our platform and use the 'List Your Property' option to submit your property details for listing.",
  },
  {
    category: "Process",
    question: "What options are available for renting or selling?",
    answer: "You can post your property for rent, sale, or a rent-to-own option, based on your requirements.",
  },
  {
    category: "Booking",
    question: "Do I need to schedule an appointment?",
    answer: "Yes, you'll need to schedule an appointment. Contact the owner or agent from the property page to set it up.",
  },
  {
    category: "Security",
    question: "How does the payment process work?",
    answer: "Payments are handled securely via our online gateway. Multiple payment methods are available for your convenience.",
  },
];

const FAQ = () => {
  // ১. State ম্যানেজমেন্ট ঠিক করা হয়েছে
  const [openIndex, setOpenIndex] = useState(0); 

  // ২. Toggle ফাংশনটি এখানে যোগ করা হয়েছে
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-2px-6 bg-white dark:bg-[#030712] overflow-hidden mb-10">
      {/* Decorative Circles */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-4 items-start">
          
          {/* Left Side */}
          <div className="lg:col-span-5">

            <div className="hidden lg:block w-full max-w-[200px]">
              <Lottie animationData={faqAnimation} loop={true} />
            </div>


            <div>
              <span className="inline-block px-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-bold tracking-wider uppercase mb-4">
                Support Center
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight">
                Any <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-600">Questions?</span>
              </h2>
              <p className="mt-6 text-slate-500 dark:text-slate-400 text-lg">
                If you have any doubts about our platform, you'll find solutions here.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center text-white shadow-lg">
                <MessageCircle size={28} />
              </div>
              <div>
                <h4 className="font-bold dark:text-white">Still confused?</h4>
                <p className="text-sm text-slate-500">Our support team is 24/7 active.</p>
              </div>
            </div>

            
          </div>

          {/* Right Side: Accordion */}
          <div className="lg:col-span-7 space-y-4">
            {faqs.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`relative rounded-3xl transition-all duration-500 ${
                    isOpen 
                    ? "bg-white dark:bg-slate-900 shadow-xl" 
                    : "hover:bg-slate-50 dark:hover:bg-slate-800/30"
                  }`}
                >
                  {/* বাটনে onClick ঠিকমতো কল করা হয়েছে */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-start gap-6 p-6 md:p-8 text-left outline-none"
                  >
                    <span className={`text-2xl font-black ${
                      isOpen ? "text-emerald-500" : "text-slate-300 dark:text-slate-700"
                    }`}>
                      0{index + 1}
                    </span>
                    
                    <div className="flex-1">
                      <span className="text-[10px] font-black uppercase tracking-[2px] text-emerald-500 mb-2 block">
                        {item.category}
                      </span>
                      <h3 className={`text-xl font-bold ${
                        isOpen ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400"
                      }`}>
                        {item.question}
                      </h3>
                      
                      {/* অ্যানিমেশন পার্ট */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <p className="mt-4 text-slate-500 dark:text-slate-400 leading-relaxed">
                              {item.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className={`mt-1 transition-transform duration-500 ${isOpen ? "rotate-180 text-emerald-500" : "text-slate-400"}`}>
                       {isOpen ? <Minus size={24} /> : <Plus size={24} />}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;

// import React, { useState } from "react";
// import { FaPlus, FaMinus } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import faqAnimation from "../assets/FAQ Blue.json"; // Variable name changed to avoid conflict
// import Lottie from "lottie-react";

// const faqs = [
//   {
//     question: "How can I list my property?",
//     answer: "Sign up on our platform and use the 'List Your Property' option to submit your property details for listing.",
//   },
//   {
//     question: "What options are available for renting or selling?",
//     answer: "You can post your property for rent, sale, or a rent-to-own option, based on your requirements.",
//   },
//   {
//     question: "Do I need to schedule an appointment to view a property?",
//     answer: "Yes, you'll need to schedule an appointment. Contact the owner or agent from the property page to set it up.",
//   },
//   {
//     question: "How does the payment process work?",
//     answer: "Payments are handled securely via our online gateway. Multiple payment methods are available for your convenience.",
//   },
// ];

// const FAQ = () => {
//   const [openIndex, setOpenIndex] = useState(null);

//   const toggleFAQ = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <section className="py-20 px-6 max-w-7xl mx-auto overflow-hidden">
//       {/* Section Header */}
//       <div className="text-center mb-16">
//         <motion.h2 
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           className="text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 bg-clip-text text-transparent pb-2"
//         >
//           Frequently Asked Questions
//         </motion.h2>
//         <p className="mt-4 text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
//           আমাদের প্ল্যাটফর্ম সম্পর্কে আপনার মনে থাকা সাধারণ প্রশ্নগুলোর উত্তর এখানে পাবেন।
//         </p>
//       </div>

//       <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        
//         {/* Lottie Animation Side */}
//         <motion.div 
//           initial={{ opacity: 0, x: -50 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           className="w-full lg:w-1/2 flex justify-center"
//         >
//           <div className="w-full max-w-[500px] h-auto">
//             <Lottie animationData={faqAnimation} loop={true} />
//           </div>
//         </motion.div>

//         {/* FAQ Accordion Side */}
//         <div className="w-full lg:w-1/2 space-y-4">
//           {faqs.map((item, index) => {
//             const isOpen = openIndex === index;
//             return (
//               <motion.div
//                 key={index}
//                 initial={false}
//                 className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
//                   isOpen 
//                   ? "bg-white dark:bg-slate-900 border-emerald-500/50 shadow-xl shadow-emerald-500/5" 
//                   : "bg-slate-50 dark:bg-slate-800/50 border-transparent hover:border-slate-300 dark:hover:border-slate-700"
//                 }`}
//               >
//                 <button
//                   onClick={() => toggleFAQ(index)}
//                   className="w-full flex items-center justify-between p-5 md:p-6 text-left outline-none"
//                 >
//                   <span className={`text-lg font-bold transition-colors duration-300 ${
//                     isOpen ? "text-emerald-600 dark:text-emerald-400" : "text-slate-700 dark:text-slate-200"
//                   }`}>
//                     {item.question}
//                   </span>
                  
//                   <div className={`flex-shrink-0 ml-4 p-2 rounded-full transition-all duration-300 ${
//                     isOpen ? "bg-emerald-500 text-white rotate-180" : "bg-slate-200 dark:bg-slate-700 text-slate-500"
//                   }`}>
//                     {isOpen ? <FaMinus size={14} /> : <FaPlus size={14} />}
//                   </div>
//                 </button>

//                 <AnimatePresence>
//                   {isOpen && (
//                     <motion.div
//                       initial={{ height: 0, opacity: 0 }}
//                       animate={{ height: "auto", opacity: 1 }}
//                       exit={{ height: 0, opacity: 0 }}
//                       transition={{ duration: 0.3, ease: "easeInOut" }}
//                     >
//                       <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4">
//                         {item.answer}
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </motion.div>
//             );
//           })}
//         </div>

//       </div>
//     </section>
//   );
// };

// export default FAQ;

