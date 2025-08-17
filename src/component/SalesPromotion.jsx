import React from 'react';
import { motion } from 'framer-motion';
import { 
  Tag, 
  Clock, 
  Phone, 
  Gift,
  Star,
  ArrowRight,
  Home,
  Percent
} from 'lucide-react';

class SalesPromotion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLeft: {
        days: 15,
        hours: 8,
        minutes: 42,
        seconds: 30
      },
      isDarkMode: false
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState(prevState => {
        const { timeLeft } = prevState;
        if (timeLeft.seconds > 0) {
          return { 
            timeLeft: { ...timeLeft, seconds: timeLeft.seconds - 1 }
          };
        } else if (timeLeft.minutes > 0) {
          return { 
            timeLeft: { ...timeLeft, minutes: timeLeft.minutes - 1, seconds: 59 }
          };
        } else if (timeLeft.hours > 0) {
          return { 
            timeLeft: { ...timeLeft, hours: timeLeft.hours - 1, minutes: 59, seconds: 59 }
          };
        } else if (timeLeft.days > 0) {
          return { 
            timeLeft: { ...timeLeft, days: timeLeft.days - 1, hours: 23, minutes: 59, seconds: 59 }
          };
        }
        return prevState;
      });
    }, 1000);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }


  render() {
    const { timeLeft, isDarkMode } = this.state;

    const promotions = [
      {
        title: "Zero Down Payment",
        description: "Buy your dream home with no down payment required",
        discount: "0% Down",
        color: isDarkMode ? "bg-red-600" : "bg-red-500",
        icon: Home
      },
      {
        title: "Registration Free",
        description: "We will cover all registration costs for you",
        discount: "FREE",
        color: isDarkMode ? "bg-green-600" : "bg-green-500",
        icon: Gift
      },
      {
        title: "Bank Loan Guaranteed",
        description: "Get instant loan approval with our partner banks",
        discount: "100%",
        color: isDarkMode ? "bg-blue-600" : "bg-blue-500",
        icon: Star
      }
    ];

    // Base classes for light and dark mode to be toggled via isDarkMode
    // const darkClasses = "dark";
    // const lightClasses = "light";

    return (
      <motion.div 
        className={`py-12 transition-colors duration-300 bg-blue-200 dark:bg-gray-900`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-4">
          {/* Main Promotion Banner */}
          <motion.div
            className={`rounded-xl p-8 mb-8 relative overflow-hidden ${
              isDarkMode ? "bg-gradient-to-r from-gray-800 to-gray-700 text-white" : "bg-gradient-to-r from-emerald-900 to-blue-500 text-white dark:bg-gradient-to-r dark:from-emerald-900 dark:to-black"
            }`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full transform translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full transform -translate-x-12 translate-y-12"></div>
            
            <div className="relative z-10">
              <motion.div 
                className="flex items-center gap-2 mb-4"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Tag className="w-6 h-6" />
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                  isDarkMode ? "bg-emerald-500 text-white" : "bg-white text-blue-600 dark:text-black"
                }`}>
                  LIMITED TIME OFFER
                </span>
              </motion.div>
              
              <motion.h1 
                className="text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                Mega Property Sale
              </motion.h1>
              <motion.p 
                className={`text-xl mb-6 ${isDarkMode ? "text-gray-300" : "text-red-100"}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                Get up to 20% discount on premium properties + Zero down payment
              </motion.p>
              
              {/* Countdown Timer */}
              <motion.div 
                className="flex items-center gap-4 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <Clock className="w-5 h-5" />
                <span className="text-xl">Offer ends in:</span>
                <div className="flex gap-2">
                  {['days', 'hours', 'minutes', 'seconds'].map((unit, index) => (
                    <motion.div
                      key={unit}
                      className={`px-3 py-2 rounded-lg font-bold ${
                        isDarkMode ? "bg-orange-500 text-white" : "bg-white text-blue-700 dark:text-black"
                      }`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    >
                      {timeLeft[unit]}{unit.charAt(0)}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.button 
                className={`px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors ${
                  isDarkMode ? "bg-orange-500 text-white hover:bg-orange-600" : "bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                Book Now <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>

          {/* Promotion Cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 }
              }
            }}
          >
            {promotions.map((promo, index) => {
              const IconComponent = promo.icon;
              return (
                <motion.div 
                  key={index}
                  className={`rounded-lg p-6 shadow-lg border-2 transition-colors bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-400`}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                    hover: { scale: 1.05, boxShadow: "0px 8px 16px rgba(0,0,0,0.2)" }
                  }}
                  whileHover="hover"
                >
                  <motion.div 
                    className={`w-12 h-12 ${promo.color} rounded-lg flex items-center justify-center mb-4`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </motion.div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`${promo.color} text-white px-2 py-1 rounded text-sm font-bold`}>
                      {promo.discount}
                    </span>
                    <motion.h3 
                      className={`text-lg font-bold mb-2 ${isDarkMode ? "text-gray-100" : "dark:text-white text-gray-800"}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {promo.title}
                    </motion.h3>
                  </div>
                  <motion.p 
                    className={`mb-4 ${isDarkMode ? "text-gray-300" : " dark:text-white text-gray-600"}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    {promo.description}
                  </motion.p>
                  {/* <motion.button 
                    className="text-orange-600 font-medium hover:text-orange-700 flex items-center gap-1"
                    whileHover={{ x: 5 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    Learn More <ArrowRight className="w-4 h-4" />
                  </motion.button> */}
                </motion.div>
              );
            })}
          </motion.div>

          {/* Special Offers */}
          <h1 className=' text-4xl font-semibold mt-20 mb-8  bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 bg-clip-text text-transparent text-center'>Special Offers </h1>
          <motion.div 
            className={`rounded-lg p-6 shadow-lg bg-white dark:bg-gray-800`}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 }
              }
            }}
          >
            <motion.h2 
              className={`text-3xl font-bold mb-6 flex items-center gap-2 ${isDarkMode ? "text-gray-100" : "dark:text-white text-gray-800"}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Percent className="w-6 h-6  text-orange-600" />
              Special Offers This Month
            </motion.h2>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2 }
                }
              }}
            >
              {[
                { title: "Early Bird Discount", desc: "Book within next 7 days and get additional 5% off", value: "Save up to ৳5 Lakh", color: isDarkMode ? "bg-green-900 text-green-300 dark:text-white" : "bg-green-100 text-green-800", border: "border-green-500" },
                { title: "Referral Bonus", desc: "Refer a friend and both get ৳50,000 cashback", value: "৳50,000 Each", color: isDarkMode ? "bg-blue-900 text-blue-300" : "bg-blue-100 text-blue-800", border: "border-blue-500" },
                { title: "Flexible Payment", desc: "Pay in easy installments with 0% interest", value: "0% Interest", color: isDarkMode ? "bg-green-100 text-green-300" : "bg-green-100 text-green-800", border: "border-purple-500" },
                { title: "Free Legal Support", desc: "Complete legal documentation handled by us", value: "Worth ৳1 Lakh", color: isDarkMode ? "bg-orange-900 text-orange-300" : "bg-blue-100 text-blue-800", border: "border-orange-500" }
              ].map((offer, index) => (
                <motion.div 
                  key={index}
                  className={`border-l-4 ${offer.border} pl-4`}
                  variants={{
                    hidden: { opacity: 0, x: -50 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                  }}
                >
                  <motion.h3 
                    className="text-lg font-bold mb-2 text-gray-800 dark:text-white"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {offer.title}
                  </motion.h3>
                  <motion.p 
                    className={`mb-2 text-gray-600 dark:text-white`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    {offer.desc}
                  </motion.p>
                  <motion.span 
                    className={`px-3 py-1 rounded-full text-sm font-medium ${offer.color}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    {offer.value}
                  </motion.span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Contact CTA */}
          <motion.div 
            className={`mt-8 rounded-lg p-6 text-center bg-white dark:bg-gray-800`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h3 
              className="text-2xl dark:text-white  text-black font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              Don't Miss This Opportunity!
            </motion.h3>
            <motion.p 
              className="mb-6 dark:text-white text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              Call now to book your property and avail these exclusive offers
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <motion.button 
                className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600  text-white px-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-5 h-5" />
                Call: +880 1XX-XXXXXXX
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    );
  }
}


export default SalesPromotion;
