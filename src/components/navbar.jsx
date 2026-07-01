import { Button } from "@/components/ui/button";
import { Menu, Moon, Sun, Waves, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";

const links = [
  { name: "Features", href: "#platform" },
  { name: "Usecases", href: "#usecases" },
  { name: "Pricing", href: "#deployment" },
  { name: "Customers", href: "#customers" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isOpenRef = useRef(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const scrollingDown = latest > previous;

    setIsScrolled(latest > 24);
    setIsHidden(scrollingDown && latest > 96 && !isOpenRef.current);
  });

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => {
    const nextOpen = !isOpen;
    if (nextOpen) {
      setIsHidden(false);
    }
    setIsOpen(nextOpen);
  };

  return (
    <motion.header
      animate={{ y: isHidden ? -20 : 0, opacity: isHidden ? 0 : 1 }}
      className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-6xl px-4 pt-4"
      initial={{ y: -16, opacity: 0 }}
      style={{ pointerEvents: isHidden ? "none" : "auto" }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.nav
        animate={{
          boxShadow: isScrolled ? "0 4px 20px -5px rgba(0, 0, 0, 0.1)" : "0 0 0 0 rgba(0, 0, 0, 0)",
          width: isScrolled ? "calc(100% - 22px)" : "100%",
        }}
        className="mx-auto flex h-[66px] items-center justify-between gap-4 rounded-full border border-border/95 bg-background/35 p-2 backdrop-blur-xl"
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <a className="flex min-h-10 items-center gap-2.5 rounded-full px-1 text-xl font-medium tracking-[-0.04em]" href="#top" onClick={closeMenu}>
          <Waves aria-hidden="true" className="size-6 fill-current stroke-[2.8]" />
          <span>Kuroshio</span>
        </a>

        <div className="hidden items-center gap-4 lg:flex">
          <div className="flex items-center gap-8">
            {links.map((link) => (
              <a
                className="text-base font-normal text-foreground transition-colors duration-150 ease-out hover:text-muted-foreground"
                href={link.href}
                key={link.name}
              >
                {link.name}
              </a>
            ))}
          </div>
          <button
            className="min-h-10 rounded-full px-2.5 text-base font-normal text-foreground transition-colors duration-150 ease-out hover:text-muted-foreground"
            type="button"
          >
            Log In
          </button>
          <button
            aria-label="Theme selector"
            className="axis-theme-toggle"
            type="button"
          >
            <span>
              <Moon aria-hidden="true" />
            </span>
            <span>
              <Sun aria-hidden="true" />
            </span>
          </button>
          <Button asChild className="rounded-full px-5">
            <a href="mailto:info@kuroshioai.com">Book a call</a>
          </Button>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <Button asChild className="rounded-full px-4">
            <a href="mailto:info@kuroshioai.com">Book a call</a>
          </Button>
          <button
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            className="flex size-10 items-center justify-center rounded-full text-foreground"
            onClick={toggleMenu}
            type="button"
          >
            <AnimatePresence initial={false} mode="wait">
              {isOpen ? (
                <motion.span
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  initial={{ opacity: 0, rotate: -90 }}
                  key="close"
                  transition={{ duration: 0.16 }}
                >
                  <X aria-hidden="true" className="size-5" />
                </motion.span>
              ) : (
                <motion.span
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  initial={{ opacity: 0, rotate: 90 }}
                  key="menu"
                  transition={{ duration: 0.16 }}
                >
                  <Menu aria-hidden="true" className="size-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="mx-auto mt-2 w-full overflow-hidden rounded-[1.35rem] border border-border bg-background/96 p-4 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.12)] backdrop-blur-xl lg:hidden"
            exit={{ opacity: 0, scale: 0.98, y: -8 }}
            initial={{ opacity: 0, scale: 0.98, y: -8 }}
            style={{ transformOrigin: "top center" }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col">
              {links.map((link) => (
                <a
                  className="rounded-2xl px-4 py-4 text-base font-medium text-foreground transition-colors duration-150 ease-out hover:bg-muted"
                  href={link.href}
                  key={link.name}
                  onClick={closeMenu}
                >
                  {link.name}
                </a>
              ))}
              <div className="mt-3 flex items-center justify-between border-t border-border px-4 pt-4">
                <button
                  className="min-h-10 text-base font-medium text-foreground transition-colors duration-150 ease-out hover:text-muted-foreground"
                  type="button"
                >
                  Log In
                </button>
                <button
                  aria-label="Theme selector"
                  className="axis-theme-toggle"
                  type="button"
                >
                  <span>
                    <Moon aria-hidden="true" />
                  </span>
                  <span>
                    <Sun aria-hidden="true" />
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
