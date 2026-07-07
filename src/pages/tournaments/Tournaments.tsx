import { api } from "../../services/api.ts";
import {useEffect, useState} from "react";
import type { Tournament} from "../../types/types.ts";
import AllTournaments from "../../components/UI/AllTournaments.tsx";

const TournamentsPage = () => {
    const [tournaments, setTournaments] = useState<Tournament[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const pageSize = 8;

    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                const data = await api.get("/tournaments");

                const from = (page - 1) * pageSize;
                const to = from + pageSize;

                setTournaments(data.slice(from, to) || []);
                setTotal(data.length || 0);
            } catch (error) {
                console.error("Error fetching tournaments:", error);
            }
        };

        fetchTournaments();
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
