import AnimatedCounter from "../../components/AnimatedCounter"

export default function LiveStatistics() {
    return (
        <div className="border-b-2 bg-gray-200 border-gray-300 pt-10 pb-20 px-8 lg:px-30" id="statistics">
            <h3 className="text-center mb-8 text-3xl font-medium">Site Statistics</h3>

            <section className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="flex gap-2 items-center justify-center lg:justify-start">
                    <p className="text-[#EA580C] font-medium text-2xl">
                        <AnimatedCounter value={12483} duration={2} />
                    </p>
                    <p className="font-medium text-2xl">Reports Submitted</p>
                </div>

                <div className="flex gap-2 items-center justify-center lg:justify-start">
                    <p className="text-[#EA580C] font-medium text-2xl">
                        <AnimatedCounter value={8712} duration={1.8} />
                    </p>
                    <p className="font-medium text-2xl">Verified Scammers</p>
                </div>

                <div className="flex gap-2 items-center justify-center lg:justify-start">
                    <p className="text-[#EA580C] font-medium text-2xl">
                        <AnimatedCounter value={5934} duration={1.6} />
                    </p>
                    <p className="font-medium text-2xl">Users Protected</p>
                </div>

                <div className="flex gap-2 items-center justify-center lg:justify-start">
                    <p className="text-[#EA580C] font-medium text-2xl">
                        <AnimatedCounter value={10} duration={1} />+
                    </p>
                    <p className="font-medium text-2xl">Agencies Trust Us</p>
                </div>
            </section>

            <p className="text-center mt-8 text-gray-600 text-base">
                Our community is growing every day. See how we're working together to stop online fraud.
            </p>
        </div>
    )
}