import type {Game} from "../../types/types.ts";
import {Link} from "react-router-dom";

interface RelatedGamesProps {
    related: Game[];
    currentGameId: number;
}

const RelatedGames = ({ related, currentGameId }: RelatedGamesProps) => {
    // exclude the current game
    const filtered = related.filter((g) => g.id !== currentGameId);

    if (filtered.length === 0)
        return (
            <p className="text-gray-400 text-center mt-6">No related games found.</p>
        );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filtered.map((game) => (
                <Link
                    to={`/games/${game.id}`}
                    key={game.id}
                    className="group block bg-gray-800/50 border border-gray-700 rounded-2xl overflow-hidden hover:border-amber-500 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all duration-300"
                >
                    <div className="relative w-full h-56">
                        <img
                            src={game.image}
                            alt={game.title}
                            className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                   <div className={`p-4 flex items-center justify-between`}>
                       <div className="">
                           <h3 className="text-lg font-bold text-white truncate">
                               Genre
                           </h3>
                           <p className="text-amber-400 text-sm mt-1">{game.genre}</p>
                       </div>
                       <div className="">
                           <h3 className="text-lg font-bold text-white truncate">
                               Developer
                           </h3>
                           <p className="text-amber-400 text-sm mt-1">{game.developer}</p>
                       </div>
                   </div>
                </Link>
            ))}
        </div>
    );
};

export default RelatedGames;
