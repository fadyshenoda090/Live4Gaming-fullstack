import { Link } from "react-router-dom";
import type { Tournament } from "../../types/types.ts";

const TournamentCard = ({ tournament }: { tournament: Tournament }) => {
  return (
    <Link
      to={`/tournaments/${tournament.id}`}
      className="group bg-surface-lighter border-surface-border hover:border-primary hover:shadow-primary-glow relative overflow-hidden rounded-xl border transition-all duration-300 hover:scale-[1.02]"
    >
      {/* Tournament Image */}
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={tournament.image}
          alt={tournament.title}
          loading={"lazy"}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Status Badge */}
        <div className="absolute top-4 right-4 z-10">
          <div
            className={`flex items-center gap-1 rounded-full border px-3 py-1 ${
              tournament.status === "upcoming"
                ? "border-primary bg-bg-darker/90 text-primary-light"
                : tournament.status === "ongoing"
                  ? "bg-bg-darker/90 border-blue-500 text-blue-400"
                  : "border-text-dim bg-bg-darker/90 text-text-dim"
            } backdrop-blur-sm`}
          >
            <div
              className={`h-2 w-2 animate-pulse rounded-full ${
                tournament.status === "upcoming"
                  ? "bg-primary"
                  : tournament.status === "ongoing"
                    ? "bg-blue-500"
                    : "bg-text-dim"
              }`}
            />
            <span className="text-sm font-bold uppercase">
              {tournament.status}
            </span>
          </div>
        </div>
      </div>

      {/* Tournament Info */}
      <div className="relative z-10 p-6">
        <h3 className="group-hover:text-primary-light mb-3 line-clamp-1 text-xl font-bold text-white transition-colors duration-300">
          {tournament.title}
        </h3>

        <div className="mb-3 flex items-center justify-between">
          <span className="text-primary text-sm font-semibold tracking-wide uppercase">
            Prize: {tournament.prize_pool}
          </span>
          <span className="text-text-muted text-xs">
            {tournament.participants} Players
          </span>
        </div>

        <div className="text-text-muted flex items-center justify-between text-xs">
          <span>
            Start: {new Date(tournament.start_date).toLocaleDateString()}
          </span>
          <div className="text-primary-light flex items-center gap-1">
            <span>View Details</span>
            <div className="border-primary-light h-2 w-2 rotate-45 transform border-t-2 border-r-2" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TournamentCard;
