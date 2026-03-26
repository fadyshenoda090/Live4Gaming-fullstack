const About = () => {
  return (
    <section className="bg-bg-darker text-text-main flex min-h-screen flex-col items-center px-6 py-16">
      <div className="max-w-4xl text-center">
        <h1 className="text-primary-light mb-6 text-4xl font-bold">
          About Our Platform
        </h1>
        <p className="text-text-muted mb-10 text-lg leading-relaxed">
          Welcome to{" "}
          <span className="text-primary-light font-semibold">ArenaX</span> — the
          ultimate hub for competitive gamers. Our platform brings together
          global tournaments, real-time leaderboards, and detailed insights
          about your favorite games, all in one sleek experience.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="bg-surface-lighter border-primary rounded-2xl border p-6 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
            <h3 className="text-primary-light mb-2 text-xl font-semibold">
              🎯 Our Mission
            </h3>
            <p className="text-text-muted text-sm leading-relaxed">
              To make esports accessible to everyone — whether you're a rising
              player, a tournament host, or a passionate fan watching the action
              unfold.
            </p>
          </div>

          <div className="bg-surface-lighter border-primary rounded-2xl border p-6 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
            <h3 className="text-primary-light mb-2 text-xl font-semibold">
              🌍 Our Vision
            </h3>
            <p className="text-text-muted text-sm leading-relaxed">
              To become the go-to destination for global gaming events —
              connecting players, teams, and fans through innovation and fair
              competition.
            </p>
          </div>

          <div className="bg-surface-lighter border-primary rounded-2xl border p-6 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
            <h3 className="text-primary-light mb-2 text-xl font-semibold">
              ⚡ Our Community
            </h3>
            <p className="text-text-muted text-sm leading-relaxed">
              Powered by players, built for passion. Join tournaments, follow
              your favorite games, and experience the next level of competitive
              gaming.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
