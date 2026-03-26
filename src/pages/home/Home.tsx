import React from "react";

const Hero = React.lazy(() => import("../../components/UI/Hero.tsx"));
const GamesGrid = React.lazy(() => import("../../components/UI/GamesGrid.tsx"));
const Tournaments = React.lazy(() => import("../tournaments/Tournaments.tsx"));

export default function Home() {
  return (
    <main className="">
      {/* Hero */}
      <Hero />

      {/* Games Grid */}
      <GamesGrid />

      {/* Tournaments */}
      <Tournaments />
    </main>
  );
}
