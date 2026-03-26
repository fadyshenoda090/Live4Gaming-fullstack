
const Hero = () => {
    return (
        <section className="relative overflow-hidden">
            <div className="relative min-h-screen flex items-center justify-center">
                {/* Background Image with Military-style Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/hero.png"
                        alt="Call of Duty Battle Scene"
                        loading='eager'
                        className={`h-full w-full`}
                    />
                    {/* Military Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-br from-black/80 via-gray-900/60 to-amber-900/20" />
                    {/* Tactical Grid Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(139,69,19,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(139,69,19,0.2)_1px,transparent_1px)] bg-size-[32px_32px]" />
                </div>

                {/* Battle Scene Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-amber-500 to-transparent opacity-60" />
                <div className="absolute bottom-0 right-0 w-1 h-full bg-linear-to-b from-transparent via-amber-500 to-transparent opacity-40" />

                {/* Hero Content */}
                <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                    {/* Main Heading with Military Style */}
                    <div className="mb-8">
                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-wider mb-4">
                            <span className="text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                                GATHER YOUR
                            </span>
                            <br />
                            <span className="bg-linear-to-r from-amber-500 via-orange-500 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                                SQUAD
                            </span>
                        </h1>
                        <div className="w-32 h-1 bg-linear-to-r from-amber-500 to-orange-500 mx-auto mt-4 mb-2" />
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-200 uppercase tracking-wide">
                            AND JOIN THE BATTLE
                        </h2>
                    </div>

                    {/* Subtitle */}
                    <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
                        Engage in tactical warfare, coordinate with your team, and dominate the battlefield in ultimate military combat.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                        <button className="group relative px-10 py-4 bg-linear-to-r from-amber-600 to-orange-700 rounded-sm font-bold text-white text-lg uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] border border-amber-400">
                            <span className="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                Join Us Now
                            </span>
                            <div className="absolute inset-0 bg-linear-to-r from-orange-400 to-amber-300 rounded-sm opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                        </button>

                        <button className="group relative px-10 py-4 bg-transparent border-2 border-gray-400 rounded-sm font-bold text-white text-lg uppercase tracking-wider transition-all duration-300 hover:border-amber-400 hover:bg-amber-900/20">
                            <span className="text-gray-200 group-hover:text-amber-300 transition-colors duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                View Missions
                            </span>
                        </button>
                    </div>

                    {/* Military Stats */}
                    <div className="flex flex-wrap justify-center gap-8 lg:gap-16 text-center">
                        <div className="text-white">
                            <div className="text-2xl font-bold text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]">
                                1M+
                            </div>
                            <div className="text-gray-300 uppercase text-sm tracking-wide">Operatives</div>
                        </div>
                        <div className="text-white">
                            <div className="text-2xl font-bold text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]">
                                250+
                            </div>
                            <div className="text-gray-300 uppercase text-sm tracking-wide">War Zones</div>
                        </div>
                        <div className="text-white">
                            <div className="text-2xl font-bold text-amber-300 drop-shadow-[0_0_8px_rgba(252,211,77,0.6)]">
                                24/7
                            </div>
                            <div className="text-gray-300 uppercase text-sm tracking-wide">Active Combat</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero