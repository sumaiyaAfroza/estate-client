import React from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert2
import {
  Mail,
  Bell,
  Home,
  TrendingUp,
  MapPin,
  Calendar,
  CheckCircle,
  ArrowRight,
  Users,
  Star,
  Gift,
} from 'lucide-react';

class Newsletter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      preferences: {
        newListings: true,
        priceDrops: true,
        marketNews: false,
        events: false,
      },
      isSubscribed: false,
      isLoading: false,
      errors: {},
    };
  }

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
      errors: { ...this.state.errors, email: '' },
    });
  };

  handlePreferenceChange = (preference) => {
    this.setState((prevState) => ({
      preferences: {
        ...prevState.preferences,
        [preference]: !prevState.preferences[preference],
      },
    }));
  };

  validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, preferences } = this.state;

    if (!email.trim()) {
      Swal.fire({
        title: 'Oops!',
        text: 'Please enter your email address.',
        icon: 'warning',
        confirmButtonColor: '#0D9488',
      });
      return;
    }

    if (!this.validateEmail(email)) {
      Swal.fire({
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
        icon: 'error',
        confirmButtonColor: '#0D9488',
      });
      return;
    }

    // Show confirmation dialog
    Swal.fire({
      title: 'Subscribe to Property News?',
      text: `You'll get updates, market insights, and exclusive offers at ${email}.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, subscribe!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      backdrop: true,
      background: '#fff',
      confirmButtonColor: '#0D9488',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.setState({ isLoading: true });

        // Simulate API call
        setTimeout(() => {
          this.setState({
            isLoading: false,
            isSubscribed: true,
            email: '',
            preferences: {
              newListings: true,
              priceDrops: true,
              marketNews: false,
              events: false,
            },
          });

          // Show success message
          Swal.fire({
            title: 'Thank You!',
            text: `You're now part of our property community 💚.`,
            icon: 'success',
            confirmButtonColor: '#0D9488',
          });
        }, 1500);
      }
    });
  };

  resetForm = () => {
    this.setState({
      isSubscribed: false,
      email: '',
      preferences: {
        newListings: true,
        priceDrops: true,
        marketNews: false,
        events: false,
      },
    });
  };

  render() {
    const { email, preferences, isSubscribed, isLoading, errors } = this.state;

    const benefits = [
      {
        icon: Home,
        title: 'New Property Alerts',
        description: 'Get notified first about new listings in your area',
        color: 'text-blue-500',
      },
      {
        icon: TrendingUp,
        title: 'Market Updates',
        description: 'Weekly market trends and price analysis',
        color: 'text-green-500',
      },
      {
        icon: MapPin,
        title: 'Area Insights',
        description: 'Neighborhood developments and infrastructure news',
        color: 'text-purple-500',
      },
      {
        icon: Gift,
        title: 'Exclusive Offers',
        description: 'Special deals and early access to premium properties',
        color: 'text-orange-500',
      },
    ];

    const preferences_list = [
      {
        key: 'newListings',
        icon: Home,
        title: 'New Property Listings',
        description: 'Latest properties matching your criteria',
      },
      {
        key: 'priceDrops',
        icon: TrendingUp,
        title: 'Price Drop Alerts',
        description: 'When properties reduce their prices',
      },
      {
        key: 'marketNews',
        icon: Bell,
        title: 'Market News',
        description: 'Real estate market updates and trends',
      },
      {
        key: 'events',
        icon: Calendar,
        title: 'Events & Seminars',
        description: 'Property exhibitions and investment seminars',
      },
    ];

    if (isSubscribed) {
      return (
        <div className="py-12 bg-blue-200 dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                Successfully Subscribed!
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                Thank you for subscribing to our newsletter. You'll receive your first update soon!
              </p>
              <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4 mb-6">
                <p className="text-green-800 dark:text-green-200 font-medium">
                  🎉 Welcome bonus: Get ৳10,000 off on your first property booking!
                </p>
              </div>
              <button
                onClick={this.resetForm}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
              >
                Subscribe Another Email
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-blue-200 dark:bg-black">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-600 dark:bg-blue-700 rounded-full">
                <Mail className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-4">
              Stay Updated with Property News
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Subscribe to our newsletter and never miss out on the best property deals,
              market insights, and exclusive offers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Benefits Section */}
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-6">
                What You'll Get:
              </h3>
              <div className="space-y-6">
                {benefits.map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                        <IconComponent className={`w-6 h-6 ${benefit.color}`} />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                          {benefit.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Stats */}
              <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                      25K+
                    </div>
                    <div className="text-gray-600 dark:text-gray-300 text-sm">Subscribers</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                      1K+
                    </div>
                    <div className="text-gray-600 dark:text-gray-300 text-sm">
                      Properties Found
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                      95%
                    </div>
                    <div className="text-gray-600 dark:text-gray-300 text-sm">
                      Satisfaction Rate
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subscription Form */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-6">
                Subscribe Now
              </h3>

              <div className="space-y-6">
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400 dark:text-gray-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={this.handleEmailChange}
                      placeholder="Enter your email address"
                      className={`w-full pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                        errors.email
                          ? 'border-red-500 dark:border-red-500'
                          : 'border-gray-300 dark:border-gray-700'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Preferences */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
                    Email Preferences
                  </label>
                  <div className="space-y-3">
                    {preferences_list.map((pref) => {
                      const IconComponent = pref.icon;
                      return (
                        <div key={pref.key} className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={preferences[pref.key]}
                            onChange={() => this.handlePreferenceChange(pref.key)}
                            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-700 rounded focus:ring-blue-500"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <IconComponent className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                              <span className="font-medium text-gray-800 dark:text-gray-100">
                                {pref.title}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {pref.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  onClick={this.handleSubmit}
                  disabled={isLoading}
                  className={`w-full px-6 py-3 text-white font-medium rounded-md transition-colors ${
                    isLoading
                      ? 'bg-gray-400 dark:bg-gray-700 cursor-not-allowed'
                      : 'bg-teal-600 hover:bg-teal-700'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      Subscribing...
                    </>
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </div>

              {/* Footer Note */}
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div className="flex items-start gap-2">
                  <Star className="w-5 h-5 text-yellow-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-700 dark:text-gray-200 font-medium mb-1">
                      Free to Subscribe
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      No spam, unsubscribe anytime. We respect your privacy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Newsletter;

// import React from 'react';
// import { 
//   Mail, 
//   Bell, 
//   Home, 
//   TrendingUp,
//   MapPin,
//   Calendar,
//   CheckCircle,
//   ArrowRight,
//   Users,
//   Star,
//   Gift
// } from 'lucide-react';

// class Newsletter extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: '',
//       preferences: {
//         newListings: true,
//         priceDrops: true,
//         marketNews: false,
//         events: false
//       },
//       isSubscribed: false,
//       isLoading: false,
//       errors: {}
//     };
//   }

//   handleEmailChange = (e) => {
//     this.setState({ 
//       email: e.target.value,
//       errors: { ...this.state.errors, email: '' }
//     });
//   }

//   handlePreferenceChange = (preference) => {
//     this.setState(prevState => ({
//       preferences: {
//         ...prevState.preferences,
//         [preference]: !prevState.preferences[preference]
//       }
//     }));
//   }

//   validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   }

//   handleSubmit = (e) => {
//     e.preventDefault();
//     const { email } = this.state;
//     let errors = {};

//     if (!email.trim()) {
//       errors.email = 'Email address is required';
//     } else if (!this.validateEmail(email)) {
//       errors.email = 'Please enter a valid email address';
//     }

//     if (Object.keys(errors).length > 0) {
//       this.setState({ errors });
//       return;
//     }

//     this.setState({ isLoading: true, errors: {} });

//     // Simulate API call
//     setTimeout(() => {
//       this.setState({ 
//         isLoading: false, 
//         isSubscribed: true,
//         email: '',
//         preferences: {
//           newListings: true,
//           priceDrops: true,
//           marketNews: false,
//           events: false
//         }
//       });
//     }, 1500);
//   }

//   resetForm = () => {
//     this.setState({
//       isSubscribed: false,
//       email: '',
//       preferences: {
//         newListings: true,
//         priceDrops: true,
//         marketNews: false,
//         events: false
//       }
//     });
//   }

//   render() {
//     const { email, preferences, isSubscribed, isLoading, errors } = this.state;

//     const benefits = [
//       {
//         icon: Home,
//         title: "New Property Alerts",
//         description: "Get notified first about new listings in your area",
//         color: "text-blue-500"
//       },
//       {
//         icon: TrendingUp,
//         title: "Market Updates",
//         description: "Weekly market trends and price analysis",
//         color: "text-green-500"
//       },
//       {
//         icon: MapPin,
//         title: "Area Insights",
//         description: "Neighborhood developments and infrastructure news",
//         color: "text-purple-500"
//       },
//       {
//         icon: Gift,
//         title: "Exclusive Offers",
//         description: "Special deals and early access to premium properties",
//         color: "text-orange-500"
//       }
//     ];

//     const preferences_list = [
//       {
//         key: 'newListings',
//         icon: Home,
//         title: 'New Property Listings',
//         description: 'Latest properties matching your criteria'
//       },
//       {
//         key: 'priceDrops',
//         icon: TrendingUp,
//         title: 'Price Drop Alerts',
//         description: 'When properties reduce their prices'
//       },
//       {
//         key: 'marketNews',
//         icon: Bell,
//         title: 'Market News',
//         description: 'Real estate market updates and trends'
//       },
//       {
//         key: 'events',
//         icon: Calendar,
//         title: 'Events & Seminars',
//         description: 'Property exhibitions and investment seminars'
//       }
//     ];

//     if (isSubscribed) {
//       return (
//   <div className="py-12 bg-blue-200 dark:from-gray-900 dark:to-gray-800">
//           <div className="max-w-4xl mx-auto px-4 text-center">
//             <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
//               <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <CheckCircle className="w-10 h-10 text-white" />
//               </div>
//               <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
//                 Successfully Subscribed!
//               </h2>
//               <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
//                 Thank you for subscribing to our newsletter. You'll receive your first update soon!
//               </p>
//               <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4 mb-6">
//                 <p className="text-green-800 dark:text-green-200 font-medium">
//                   🎉 Welcome bonus: Get ৳10,000 off on your first property booking!
//                 </p>
//               </div>
//               <button 
//                 onClick={this.resetForm}
//                 className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
//               >
//                 Subscribe Another Email
//               </button>
//             </div>
//           </div>
//         </div>
//       );
//     }

//     return (
//   <div className=" bg-blue-200 dark:bg-black">
//   <div className="max-w-6xl mx-auto px-4">
          
//           {/* Header Section */}
//           <div className="text-center mb-12">
//             <div className="flex justify-center mb-4">
//               <div className="p-3 bg-blue-600 dark:bg-blue-700 rounded-full">
//                 <Mail className="w-8 h-8 text-white" />
//               </div>
//             </div>
//             <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 bg-clip-text text-transparent  mb-4">
//               Stay Updated with Property News
//             </h2>
//             <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
//               Subscribe to our newsletter and never miss out on the best property deals, 
//               market insights, and exclusive offers.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
//             {/* Benefits Section */}
//             <div>
//               <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-6">
//                 What You'll Get:
//               </h3>
//               <div className="space-y-6">
//                 {benefits.map((benefit, index) => {
//                   const IconComponent = benefit.icon;
//                   return (
//                     <div key={index} className="flex items-start gap-4">
//                       <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md">
//                         <IconComponent className={`w-6 h-6 ${benefit.color}`} />
//                       </div>
//                       <div>
//                         <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
//                           {benefit.title}
//                         </h4>
//                         <p className="text-gray-600 dark:text-gray-300">
//                           {benefit.description}
//                         </p>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* Stats */}
//               <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
//                 <div className="grid grid-cols-3 gap-4 text-center">
//                   <div>
//                     <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">25K+</div>
//                     <div className="text-gray-600 dark:text-gray-300 text-sm">Subscribers</div>
//                   </div>
//                   <div>
//                     <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">1K+</div>
//                     <div className="text-gray-600 dark:text-gray-300 text-sm">Properties Found</div>
//                   </div>
//                   <div>
//                     <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">95%</div>
//                     <div className="text-gray-600 dark:text-gray-300 text-sm">Satisfaction Rate</div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Subscription Form */}
//             <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
//               <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-6">
//                 Subscribe Now
//               </h3>
              
//               <div className="space-y-6">
//                 {/* Email Input */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
//                     Email Address *
//                   </label>
//                   <div className="relative">
//                     <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400 dark:text-gray-500" />
//                     <input
//                       type="email"
//                       value={email}
//                       onChange={this.handleEmailChange}
//                       placeholder="Enter your email address"
//                       className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400 ${
//                         errors.email ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'
//                       }`}
//                     />
//                   </div>
//                   {errors.email && (
//                     <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//                   )}
//                 </div>

//                 {/* Preferences */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
//                     Email Preferences
//                   </label>
//                   <div className="space-y-3">
//                     {preferences_list.map((pref) => {
//                       const IconComponent = pref.icon;
//                       return (
//                         <div key={pref.key} className="flex items-start gap-3">
//                           <input
//                             type="checkbox"
//                             checked={preferences[pref.key]}
//                             onChange={() => this.handlePreferenceChange(pref.key)}
//                             className="mt-1 w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-700 rounded focus:ring-blue-500"
//                           />
//                           <div className="flex-1">
//                             <div className="flex items-center gap-2 mb-1">
//                               <IconComponent className="w-4 h-4 text-gray-500 dark:text-gray-400" />
//                               <span className="font-medium text-gray-800 dark:text-gray-100">{pref.title}</span>
//                             </div>
//                             <p className="text-sm text-gray-600 dark:text-gray-400">{pref.description}</p>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors flex items-center justify-center gap-2 ${
//                     isLoading 
//                       ? 'bg-gray-400 dark:bg-gray-700 cursor-not-allowed' 
//                       : 'bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white'
//                   }`}
//                 >
//                   {isLoading ? (
//                     <>
//                       <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
//                       Subscribing...
//                     </>
//                   ) : (
//                     <>
//                       Subscribe Now <ArrowRight className="w-5 h-5" />
//                     </>
//                   )}
//                 </button>
//               </div>

//               {/* Footer Note */}
//               <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
//                 <div className="flex items-start gap-2">
//                   <Star className="w-5 h-5 text-yellow-500 mt-0.5" />
//                   <div>
//                     <p className="text-sm text-gray-700 dark:text-gray-200 font-medium mb-1">
//                       Free to Subscribe
//                     </p>
//                     <p className="text-xs text-gray-600 dark:text-gray-400">
//                       No spam, unsubscribe anytime. We respect your privacy.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default Newsletter;