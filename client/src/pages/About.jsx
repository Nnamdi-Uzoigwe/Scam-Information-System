import HeroPage from "../sections/About/HeroPage";
import TeamPage from "../sections/About/TeamPage";

export default function About() {
    return (
        <div className="overflow-x-hidden">
            <HeroPage/>
            <TeamPage/>
        </div>
    )
}