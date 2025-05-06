export default function Button({ children }) {
    return (
        <div className="cursor-pointer bg-[#0F766E] w-fit px-8 py-[14px] text-white flex justify-center items-center font-medium rounded-lg transition duration-200 transform hover:scale-105">
            {children}
        </div>
    )
}