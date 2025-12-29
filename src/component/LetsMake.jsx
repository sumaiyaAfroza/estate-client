import {
  ShieldCheck,
  Home,
  Handshake,
  KeyRound,
} from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Verify Your Identity",
    description: "Ensure security by verifying your identity before exploring properties.",
    icon: <ShieldCheck className="text-white" size={30} />,
  },
  {
    id: 2,
    title: "Find Your Home",
    description: "Search across thousands of listings tailored to your lifestyle and budget.",
    icon: <Home className="text-white" size={30} />,
  },
  {
    id: 3,
    title: "Connect & Negotiate",
    description: "Talk directly with agents and finalize the perfect deal for you.",
    icon: <Handshake className="text-white" size={30} />,
  },
  {
    id: 4,
    title: "Get the Keys",
    description: "After finalizing, move in and begin a new journey in your dream home.",
    icon: <KeyRound className="text-white" size={30} />,
  },
];

const LetsMake = () => {
  return (
    <section className=" dark:bg-[#1E2939] py-10">
      <div className=" px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-14">
          Let’s Make It Happen
        </h2>

        <div className="flex justify-between items-center">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-white w-60 dark:bg-gray-900 rounded-xl p-6 shadow-md dark:shadow-none hover:shadow-lg dark:hover:shadow-md transition duration-300 flex flex-col items-start gap-5 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex-shrink-0">
                <div 
                
                className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500  bg-opacity-50 border border-gray-300 dark:border-gray-200 flex items-center justify-center shadow-inner backdrop-blur-md text-indigo-600"
                >
                  {step.icon}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 text-center mt-1">
                  Step {step.id}
                </div>
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LetsMake;
