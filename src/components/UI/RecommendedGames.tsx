import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import React, { useEffect, useState } from 'react'
import type { Game } from "../../types/types.ts";
import Gamecard from "../cards/Gamecard.tsx";
import supabase from "../../supabase.ts";

const RecommendedGames = ({ setLoading }: { setLoading: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [recommendedGames, setRecommendedGames] = useState<Game[]>([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchRecommendedGames = async () => {
            try {
                const { data, error } = await supabase
                    .from("games")
                    .select("*")
                    .limit(8);

                if (error) {
                    throw error;
                }

                if (data && isMounted) {
                    setRecommendedGames(data);
                    setIsLoading(false);
                }
            } catch (err) {
                console.error('Error fetching recommended games:', err);
                setIsLoading(false);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchRecommendedGames();

        return () => {
            isMounted = false;
        };
    }, [setLoading]);

    const responsive = {
        superLargeDesktop: { breakpoint: { max: 4000, min: 1280 }, items: 4 },
        desktop: { breakpoint: { max: 1280, min: 1024 }, items: 3 },
        tablet: { breakpoint: { max: 1024, min: 640 }, items: 2 },
        mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
    }

    const SkeletonCard = () => (
        <div className="h-72 bg-gray-800 rounded-xl border border-gray-700 animate-pulse">
            <div className="h-48 bg-gray-700 rounded-t-xl" />
            <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-700 rounded w-3/4" />
                <div className="flex justify-between">
                    <div className="h-3 bg-gray-700 rounded w-20" />
                    <div className="h-3 bg-gray-700 rounded w-24" />
                </div>
            </div>
        </div>
    );

    return (
        <section className="w-full">
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-wider mb-4">
                    <span className="text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                        RECOMMENDED
                    </span>
                    <br />
                    <span
                        className="bg-gradient-to-r from-cod-amber to-cod-orange bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                        FOR YOU
                    </span>
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-cod-amber to-cod-orange mx-auto mb-4" />
                <p className="text-cod-gray-light text-sm sm:text-base max-w-2xl mx-auto">
                    Based on your gaming preferences
                </p>
            </div>

            {/* 🌀 Slider */}
            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {[...Array(4)].map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            ) : (
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
                    {recommendedGames.map((game) => (
                        <Gamecard game={game} key={game.id} />
                    ))}
                </Carousel>
            )}
        </section>
    )
}

export default RecommendedGames
