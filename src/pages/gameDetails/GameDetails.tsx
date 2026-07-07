import {useEffect, useState} from "react";
import RelatedGames from "../../components/UI/RelatedGames.tsx";
import type {Game} from "../../types/types.ts";
import {useParams} from "react-router-dom";
import { api } from "../../services/api.ts";
import Loading from "../../components/UI/loading.tsx";

const GameDetails = () => {
    const [games, setGames] = useState<Game[]>([])
    const [game, setGame] = useState<Game | null>(null);
    const {id} = useParams();

    useEffect(() => {
        const fetchGameData = async () => {
            try {
                // Fetch the current game
                const gameData = await api.get(`/games/${id}`);
                setGame(gameData);

                // Fetch all games for related filtering
                const allGames = await api.get("/games");
                setGames(allGames || []);
            } catch (error) {
                console.error("Error fetching game data:", error);
                setGame(null);
            }
        };

        fetchGameData();
    }, [id]);

    const relatedGames = game
        ? games.filter(
            (g) =>
                g.id !== game.id &&
                (g.genre.toLowerCase() === game.genre.toLowerCase() ||
                    g.developer.toLowerCase() === game.developer.toLowerCase())
        )
        : [];


    if (!game) {
        return (
            <Loading />
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 pt-20">
            {/* Hero Section */}
            <section className="relative py-12 px-6">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Game Image */}
                        <div className="relative">
                            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden border-2 border-gray-700
                                hover:border-amber-500 hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all duration-300">
                                <img
                                    src={game.image}
                                    alt={game.title}
                                    className="group-hover:scale-110 transition-transform duration-500 w-full h-full"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"/>
                            </div>
                        </div>

                        {/* Game Info */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-wider mb-4">
                                    <span className="text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                                        {game.title.split(':')[0]}
                                    </span>
                                    {game.title.includes(':') && (
                                        <>
                                            <br/>
                                            <span
                                                className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                                                {game.title.split(':')[1]}
                                            </span>
                                        </>
                                    )}
                                </h1>
                                <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mb-6"/>
                            </div>

                            {/* Rating & Genre */}
                            <div className="flex items-center gap-6">
                                <div
                                    className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full border border-amber-500">
                                    <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"/>
                                    <span className="text-amber-300 font-bold text-lg">{game.rating}</span>
                                    <span className="text-gray-300 text-sm">Rating</span>
                                </div>
                                <div className="text-amber-500 font-semibold text-lg uppercase tracking-wide">
                                    {game.genre}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-4">
                                <h3 className="text-amber-400 font-bold text-xl uppercase tracking-wide">About the
                                    Game</h3>
                                <p className="text-gray-300 text-lg leading-relaxed">
                                    {game.description}
                                </p>
                            </div>

                            {/* Game Details */}
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-amber-400 font-semibold mb-2">Developer</h4>
                                    <p className="text-gray-300">{game.developer}</p>
                                </div>
                                <div>
                                    <h4 className="text-amber-400 font-semibold mb-2">Release Date</h4>
                                    <p className="text-gray-300">{new Date(game.release_date).toLocaleDateString()}</p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                <button className="px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-700 rounded-lg font-bold text-white
                                    text-lg uppercase tracking-wider hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:scale-105
                                    transition-all duration-300 border border-amber-400">
                                    Play Now
                                </button>
                                <button className="px-8 py-4 bg-transparent border-2 border-gray-500 rounded-lg font-bold text-white
                                    text-lg uppercase tracking-wider hover:border-amber-500 hover:bg-amber-500/10
                                    transition-all duration-300">
                                    Add to Favorites
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Games Section */}
            <section className="py-16 px-6 bg-gray-800/30">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-wider mb-4">
                            <span className="text-white">MORE </span>
                            <span
                                className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-300 bg-clip-text text-transparent">
                GAMES
              </span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mb-4"/>
                        <p className="text-gray-300">
                            Discover other {game.genre} games
                        </p>
                    </div>

                    {/* 👇 Pass related games */}
                    <RelatedGames related={relatedGames} currentGameId={game.id}/>
                </div>
            </section>
        </div>
    )
}

export default GameDetails