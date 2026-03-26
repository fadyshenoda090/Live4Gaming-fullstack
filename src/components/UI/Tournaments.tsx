import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { useEffect, useState } from 'react'
import type {Tournament} from "../../types/types.ts";
import {Link} from "react-router-dom";

const Tournaments = () => {
    const [tournaments, setTournaments] = useState<Tournament[]>([])

    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/tournaments?page=1&limit=12', {
                    cache: 'force-cache',
                })
                if (!res.ok) return
                const data: { data: Tournament[]; totalPages: number } =
                    await res.json()
                setTournaments((data.data || []).slice(4, 12))
            } catch (e) {
                console.error('Failed to load tournaments', e)
            }
        }
        fetchTournaments()
    }, [])

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1280 },
            items: 4,
        },
        desktop: {
            breakpoint: { max: 1280, min: 1024 },
            items: 3,
        },
        tablet: {
            breakpoint: { max: 1024, min: 640 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 640, min: 0 },
            items: 1,
        },
    }

    return (
        <section className="w-full px-4 sm:px-6">
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-wider mb-4">
                    <span className="text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                        UPCOMING
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-cod-amber to-cod-orange bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                        TOURNAMENTS
                    </span>
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-cod-amber to-cod-orange mx-auto mb-4" />
                <p className="text-cod-gray-light text-sm sm:text-base max-w-2xl mx-auto">
                    Discover and join the most exciting upcoming tournaments
                </p>
            </div>

            {/* 🌀 Slider */}
            <Carousel
                responsive={responsive}
                infinite
                autoPlay
                autoPlaySpeed={5000}
                transitionDuration={600}
                arrows
                showDots
                itemClass="px-2 pt-5 h-[21rem]"
                containerClass="pb-4"
                removeArrowOnDeviceType={['mobile']}
            >
                {tournaments.map((tournament) => (
                    <Link
                        to={`/tournaments/${tournament.id}`}
                        key={tournament.id}
                        className="group relative h-72 bg-gray-800 flex-1 flex flex-col bg-color-dark-bg border border-gray-700 rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_25px_rgba(249,115,22,0.4)] hover:border-cod-orange"
                    >
                        {/* Glow Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cod-amber/10 to-cod-orange/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />

                        {/* Image */}
                        <div className="relative h-48 w-full overflow-hidden">
                            <img
                                src={tournament.image}
                                alt={tournament.title}
                                sizes={`(max-width: 640px) 100vw,`}
                                className="group-hover:scale-110 transition-transform duration-500 object-cover"
                            />
                        </div>

                        {/* Content */}
                        <div className="relative z-10 p-4 flex flex-col justify-between flex-grow">
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cod-amber-light transition-colors duration-300 line-clamp-1">
                                {tournament.title}
                            </h3>

                            <div className="flex items-center justify-between text-xs">
                                <span className="uppercase tracking-wide text-cod-orange font-semibold">
                                    {tournament.game}
                                </span>

                                {/* Fake match score or player count */}
                                <div className="flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-cod-amber animate-pulse" />
                                    <span className="text-cod-gray-light">
                                        {tournament.participants || 0} players
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </Carousel>
        </section>
    )
}

export default Tournaments
