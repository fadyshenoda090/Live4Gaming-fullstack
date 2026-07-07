import type { Game } from "../../types/types.ts";
import { useEffect, useState } from "react";
import { api } from "../../services/api.ts";
import AllGames from "../../components/UI/AllGames.tsx";

const GamesPage = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const pageSize = 8; // number of games per page (match AllGames)

    useEffect(() => {
        const fetchGames = async () => {
            try {
                // Backend currently doesn't support pagination, but we'll fetch all and simulate for now
                // if we want to follow Supabase logic we should ideally update backend
                const data = await api.get("/games");
                
                // Simulation of pagination if backend doesn't support it yet
                const from = (page - 1) * pageSize;
                const to = from + pageSize;
                
                setGames(data.slice(from, to) || []);
                setTotal(data.length || 0);
            } catch (error) {
                console.error("Error fetching games:", error);
            }
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
