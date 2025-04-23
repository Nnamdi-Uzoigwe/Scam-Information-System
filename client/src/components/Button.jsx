export default function Button({ children }) {
    return (
        <div className="bg-[#0F766E] py-2 px-6 text-white flex items-center font-medium rounded-lg transition duration-200 transform hover:scale-105">
            {children}
        </div>
    )
}