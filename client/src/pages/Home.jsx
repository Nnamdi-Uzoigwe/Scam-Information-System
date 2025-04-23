import Hero from "../sections/Home/Hero";
import LiveStatistics from "../sections/Home/LiveStatistics";
import ScamAlerts from "../sections/Home/ScamAlerts";
import SiteWorks from "../sections/Home/SiteWorks";
import Testimonial from "../sections/Home/Testimonial";

export default function Home() {
    return (
        <div>
            <Hero />
            <SiteWorks />
            <LiveStatistics />
            <ScamAlerts />
            <Testimonial />
        </div>
    )
}