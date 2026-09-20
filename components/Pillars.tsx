import ScrollReveal from "./ScrollReveal";

const pillars = [
  {
    title: "Mind & Curiosity",
    description:
      "Spark wonder through stories, questions, and hands-on discovery — so learning feels like play, not pressure.",
    accent: "bg-primary-light text-primary",
    icon: (
      <svg
        viewBox="0 0 48 48"
        className="h-8 w-8"
        fill="none"
        aria-hidden
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24 8c-6.5 0-12 4.8-12 11.2 0 4.2 2.4 7.8 6 9.7V34h12v-5.1c3.6-1.9 6-5.5 6-9.7C36 12.8 30.5 8 24 8Z"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M20 38h8M22 42h4"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="20" cy="18" r="1.5" fill="currentColor" />
        <circle cx="28" cy="18" r="1.5" fill="currentColor" />
        <path
          d="M20 23c1.2 1.4 2.8 2 4 2s2.8-.6 4-2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Body & Grit",
    description:
      "Build strength, balance, and resilience with movement and outdoor challenges that grow confidence day by day.",
    accent: "bg-secondary-light text-secondary",
    icon: (
      <svg
        viewBox="0 0 48 48"
        className="h-8 w-8"
        fill="none"
        aria-hidden
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="24"
          cy="12"
          r="5"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <path
          d="M16 44V28l-5-8M32 44V28l5-8"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11 20h26M18 28h12"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Heart & Social",
    description:
      "Nurture empathy, friendship, and emotional awareness — the soft skills that help your child thrive with others.",
    accent: "bg-[#f3e8ef] text-[#9a6b84]",
    icon: (
      <svg
        viewBox="0 0 48 48"
        className="h-8 w-8"
        fill="none"
        aria-hidden
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24 40s-14-8.5-14-18a7.5 7.5 0 0 1 14-3.5A7.5 7.5 0 0 1 38 22c0 9.5-14 18-14 18Z"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function Pillars() {
  return (
    <section className="bg-background py-16 sm:py-20" id="pillars">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            The TriNurture way
          </p>
          <h2 className="mt-3 max-w-2xl font-heading text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
            Three pillars. One whole childhood.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-muted">
            We believe children flourish when their mind, body, and heart grow
            together — not when one gets left behind for screens.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <ScrollReveal key={pillar.title} delay={index * 0.1}>
              <article className="flex h-full flex-col rounded-2xl bg-surface p-7 shadow-card ring-1 ring-border/70">
                <div
                  className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${pillar.accent}`}
                >
                  {pillar.icon}
                </div>
                <h3 className="mt-5 font-heading text-xl font-bold text-text">
                  {pillar.title}
                </h3>
                <p className="mt-3 flex-1 leading-relaxed text-text-muted">
                  {pillar.description}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
