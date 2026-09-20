import ScrollReveal from "./ScrollReveal";

const painPoints = [
  {
    title: "You feel guilty about screen time — but short on alternatives",
    description:
      "You know another cartoon isn't the answer. Still, after a long day, it's the only thing that buys you ten quiet minutes. That guilt sits heavy — and you wish you had better options ready.",
  },
  {
    title: "You're not sure how to structure your child's development",
    description:
      "There's so much advice online. Montessori this, STEM that. You want a clear rhythm for growing curiosity, strength, and kindness — without turning your home into a classroom.",
  },
  {
    title: "You worry childhood is becoming quieter and more digital",
    description:
      "Fewer outdoor games. Less face-to-face play. You want your child to grow brave, curious, and connected — the way childhood used to feel — even in a busy city life.",
  },
];

export default function PainPoints() {
  return (
    <section className="bg-background-warm/60 py-16 sm:py-20" id="why">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal>
          <p className="text-sm font-semibold uppercase tracking-wider text-secondary">
            You&apos;re not alone
          </p>
          <h2 className="mt-3 max-w-2xl font-heading text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
            Modern parenting is full of quiet worries.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-muted">
            If any of this sounds familiar, take a breath — many parents feel
            the same way.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {painPoints.map((point, index) => (
            <ScrollReveal key={point.title} delay={index * 0.08}>
              <div className="h-full">
                <span
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary-light font-heading text-lg font-bold text-secondary"
                  aria-hidden
                >
                  {index + 1}
                </span>
                <h3 className="mt-4 font-heading text-xl font-bold leading-snug text-text">
                  {point.title}
                </h3>
                <p className="mt-3 leading-relaxed text-text-muted">
                  {point.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
