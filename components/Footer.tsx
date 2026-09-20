export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background-warm/50 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-heading text-2xl font-extrabold text-primary">
            TriNurture
          </p>
          <p className="mt-2 max-w-sm leading-relaxed text-text-muted">
            Screen-free child development for parents who want a real childhood
            for ages 1–8 — Mind, Body, and Heart, growing together.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-text">
            Connect
          </p>
          <ul className="mt-3 flex flex-wrap gap-4 text-text-muted">
            <li>
              <a
                href="#"
                className="transition hover:text-primary"
                aria-label="Instagram (placeholder)"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="#"
                className="transition hover:text-primary"
                aria-label="Facebook (placeholder)"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="#"
                className="transition hover:text-primary"
                aria-label="WhatsApp (placeholder)"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl px-5 sm:px-8">
        <p className="text-sm text-text-muted">
          © {year} TriNurture. All rights reserved. Made with care for families
          everywhere.
        </p>
      </div>
    </footer>
  );
}
