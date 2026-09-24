"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#f7ebe6_0%,_transparent_55%),radial-gradient(ellipse_at_bottom_left,_#e8f0e9_0%,_transparent_50%)]"
      />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-14 lg:pb-24 lg:pt-16">
        <div className="order-2 lg:order-1">
          <motion.p
            className="font-heading text-2xl font-extrabold tracking-tight text-primary sm:text-3xl"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            TriNurture
          </motion.p>

          <motion.h1
            className="mt-4 font-heading text-4xl font-extrabold leading-[1.15] tracking-tight text-text sm:text-5xl lg:text-[3.25rem]"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.55,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Give your child a childhood that screens can&apos;t steal.
          </motion.h1>

          <motion.p
            className="mt-5 max-w-lg text-lg leading-relaxed text-text-muted"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.55,
              delay: 0.16,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            A screen-free path for ages 1–8 — built around Mind, Body, and
            Heart — so you know exactly how to nurture growth at home.
          </motion.p>

          <motion.div
            className="mt-8"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.55,
              delay: 0.24,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <a
              href="#blueprint"
              className="inline-flex items-center justify-center rounded-2xl bg-secondary px-7 py-3.5 text-base font-semibold text-white shadow-soft transition hover:bg-secondary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
            >
              Get Your Free Blueprint
            </a>
            <p className="mt-3 text-sm text-text-muted">
              Free PDF guide · Delivered on Email
            </p>
          </motion.div>
        </div>

        <motion.div
          className="order-1 lg:order-2"
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-background-warm shadow-soft sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src="/images/hero-parent-child.png"
              alt="A mother holding her laughing child outdoors in a warm storybook-style illustration"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
