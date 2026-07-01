const links = [
  { name: "Features", href: "#platform" },
  { name: "Usecases", href: "#usecases" },
  { name: "Pricing", href: "#deployment" },
  { name: "Customers", href: "#customers" },
];

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card px-4 py-10" id="contact">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-8">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-start">
          <div>
            <h2 className="text-2xl font-medium tracking-[-0.04em]">Kuroshio AI</h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground text-pretty">
              Industrial intelligence for UAE and GCC manufacturers. Built in Kerala, deployed from RAK Innovation City.
            </p>
          </div>
          <div className="grid gap-3 text-sm font-medium sm:grid-cols-2">
            <a className="rounded-full border border-border px-5 py-3 transition-colors duration-150 ease-out hover:bg-muted" href="mailto:info@kuroshioai.com">
              info@kuroshioai.com
            </a>
            <a className="rounded-full border border-border px-5 py-3 transition-colors duration-150 ease-out hover:bg-muted" href="tel:+971509420423">
              +971 509420423
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Kuroshio AI. All rights reserved.</p>
          <nav className="flex flex-wrap gap-5">
            {links.map((link) => (
              <a className="transition-colors duration-150 ease-out hover:text-foreground" href={link.href} key={link.name}>
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
