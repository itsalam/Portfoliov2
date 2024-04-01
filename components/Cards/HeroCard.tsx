"use client";

import { TitleCard } from "@/components/Card";
import { AnimateText, RotateText } from "@/components/TextEffects";
import { cn } from "@/lib/utils";
import { Text } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { motion, useAnimationControls } from "framer-motion";
import { ComponentProps, useCallback, useEffect, useRef } from "react";
import { CARD_TYPES } from "./types";

export default function HeroCard(props: ComponentProps<typeof TitleCard>) {
  const { className, ...rest } = props;
  const heroRef = useRef<HTMLDivElement>(null);

  const controls = useAnimationControls();

  useEffect(() => {
    const timeout = setTimeout(() => {
      controls.start("show").then(() => {
        setTimeout(() => {
          controls.start("rotate");
        }, 700);
      });
    }, 2000);
    return () => clearTimeout(timeout);
  }, [controls]);

  const animateTransition = {
    initial: {
      y: "100%",
      opacity: 0,
    },
    animate: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  const MText = motion(Text);

  const TextRotateBody = useCallback(
    () => (
      <motion.div className="relative flex flex-col gap-1" key="intro">
        <MText size={"7"} className="relative top-1 mb-4 flex overflow-hidden">
          <AnimateText
            size={"4"}
            className="w-min whitespace-nowrap"
            text="Hi there, I&lsquo;m"
            variants={animateTransition}
          />
          <span className="relative w-1"> </span>
          <RotateText
            size={"4"}
            className="relative top-0 text-inherit"
            range={[0, 2]}
            text="(a)"
          />
        </MText>
        <div className="my-gap-y h-g-5/8 relative flex flex-col gap-0 overflow-hidden pr-0 font-bold">
          <div className="absolute top-0 flex h-full flex-row gap-0">
            <RotateText
              size={"9"}
              className="absolute flex h-full items-center"
              range={[2, 0]}
              text="Vincent Lam"
              variants={animateTransition}
            />
            <RotateText
              size={"9"}
              className="relative left-0 top-0 flex h-full items-center"
              range={[0, 1]}
              text="Full-Stack"
            />
            <RotateText
              size={"9"}
              className="absolute left-0 top-0 flex h-full items-center"
              range={[1, 2]}
              text="Front-End"
            />
            <span className="relative w-4"> </span>
            <RotateText
              size={"9"}
              className="relative flex items-center font-bold"
              range={[0, 2]}
              text="Dev"
            />
          </div>
        </div>
        <Text asChild key="body" size={"3"} className="min-w-g-3 z-30 py-0">
          <span>
            I build services for businesses professionally and enjoy creating
            web projects in my free time. I&apos;m keen on JavaScript, web
            design, and AI.
          </span>
        </Text>
      </motion.div>
    ),
    []
  );

  return (
    <TitleCard
      containerClassName={cn("flex-col", className)}
      className={cn("mx-g-2/8 relative my-auto flex flex-col justify-end")}
      title={CARD_TYPES.Home}
      containerAnimation={controls}
      ref={heroRef}
      initial="initial"
      id={CARD_TYPES.Home}
      key={CARD_TYPES.Home}
      {...rest}
    >
      <TextRotateBody />

      {/* <Text key="techlist" size={"2"} className="font-favorit py-4 z-30">
        Stuff I use:
      </Text> */}
    </TitleCard>
  );
}
