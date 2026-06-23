"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["launches", "campaigns", "promos", "stories", "updates"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-9 py-20 lg:py-32">
          <div className="flex flex-col items-center gap-5">
            <h1 className="font-display max-w-4xl text-center text-5xl font-medium tracking-tight text-[#2d211b] md:text-7xl">
              <span>Create social posts for business</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center leading-tight md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={title}
                    className="absolute font-semibold text-[#a34724]"
                    initial={{ opacity: 0, y: "-100%" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="max-w-2xl text-center text-lg leading-relaxed tracking-tight text-[#72594b] md:text-xl">
              Phaisto turns your business updates, offers, and brand notes into
              polished social media posts ready for every channel.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="border-[#d8b9a7] text-[#4a3329] hover:bg-[#fbf4ef]"
              variant="outline"
            >
              View examples
            </Button>
            <Button
              size="lg"
              className="bg-[#9f3f1f] text-white hover:bg-[#823219]"
            >
              Get started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
