import type { Game } from "../../types/types.ts";
import React from "react";
import Gamecard from "../cards/Gamecard.tsx";

interface Props {
  initialGames: Game[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

const AllGames = ({ initialGames, page, setPage, totalPages }: Props) => {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="bg-bg-darker min-h-screen pt-20">
      {/* Header */}
      <section className="relative px-6 py-16 text-center">
        <h1 className="mb-6 text-5xl font-black tracking-wider uppercase">
          <span className="text-white">ALL</span>
          <br />
          <span className="bg-header-gradient bg-clip-text text-transparent">
            GAMES
          </span>
        </h1>
        <div className="bg-primary-gradient mx-auto mb-6 h-1 w-32" />
        <p className="text-text-muted text-lg">
          Explore our complete collection of premium gaming titles
        </p>
      </section>

      {/* Games Grid */}
      <section className="px-6 pb-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {initialGames.map((game) => (
            <Gamecard game={game} />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            disabled={page === 1}
            onClick={() => {
              setPage((p) => p - 1);
              scrollTop();
            }}
            className={`border-primary text-primary-light hover:bg-primary rounded-lg border px-4 py-2 transition hover:text-black ${
              page === 1 ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            Prev
          </button>
          <span className="text-text-muted">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => {
              setPage((p) => p + 1);
              scrollTop();
            }}
            className={`border-primary text-primary-light hover:bg-primary rounded-lg border px-4 py-2 transition hover:text-black ${
              page === totalPages ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
};

export default AllGames;
