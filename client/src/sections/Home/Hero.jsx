import { Link } from "react-router-dom"
import Button from "../../components/Button"
import ButtonOutline from "../../components/ButtonOutline"
export default function Hero() {
    return (
        <div>
            
            <section className="relative h-screen w-full overflow-hidden">
                    <div className="absolute inset-0">
                        <img src="/heroImg.jpg" alt="Hero background" className="w-full h-full object-cover object-center" />
                        <div className="overlay absolute inset-0 bg-black/30"></div>
                    </div>

                    {/* Content Container */}
                    <div className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto space-y-6">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                            Protect Youself. Report Scammers. Stay Ahead.
                        </h1>
                        <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                           Join the movement to combat online fraud. Report Suspicious activities and verfiy
                           identities in seconds.
                        </p>
                        <div className="flex flex-col lg:flex-row gap-4 justify-center items-center pt-6">
                            <Button>
                                <Link to="/dashboard">Report a Scam</Link>
                            </Button>
                            <ButtonOutline>
                                <Link to="/dashboard">Search Database</Link>
                            </ButtonOutline>
                        </div>
                        </div>
                    </div>
            </section>
  
        </div>
    )
}