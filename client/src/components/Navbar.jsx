import { Link } from "react-router-dom";
import Button from "./Button";

export default function Navbar() {
    return (
        <div className="bg-white h-[80px] px-30 flex items-center justify-between">
            <div className="logo text-[#EA580C] font-bold">CLIFFORD_REPORTERS</div>

            <div className="hidden links md:flex items-center gap-10">
                <Link smooth to="/">Home</Link>
                <Link smooth to="/about">About</Link>
                <Link smooth to="/dashboard">Report Scam</Link>
                <Link smooth to="/">Contact us</Link>
                <Link smooth to="/dashboard">Search</Link>
            </div>

            <div className="hidden lg:flex">
                    <Button>
                        <Link>Login</Link>
                    </Button>
            </div>
                
        </div>
    )
}