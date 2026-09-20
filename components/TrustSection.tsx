import ScrollReveal from "./ScrollReveal";

export default function TrustSection() {
  return (
    <section className="bg-primary py-16 text-white sm:py-20" id="trust">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <ScrollReveal>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-light/90">
            Built on what actually helps kids grow
          </p>
          <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
            Research-backed. Parent-friendly. Made for real homes.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/90">
            TriNurture draws from child development research on play, movement,
            and social-emotional learning — then turns it into simple, screen-free
            guidance you can actually use between school runs, work calls, and
            bedtime. No jargon. No guilt. Just a clearer way to nurture your
            child&apos;s next years.
          </p>
          <p className="mt-6 text-base text-white/80">
            Designed for real family life — from apartment living to weekend
            parks, wherever you call home.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
