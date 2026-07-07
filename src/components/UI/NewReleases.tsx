import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import type { Game } from "../../types/types.ts";
import { api } from "../../services/api.ts";
import Gamecard from "../cards/Gamecard.tsx";

const NewReleases = ({
  setLoading,
}: {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [newReleases, setNewReleases] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchNewReleases = async () => {
      try {
        const data = await api.get("/games");

        if (data && isMounted) {
          // Sort by release_date descending and take top 8
          const sortedData = [...data].sort((a, b) => 
            new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
          ).slice(0, 8);
          
          setNewReleases(sortedData);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Error fetching new releases:", err);
        setIsLoading(false);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchNewReleases();

    return () => {
      isMounted = false;
    };
  }, [setLoading]);

  // 🎯 Responsive breakpoints
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1280 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1280, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    },
  };

  const SkeletonCard = () => (
    <div className="bg-surface-lighter border-surface-border h-72 animate-pulse rounded-xl border">
      <div className="bg-surface h-48 rounded-t-xl" />
      <div className="space-y-3 p-4">
        <div className="bg-surface h-4 w-3/4 rounded" />
        <div className="flex justify-between">
          <div className="bg-surface h-3 w-20 rounded" />
          <div className="bg-surface h-3 w-24 rounded" />
        </div>
      </div>
    </div>
  );

  return (
    <section className="w-full">
      {/* 🧱 Section Header */}
      <div className="mb-8 text-center">
        <h2 className="mb-4 text-2xl font-black tracking-wider uppercase sm:text-3xl lg:text-4xl">
          <span className="text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            NEW
          </span>
          <br />
          <span className="bg-primary-gradient bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(249,115,22,0.6)]">
            RELEASES
          </span>
        </h2>
        <div className="bg-primary-gradient mx-auto mb-4 h-1 w-20" />
        <p className="text-text-muted mx-auto max-w-2xl text-sm sm:text-base">
          Fresh games just dropped
        </p>
      </div>

      {/* 🎮 Carousel */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <Carousel
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={4000}
          showDots
          arrows
          transitionDuration={600}
          itemClass="px-2 pt-5 h-[21rem]"
          containerClass="pb-4"
          removeArrowOnDeviceType={["mobile"]}
        >
          {newReleases.map((game) => (
            <Gamecard component={"new"} game={game} key={game.id} />
          ))}
        </Carousel>
      )}
    </section>
  );
};

export default NewReleases;
