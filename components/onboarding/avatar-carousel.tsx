"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { avatars } from "@/lib/avatars";

interface AvatarCarouselProps {
  value: number;
  onChange: (index: number) => void;
}

export default function AvatarCarousel({
  value,
  onChange,
}: AvatarCarouselProps) {
  const previous = () => {
    onChange(value === 0 ? avatars.length - 1 : value - 1);
  };

  const next = () => {
    onChange(value === avatars.length - 1 ? 0 : value + 1);
  };

  const leftIndex = (value - 1 + avatars.length) % avatars.length;
  const rightIndex = (value + 1) % avatars.length;

  const leftAvatar = avatars[leftIndex];
  const centerAvatar = avatars[value];
  const rightAvatar = avatars[rightIndex];

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-8">
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.08 }}
          onClick={previous}
          className="rounded-full p-2 text-slate-500 transition-all duration-200 hover:bg-slate-100 hover:text-slate-700"
        >
          <ChevronLeft size={22} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={previous}
          className="relative"
        >
          <div className="relative h-20 w-20 overflow-hidden rounded-full opacity-50 transition-all duration-300 hover:opacity-80">
            <Image
              src={leftAvatar.image}
              alt=""
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
        </motion.button>

        <AnimatePresence mode="wait">
          <motion.div
            key={centerAvatar.id}
            initial={{
              opacity: 0,
              scale: 0.9,
              rotate: -4,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              rotate: 4,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            className="relative"
          >
            <div className="absolute -inset-5 rounded-full bg-indigo-500/10 blur-3xl" />

            <motion.div
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
              }}
              className="relative h-[150px] w-[150px] overflow-hidden rounded-full border-4 border-white shadow-[0_24px_70px_rgba(79,70,229,0.18)]"
            >
              <Image
                src={centerAvatar.image}
                alt=""
                fill
                priority
                sizes="150px"
                draggable={false}
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={next}
          className="relative"
        >
          <div className="relative h-20 w-20 overflow-hidden rounded-full opacity-50 transition-all duration-300 hover:opacity-80">
            <Image
              src={rightAvatar.image}
              alt=""
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.08 }}
          onClick={next}
          className="rounded-full p-2 text-slate-500 transition-all duration-200 hover:bg-slate-100 hover:text-slate-700"
        >
          <ChevronRight size={22} />
        </motion.button>
      </div>

      <div className="space-y-1 text-center">
        <h3 className="text-[15px] font-semibold text-slate-700">
          Choose an avatar
        </h3>

        <p className="text-sm text-slate-500">
          Pick the identity that represents you best.
        </p>
      </div>
    </div>
  );
}