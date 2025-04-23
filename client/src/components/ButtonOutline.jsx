export default function ButtonOutline({ children }) {
    return (
        <div className="px-[10px] md:px-8 py-3 bg-transparent cursor-pointer text-white font-medium border-2 border-[#0F766E] hover:bg-[#06766e] rounded-lg transition duration-300 transform hover:scale-105">
            {children}
        </div>
    )
}