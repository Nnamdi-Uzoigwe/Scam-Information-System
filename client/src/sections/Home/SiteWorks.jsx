import { FaPencil } from "react-icons/fa6";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import HeroCards from "../../components/HeroCards";

export default function SiteWorks() {
  const worksArray = [
    {
      id: 1,
      icon: <FaPencil />,
      title: "Report in Seconds",
      description:
        "Fill out our streamlined form with the scammer's details-name, phone, email and a description of the scam-and submit in no time to the database.",
    },
    {
      id: 2,
      icon: <FaMagnifyingGlass />,
      title: "Instant Verification",
      description:
        "Search our up-to-date database by name, phone number or email - get real-time results to confirm if you're dealing with a known scammer.",
    },
    {
      id: 3,
      icon: <IoShieldCheckmarkSharp />,
      title: "Stay Protected",
      description:
        "Opt-in for personalized alerts and safety tips. We'll notify you when new reports match your saved contacts or keywords.",
    },
  ];
  return (
    <div className="px-30 py-20 border-y-2 border-gray-300">
      <h2 className="text-[35px] text-center font-semibold">How to use</h2>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 justify-items-center lg:grid-cols-3 gap-4">
        {worksArray.map((item) => (
            <HeroCards 
                key={item.id}
                icon={item.icon}
                title={item.title}
                description={item.description}
            />
        ))}
      </div>
    </div>
  );
}
