import { LuTimer } from "react-icons/lu";
import { FaRegCalendarTimes, FaUsers } from "react-icons/fa";
import { HiCalendarDateRange } from "react-icons/hi2";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Tournament } from "../../types/types.ts";
import EnrollModal from "../../components/UI/EnrollModal.tsx";
import RelatedTournaments from "../../components/UI/RelatedTournaments.tsx";
import supabase from "../../supabase.ts";
import Loading from "../../components/UI/loading.tsx";

export default function TournamentDetails() {
    const [tournaments, setTournaments] = useState<Tournament[]>([]);
    const [tournament, setTournament] = useState<Tournament | null>(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchTournamentData = async () => {
            if (!id) return;

            // 🧠 Ensure id is numeric before querying
            const numericId = Number(id);
            if (isNaN(numericId)) {
                console.error("Invalid tournament id (not a number):", id);
                setTournament(null);
                return;
            }

            // 🎯 Fetch the current tournament
            const { data: tournamentData, error: tournamentError } = await supabase
                .from("tournaments")
                .select("*")
                .eq("id", numericId)
                .single(); // ✅ directly gets one record

            if (tournamentError) {
                console.error("Error fetching tournament:", tournamentError);
                setTournament(null);
                return;
            }

            setTournament(tournamentData);

            // 📦 Fetch all tournaments for related section
            const { data: allTournaments, error: allTournamentsError } =
                await supabase.from("tournaments").select("*");

            if (allTournamentsError) {
                console.error("Error fetching all tournaments:", allTournamentsError);
                return;
            }

            setTournaments(allTournaments || []);
        };

        fetchTournamentData();
    }, [id]);

    // 🎮 Related tournaments filter
    const relatedTournaments =
        tournament && tournaments.length > 0
            ? tournaments.filter(
                (t) =>
                    t.id !== tournament.id &&
                    t.genre.toLowerCase() === tournament.genre.toLowerCase()
            )
            : [];

    // 💀 Handle loading / not found cases
    if (!tournament) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 pt-20 px-6">
            <section className="max-w-6xl mx-auto">
                {/* 🔥 Banner with hover animation */}
                <div className="relative group h-[400px] w-full rounded-2xl overflow-hidden shadow-lg mb-10 border border-gray-700">
                    <div
                        className="relative h-full w-full overflow-hidden rounded-2xl border-2 border-gray-700
              transition-all duration-500 ease-in-out
              group-hover:border-amber-500 group-hover:shadow-[0_0_35px_rgba(245,158,11,0.4)]"
                    >
                        <img
                            src={tournament.image}
                            alt={tournament.title}
                            className="object-cover w-full h-full transform transition-transform duration-700 ease-in-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    </div>

                    {/* 🎟️ Enroll Button */}
                    <div className="absolute top-6 right-6 z-20 w-40 sm:w-52">
                        <EnrollModal
                            disabled={tournament.status !== "upcoming"}
                            tournamentId={tournament.id}
                            tournamentTitle={tournament.title}
                            status={tournament.status}
                            startDate={tournament.start_date}
                        />
                    </div>

                    {/* 🏆 Title + Prize Pool */}
                    <div className="absolute bottom-6 left-6 z-10">
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-lg">
                            {tournament.title}
                        </h1>
                        <p className="text-amber-400 font-semibold mt-2 text-lg">
                            Prize Pool: {tournament.prize_pool}
                        </p>
                    </div>
                </div>

                {/* 📋 Info Section */}
                <div>
                    <h2 className="text-2xl font-bold text-amber-400 mb-3">
                        Tournament Details
                    </h2>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-gray-300">
                        <li className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-xl p-3">
                            <LuTimer size={20} className="text-amber-400" />
                            <span>
                <strong className="text-gray-100">Status:</strong>{" "}
                                {tournament.status}
              </span>
                        </li>
                        <li className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-xl p-3">
                            <FaUsers size={20} className="text-amber-400" />
                            <span>
                <strong className="text-gray-100">Participants:</strong>{" "}
                                {tournament.participants}
              </span>
                        </li>
                        <li className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-xl p-3">
                            <HiCalendarDateRange size={20} className="text-amber-400" />
                            <span>
                <strong className="text-gray-100">Start Date:</strong>{" "}
                                {new Date(tournament.start_date).toLocaleDateString()}
              </span>
                        </li>
                        <li className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-xl p-3">
                            <FaRegCalendarTimes size={20} className="text-amber-400" />
                            <span>
                <strong className="text-gray-100">End Date:</strong>{" "}
                                {new Date(tournament.end_date).toLocaleDateString()}
              </span>
                        </li>
                    </ul>
                </div>
            </section>

            {/* 🎮 Related Tournaments */}
            <section className="max-w-6xl mx-auto">
                <RelatedTournaments
                    currentTournamentId={tournament.id}
                    related={relatedTournaments}
                />
            </section>
        </div>
    );
}
