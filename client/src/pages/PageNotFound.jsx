import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function PageNotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
            <div className="max-w-md space-y-6">
                <div className="space-y-2">
                    <h1 className="text-6xl font-bold text-[#0f766e]">404</h1>
                    <h2 className="text-3xl font-semibold text-gray-800">Oops! Page Not Found</h2>
                    <p className="text-lg text-gray-600">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                </div>
                
                <div className="flex justify-center">
                <Button>
                    <Link to="/">
                        Return to Home
                    </Link>
                </Button>
                </div>
                
                <div className="pt-8">
                    <p className="text-sm text-gray-500">
                        Need help? <a href="/contact" className="text-[#0F766E]  hover:text-green-800">Contact support</a>
                    </p>
                </div>
            </div>
        </div>
    )
}