"use client";

import { gridAtom } from "@/lib/state";
import { cn } from "@/lib/utils";
import { Text, Tooltip } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import {
  MotionValue,
  motion,
  useAnimate,
  useAnimationControls,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useAtomValue } from "jotai";
import {
  FlaskRound,
  FolderKanban,
  Home,
  LucideIcon,
  Users,
} from "lucide-react";
import { ComponentProps, MouseEvent, ReactNode, useRef } from "react";
import Card from "../Card";

const Item = (props: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  children: ReactNode;
  text: string;
}) => {
  const { children, text, x, y } = props;
  const ref = useRef<HTMLDivElement>(null);
  const { gridCellWidth } = useAtomValue(gridAtom);
  const dist = useTransform(() => {
    if (!ref.current) return 0;
    const { width, left, top, height } = (
      ref.current as HTMLElement
    ).getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    return Math.sqrt(
      Math.pow(x.get() - centerX, 2) + Math.pow(y.get() - centerY, 2)
    );
  });
  const width = useTransform(
    dist,
    [0, gridCellWidth * 2],
    [gridCellWidth * 1.66, gridCellWidth * 1.33]
  );

  const springWidth = useSpring(width, { damping: 15, stiffness: 150 });
  const iconScale = useSpring(
    useTransform(width, [gridCellWidth * 1.33, gridCellWidth * 1.66], [1, 1.1])
  );

  return (
    <Tooltip
      sideOffset={10}
      side="top"
      content={
        <Text className="font-favorit" size="3">
          {text}
        </Text>
      }
    >
      <motion.div
        ref={ref}
        style={{
          width: springWidth,
        }}
        className="cursor-pointer aspect-square flex items-end justify-end w-g-x-3/8 relative rounded-full bg-[--sage-1] opacity-90"
        variants={{
          leave: {
            width: [null, gridCellWidth * 1.33],
          },
        }}
      >
        <motion.div className="m-auto" style={{ scale: iconScale }}>
          {children}
        </motion.div>
      </motion.div>
    </Tooltip>
  );
};

export default function MenuCard(props: ComponentProps<typeof motion.div>) {
  const { className, ...rest } = props;
  const [ref] = useAnimate();
  const controls = useAnimationControls();
  const x = useMotionValue(0),
    y = useMotionValue(0);

  const trackMouse = (ev: MouseEvent) => {
    x.set(ev.clientX);
    y.set(ev.clientY);
  };

  const items: Record<string, LucideIcon> = {
    Home: Home,
    Works: FolderKanban,
    Info: Users,
    Etc: FlaskRound,
  };

  return (
    <Card
      {...rest}
      className={cn(
        "flex absolute gap-4 items-end overflow-visible p-2 h-g-x-4/8",
        className
      )}
      ref={ref}
      initial="initial"
      id="menu"
      key={"menu"}
      onMouseMove={trackMouse}
      animate={controls}
      onMouseLeave={() => {
        controls.start("leave");
        x.set(0);
        y.set(0);
      }}
    >
      {Object.entries(items).map(([key, Icon], i) => (
        <Item key={i} text={key} {...{ x, y }}>
          <Icon
            className="text-[--sage-11] m-auto"
            size={"28"}
            absoluteStrokeWidth
            strokeWidth={3.5}
          />
        </Item>
      ))}
      <div className="absolute h-g-y-2/8 bottom-0 rounded-full bg-[--sage-a3] mix-blend-color-burn w-full left-0" />
    </Card>
  );
}
