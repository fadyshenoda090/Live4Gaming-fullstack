import supabase from "../../supabase.ts";
import {useEffect, useState} from "react";
import type { Tournament} from "../../types/types.ts";
import AllTournaments from "../../components/UI/AllTournaments.tsx";

const TournamentsPage = () => {
    const [tournaments, setTournaments] = useState<Tournament[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const pageSize = 8;

    useEffect(() => {
        const fetchGames = async () => {
            const from = (page - 1) * pageSize;
            const to = from + pageSize - 1;

            const { data, error, count } = await supabase
                .from("tournaments")
                .select("*", { count: "exact" })
                .order("start_date", { ascending: true })
                .range(from, to);

            if (error) {
                console.error("Error fetching games:", error);
                return;
            }

            setTournaments(data || []);
            setTotal(count || 0);
        };

        fetchGames();
    }, [page]);

    const totalPages = Math.ceil(total / pageSize);

        return (
            <AllTournaments
                initialTournaments={tournaments}
                page={1}
                totalPages={totalPages}
                setPage={setPage}
            />
        );
    }
;

export default TournamentsPage;
