import {
  UserRoundPlus,
  Building2,
  BadgeDollarSign,
  DoorOpen,
} from "lucide-react";

const steps = [
  {
    id: 1,
    icon: <UserRoundPlus size={34} />,
    title: "Create Account",
    desc: "Start your journey by creating a secure account to access exclusive listings.",
    bg: "from-indigo-500 to-purple-500",
  },
  {
    id: 2,
    icon: <Building2 size={34} />,
    title: "Explore Listings",
    desc: "Browse verified properties based on your preferences and budget.",
    bg: "from-pink-500 to-red-500",
  },
  {
    id: 3,
    icon: <BadgeDollarSign size={34} />,
    title: "Place an Offer",
    desc: "Negotiate or send offers directly to the agent or property owner.",
    bg: "from-emerald-500 to-lime-500",
  },
  {
    id: 4,
    icon: <DoorOpen  size={34} />,
    title: "Move In",
    desc: "Seal the deal securely and get the keys to your brand-new space.",
    bg: "from-orange-500 to-yellow-400",
  },
];

const Extra = () => {
  return (
    <section className="py-16 ">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-12">
          How It Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map(({ id, icon, title, desc, bg }) => (
            <div
              key={id}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 hover:-translate-y-1 transition-transform duration-300 border border-gray-200 dark:border-gray-700"
            >
              <div
                className={`w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-gradient-to-br ${bg} text-white shadow-lg mb-5`}
              >
                {icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Extra;
