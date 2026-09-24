import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import OrderForm from "@/components/OrderForm";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Order the Activity Pack",
  description:
    "Reserve the TriNurture Activity Pack — 90 screen-free activities across Mind, Body, and Heart, plus a bonus Growth Tracker Journal. PKR 999.",
};

const includes = [
  {
    title: "Mind & Curiosity",
    description: "Wonder-sparking activities that grow curiosity through play.",
  },
  {
    title: "Body & Grit",
    description: "Movement and challenges that build strength and resilience.",
  },
  {
    title: "Heart & Social",
    description: "Connection-focused prompts that nurture empathy and kindness.",
  },
  {
    title: "Bonus: Growth Tracker Journal",
    description:
      "A simple journal to notice progress and celebrate small wins together.",
  },
];

export default function OrderPage() {
  return (
    <>
      <main className="flex-1 bg-background">
        <div className="border-b border-border/70 bg-background-warm/50">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
            <Link
              href="/"
              className="font-heading text-xl font-extrabold text-primary"
            >
              TriNurture
            </Link>
            <Link
              href="/#blueprint"
              className="text-sm font-medium text-text-muted transition hover:text-primary"
            >
              Free Blueprint
            </Link>
          </div>
        </div>

        <section className="relative overflow-hidden py-12 sm:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#f7ebe6_0%,_transparent_55%),radial-gradient(ellipse_at_bottom_left,_#e8f0e9_0%,_transparent_50%)]"
          />

          <div className="relative mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-14 lg:items-start">
            <ScrollReveal>
              <p className="text-sm font-semibold uppercase tracking-wider text-secondary">
                Paid activity pack
              </p>
              <h1 className="mt-3 font-heading text-4xl font-extrabold tracking-tight text-text sm:text-5xl">
                TriNurture Activity Pack
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-text-muted">
                90 screen-free activities across Mind &amp; Curiosity, Body &amp;
                Grit, and Heart &amp; Social — plus a bonus Growth Tracker
                Journal to help you notice how your child is growing.
              </p>

              <p className="mt-6 font-heading text-3xl font-extrabold text-primary">
                PKR 999
              </p>
              <p className="mt-1 text-sm text-text-muted">
                One-time purchase · Digital delivery after payment confirmation
              </p>

              <ul className="mt-8 space-y-4">
                {includes.map((item) => (
                  <li
                    key={item.title}
                    className="rounded-2xl bg-surface p-5 shadow-card ring-1 ring-border/70"
                  >
                    <h2 className="font-heading text-lg font-bold text-text">
                      {item.title}
                    </h2>
                    <p className="mt-1 text-sm leading-relaxed text-text-muted">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <div className="rounded-2xl bg-surface p-7 shadow-soft ring-1 ring-border/80 sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-wider text-secondary">
                Reserve your copy
              </p>
              <h2 className="mt-3 font-heading text-2xl font-extrabold tracking-tight text-text">
                We&apos;ll send payment details privately
              </h2>
              <p className="mt-3 mb-8 leading-relaxed text-text-muted">
                Share a few details below. You&apos;ll get an email with how to
                pay — nothing sensitive is shown on this page.
              </p>
              <OrderForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
