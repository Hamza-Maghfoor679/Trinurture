"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const faqs = [
  {
    question: "Is TriNurture only for kids who already have too much screen time?",
    answer:
      "Not at all. Whether you're trying to cut back or simply want a clearer plan before screens take over, the 3-pillar approach helps you build healthy habits early — especially for ages 1–8.",
  },
  {
    question: "Do I need special toys, a big house, or lots of free time?",
    answer:
      "No. The blueprint is designed for real homes — apartments included. Most ideas use everyday spaces and materials, and fit into short windows between school, work, and evening routines.",
  },
  {
    question: "What exactly will I get in the free Blueprint?",
    answer:
      "A practical PDF that explains the Mind, Body, and Heart pillars, why they matter for your child's development, and simple starting ideas you can try at home. We'll send it to you on WhatsApp.",
  },
  {
    question: "Is this a replacement for school or therapy?",
    answer:
      "TriNurture is a parenting companion — not a school curriculum or clinical service. It helps you nurture curiosity, grit, and social-emotional skills at home alongside whatever path your child is already on.",
  },
  {
    question: "Will you message me constantly after I sign up?",
    answer:
      "We'll send your Blueprint and occasional helpful updates. You can opt out anytime. We won't sell your number or flood your WhatsApp with noise.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-background py-16 sm:py-20" id="faq">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <ScrollReveal>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Good questions
          </p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
            Things parents often wonder
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-text-muted">
            Straight answers — no pressure, no fine print.
          </p>
        </ScrollReveal>

        <div className="mt-10 divide-y divide-border rounded-2xl bg-surface shadow-card ring-1 ring-border/70">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <ScrollReveal key={faq.question} delay={index * 0.04}>
                <div className="px-5 sm:px-6">
                  <button
                    type="button"
                    className="flex w-full items-start justify-between gap-4 py-5 text-left"
                    aria-expanded={isOpen}
                    onClick={() =>
                      setOpenIndex(isOpen ? null : index)
                    }
                  >
                    <span className="font-heading text-lg font-bold text-text">
                      {faq.question}
                    </span>
                    <span
                      className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary transition ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        key="content"
                        initial={
                          prefersReducedMotion
                            ? false
                            : { height: 0, opacity: 0 }
                        }
                        animate={{ height: "auto", opacity: 1 }}
                        exit={
                          prefersReducedMotion
                            ? undefined
                            : { height: 0, opacity: 0 }
                        }
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 pr-10 leading-relaxed text-text-muted">
                          {faq.answer}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
