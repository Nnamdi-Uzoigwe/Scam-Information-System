import HomeCarousel from "../../components/HomeCarousel";
import { GoAlertFill } from "react-icons/go";

export default function ScamAlerts() {
    return (
        <div className="py-20">
            <h3 className="text-[25px] text-[#EA580C] font-medium text-center flex items-center justify-center gap-1">
                Recent Scam Alerts!
                <span><GoAlertFill className="text-[#EA580C] font-bold" /></span>
                <span><GoAlertFill className="text-[#EA580C] font-bold" /></span>
                <span><GoAlertFill className="text-[#EA580C] font-bold" /></span>👇
            </h3>
            <HomeCarousel />
        </div>
    )
}