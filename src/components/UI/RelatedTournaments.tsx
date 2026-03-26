import type {Tournament} from "../../types/types.ts";
import TournamentCard from "../cards/TournamentCard.tsx";


interface RelatedTournamentsProps {
    currentTournamentId: number;
    related: Tournament[];
}

const RelatedTournaments = ({related, currentTournamentId}: RelatedTournamentsProps) => {
    // exclude the current game
    const filtered = related.filter((t) => t.id !== currentTournamentId);

    if (filtered.length === 0)
        return (
            <p className="text-gray-400 text-center mt-6">No related games found.</p>
        );

    return (
        <section className="mt-14 pb-10">
            <h3 className="text-2xl font-bold text-amber-400 mb-6">Related Tournaments</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map(tournament => (
                   <TournamentCard tournament={tournament}/>
                ))}
            </div>
        </section>
    );
};

export default RelatedTournaments;
