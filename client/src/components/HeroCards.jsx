export default function HeroCards({ icon, title, description }) {
    return (
        <div className="cursor-pointer bg-[#fcfbf9] flex flex-col items-center p-4 h-[300px] w-[320px] shadow-lg rounded-[20px]">
            <div className="text-[60px] text-[#0F766E]">
                {icon}
            </div> 
            <h3 className="mt-4 text-2xl font-semibold">{title}</h3>
            <p className="mt-4 text-gray-600 text-center">
                {description}
            </p>
        </div>
    )
}