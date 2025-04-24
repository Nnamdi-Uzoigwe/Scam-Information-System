export default function Button({ children }) {
    return (
        <div className="cursor-pointer bg-[#0F766E] w-fit px-[10px] md:px-8 py-3 text-white flex items-center font-medium rounded-lg transition duration-200 transform hover:scale-105">
            {children}
        </div>
    )
}