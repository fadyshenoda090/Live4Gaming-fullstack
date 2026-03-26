import React from "react";
import type { Tournament } from "../../types/types.ts";
import TournamentCard from "../cards/TournamentCard.tsx";

interface Props {
  initialTournaments: Tournament[];
  page: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const AllTournaments = ({
  initialTournaments,
  page,
  totalPages,
  setPage,
}: Props) => {
  return (
    <div className="bg-bg-darker min-h-screen pt-20">
      {/* Header Section */}
      <section className="relative px-6 py-16">
        <div className="mb-12 text-center">
          <h1 className="mb-6 text-4xl font-black tracking-wider uppercase sm:text-5xl lg:text-6xl">
            <span className="text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
              ALL
            </span>
            <br />
            <span className="bg-header-gradient bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
              TOURNAMENTS
            </span>
          </h1>
          <div className="bg-primary-gradient mx-auto mb-6 h-1 w-32" />
          <p className="text-text-muted mx-auto max-w-2xl text-lg">
            Explore upcoming and past gaming tournaments with epic rewards
          </p>
        </div>
      </section>

      {/* Tournaments Grid */}
      <section className="px-6 pb-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {initialTournaments.map((tournament) => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className={`border-primary text-primary-light hover:bg-primary rounded-lg border px-4 py-2 transition hover:text-black ${page === 1 ? "cursor-not-allowed opacity-50" : ""}`}
          >
            Prev
          </button>
          <span className="text-text-muted">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className={`border-primary text-primary-light hover:bg-primary rounded-lg border px-4 py-2 transition hover:text-black ${page === totalPages ? "cursor-not-allowed opacity-50" : ""}`}
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
};

export default AllTournaments;
