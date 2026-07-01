import DashboardPreview from "@/components/dashboard-preview";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

const Hero = () => {
  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="axis-hero mx-auto flex w-full max-w-7xl flex-col gap-16 px-0"
      id="top"
      initial={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="axis-hero-copy mx-auto grid w-full max-w-6xl grid-cols-1 items-center justify-between gap-8 px-4 xl:px-0 lg:grid-cols-[minmax(0,672px)_minmax(0,448px)]">
        <h1 className="max-w-2xl text-balance text-3xl font-light leading-none tracking-[-0.05em] text-foreground max-md:font-medium md:text-5xl lg:text-6xl xl:text-7xl">
          The AI built for how factories actually run
        </h1>

        <div className="flex max-w-md flex-col gap-8">
          <p className="text-pretty text-base font-light leading-7 text-foreground md:text-xl">
            Monitor energy, flag failure risk, and keep machine records in one
            lean workspace for UAE plants.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="rounded-full px-5">
              <a href="mailto:info@kuroshioai.com">Book a call</a>
            </Button>
            <Button asChild className="rounded-full px-5" variant="outline">
              <a href="#platform">Watch Demo</a>
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full px-4 xl:px-0">
        <DashboardPreview />
      </div>
    </motion.section>
  );
};

export default Hero;
