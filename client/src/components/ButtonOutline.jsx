export default function ButtonOutline({ children }) {
    return (
        <div className="px-8 py-3 bg-transparent hover:bg-white/10 text-white font-medium border-2 border-[#0F766E] rounded-lg transition duration-300 transform hover:scale-105">
            {children}
        </div>
    )
}