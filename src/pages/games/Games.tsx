import type { Game } from "../../types/types.ts";
import { useEffect, useState } from "react";
import supabase from "../../supabase.ts";
import AllGames from "../../components/UI/AllGames.tsx";

const GamesPage = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const pageSize = 8; // number of games per page (match AllGames)

    useEffect(() => {
        const fetchGames = async () => {
            const from = (page - 1) * pageSize;
            const to = from + pageSize - 1;

            const { data, error, count } = await supabase
                .from("games")
                .select("*", { count: "exact" })
                .order("title", { ascending: true })
                .range(from, to);

            if (error) {
                console.error("Error fetching games:", error);
                return;
            }

            setGames(data || []);
            setTotal(count || 0);
        };

        fetchGames();
    }, [page]);

    const totalPages = Math.ceil(total / pageSize);

    return (
        <AllGames
            initialGames={games}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
        />
    );
};

export default GamesPage;
