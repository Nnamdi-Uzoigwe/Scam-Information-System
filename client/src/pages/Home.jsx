import Hero from "../sections/Home/Hero";
import LiveStatistics from "../sections/Home/LiveStatistics";
import ScamAlerts from "../sections/Home/ScamAlerts";
import SiteWorks from "../sections/Home/SiteWorks";

export default function Home() {
    return (
        <div>
            <Hero />
            <SiteWorks />
            <LiveStatistics />
            <ScamAlerts />
        </div>
    )
}