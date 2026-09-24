import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

export default function ActivityPackCTA() {
  return (
    <section className="bg-background-warm/70 py-16 sm:py-20" id="activity-pack">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <ScrollReveal>
          <p className="text-sm font-semibold uppercase tracking-wider text-secondary">
            Ready for more?
          </p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
            Get the TriNurture Activity Pack
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-text-muted">
            90 screen-free activities across Mind, Body, and Heart — plus a
            bonus Growth Tracker Journal. Just PKR 999.
          </p>
          <div className="mt-8">
            <Link
              href="/order"
              className="inline-flex items-center justify-center rounded-2xl bg-secondary px-7 py-3.5 text-base font-semibold text-white shadow-soft transition hover:bg-secondary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
            >
              Get the Activity Pack
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
