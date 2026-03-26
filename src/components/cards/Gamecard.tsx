import { Link } from "react-router-dom";
import type { Game } from "../../types/types.ts";

const Gamecard = ({
  game,
  component = "",
}: {
  game: Game;
  component?: string;
}) => {
  return (
    <Link
      key={game.id}
      to={`/games/${game.id}`}
      className="group bg-surface-lighter border-surface-border hover:shadow-secondary-glow hover:border-secondary relative flex h-72 flex-1 flex-col overflow-hidden rounded-xl border transition-all duration-300 hover:scale-[1.02]"
    >
      {/* 🔥 Glow Overlay */}
      <div className="from-secondary/10 via-primary-light/10 to-secondary-dark/10 absolute inset-0 z-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* 🏷️ Badge */}
      {component === "new" && (
        <div className="absolute top-3 left-3 z-10">
          <div className="bg-primary-gradient rounded-sm px-2 py-1 text-[10px] font-bold tracking-wide text-white uppercase shadow-[0_0_10px_rgba(249,115,22,0.6)]">
            NEW
          </div>
        </div>
      )}

      {/* 🎮 Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={game.image}
          alt={game.title}
          loading={"lazy"}
          sizes={`(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw`}
          className="h-full w-full transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* 🧾 Info */}
      <div className="relative z-10 flex flex-grow flex-col justify-between p-4">
        <h3 className="group-hover:text-primary-light mb-2 line-clamp-1 text-lg font-bold text-white transition-colors duration-300">
          {game.title}
        </h3>
        <div className="flex items-center justify-between text-xs">
          <span className="text-secondary font-semibold tracking-wide uppercase">
            {game.genre}
          </span>
          <span className="text-text-muted">{game.release_date}</span>
        </div>
      </div>
    </Link>
  );
};

export default Gamecard;
