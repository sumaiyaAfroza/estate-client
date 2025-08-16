import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Ki bhabe ami amar property list korte pari?",
    answer:
      "Apni amader platform e sign up kore 'List Your Property' option e giye property details submit kore list korte parben.",
  },
  {
    question: "Property rent ar sale er jonno ki ki option ache?",
    answer:
      "Apni property ke rent, sale, ba rent to own option e post korte parben, jeita apnar proyojon onujayi.",
  },
  {
    question: "Property dekhte jete ki age appointment nite hoy?",
    answer:
      "Hain, appointment nite hobe. Apni property page e giye owner ba agent er shathe contact kore appointment nite parben.",
  },
  {
    question: "Payment process kemon?",
    answer:
      "Payment amra safe online gateway diye niye thaki. Apni multiple payment method diye payment korte parben.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "30px auto",
        fontFamily: "Arial, sans-serif",
        background: "#f9fafc",
        borderRadius: 16,
        boxShadow: "0 6px 26px rgba(80, 80, 171, 0.11)",
        padding: "32px 24px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 24, color: "#26326c" }}>
        FAQ — Estate Platform
      </h2>
      {faqs.map((faq, index) => (
        <div key={index} style={{ marginBottom: 16 }}>
          <button
            onClick={() => toggleFAQ(index)}
            style={{
              width: "100%",
              background: "#e7eafd",
              border: "none",
              outline: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "18px 20px",
              borderRadius: 8,
              fontWeight: "600",
              fontSize: 16,
              color: "#38425c",
              cursor: "pointer",
              boxShadow: openIndex === index ? "0 3px 10px rgba(80,80,171,0.09)" : "none",
              transition: "background 0.25s",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* Optionally, place any category icon here */}
              {faq.question}
            </span>
            {openIndex === index ? (
              <FaChevronUp size={20} color="#26326c" />
            ) : (
              <FaChevronDown size={20} color="#26326c" />
            )}
          </button>

          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.33 }}
                style={{
                  overflow: "hidden",
                  padding: "12px 20px 10px 20px",
                  background: "#fff",
                  borderRadius: "0 0 8px 8px",
                  border: "1px solid #e7eafd",
                  borderTop: "none",
                  color: "#495789",
                  marginTop: -6,
                  fontSize: 15,
                  boxShadow: "0 2px 4px rgba(80,80,171,0.06)",
                }}
              >
                {faq.answer}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
