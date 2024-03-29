"use client";

import { TitleCard } from "@/components/Card";
import { cn } from "@/lib/utils";
import { Separator as BaseSeparator, Text as BaseText } from "@radix-ui/themes";
import {
  AnimatePresence,
  CustomDomComponent,
  motion,
  useAnimate,
} from "framer-motion";
import {
  ArrowUpRight as ArrowUpRightBase,
  Mail as EmailIcon,
  Github as GithubIcon,
  Linkedin as LinkedinIcon,
  LucideProps,
  MessageCircleQuestion as MessageCircleQuestionIcon,
} from "lucide-react";
import {
  ComponentProps,
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useState,
} from "react";
import { CARD_TYPES } from "./types";

const Text = motion(BaseText);
const Separator = motion(BaseSeparator);
const ArrowUpRight = motion(ArrowUpRightBase);
const Email = motion(EmailIcon);
const Github = motion(GithubIcon);
const Linkedin = motion(LinkedinIcon);
const MessageCircleQuestion = motion(MessageCircleQuestionIcon);

//Add a contact form, linkedin, github, resume, and email/phone section
const CONTACTS: Record<
  string,
  { value: string; Icon: CustomDomComponent<LucideProps> }
> = {
  LinkedIn: {
    value: "https://www.linkedin.com/in/vincent-lam-1a2b3c4d/",
    Icon: Linkedin,
  },
  GitHub: { value: "github.com/vincentlam", Icon: Github },
  Email: { value: "vincentthanhlam@gmail.com", Icon: Email },
};

const Link = forwardRef<
  ElementRef<typeof motion.div>,
  ComponentPropsWithoutRef<typeof motion.div> & { text: string; value: string }
>((props, ref) => {
  const { text, value, onHoverStart, ...rest } = props;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial="initial"
      onHoverStart={(e, i) => {
        onHoverStart?.(e, i);
        setIsHovered(true);
      }}
      onHoverEnd={() => setIsHovered(false)}
      className="flex flex-col gap-y-1"
      animate={isHovered ? "hover" : "exit"}
      ref={ref}
      {...rest}
    >
      <a
        href={value}
        className="relative w-min overflow-hidden"
        target="_blank"
        rel="noreferrer"
      >
        <Text
          size="2"
          className={cn(
            "flex items-center overflow-hidden text-[--sage-11] transition-colors duration-300 hover:text-[--sage-12]"
          )}
        >
          {text}
          <div className="overflow-hidden">
            <ArrowUpRight
              size={16}
              variants={{
                hover: {
                  x: ["0%", "100%", "-100%", "0%"],
                  y: ["0%", "-100%", "100%", "0%"],
                  transition: {
                    times: [0, 0.5, 0.5, 1],
                    duration: 0.33,
                  },
                },
                initial: {
                  x: "0%",
                },
              }}
            />
          </div>
        </Text>
        <Separator
          size="3"
          className="bg-[--sage-11]"
          variants={{
            initial: {
              width: "100%",
            },
            hover: {
              width: [null, "100%", "0%", "100%"],
              marginLeft: [null, "100%", "0%", "0%"],
              transition: {
                times: [0, 0.5, 0.5, 1],
                duration: 0.33,
              },
            },
            exit: {
              width: "100%",
            },
          }}
        />
      </a>
    </motion.div>
  );
});

Link.displayName = "Link";

export default function ContactCard(props: ComponentProps<typeof motion.div>) {
  const { className, ...rest } = props;
  const [projectsRef] = useAnimate();
  const [hoveredLink, setHoveredLink] = useState<string>();
  const Icon = hoveredLink
    ? CONTACTS[hoveredLink]?.Icon
    : motion(MessageCircleQuestion);

  return (
    <TitleCard
      {...rest}
      containerClassName={cn(className)}
      className={cn("relative flex flex-1 items-center gap-3 p-3")}
      title={CARD_TYPES.Contacts}
      ref={projectsRef}
      initial="initial"
      id={CARD_TYPES.Contacts}
      key={CARD_TYPES.Contacts}
    >
      <motion.div className="my-auto flex-1 rounded-full px-4">
        <motion.div
          className="bg-blur-xl relative aspect-square overflow-hidden rounded-full bg-[--gray-a5]"
          variants={{}}
        >
          <AnimatePresence>
            {hoveredLink && (
              <Icon
                className="absolute left-0 top-0 h-full w-full p-4 text-[--gray-10]"
                key={hoveredLink}
                initial={{
                  opacity: 1,
                }}
                animate={{
                  y: [-45, 0],
                  rotate: [-30, 0],
                  opacity: [0, 1],
                }}
                exit={{
                  y: [0, 45],
                  rotate: [0, 30],
                  opacity: [0.5, 0],
                }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <div className="relative flex flex-1 flex-col justify-center gap-2">
        {Object.entries(CONTACTS).map(([key, { value }], i) => (
          <Link
            key={i}
            text={key}
            value={value}
            onHoverStart={() => {
              setHoveredLink(key);
            }}
          />
        ))}
      </div>
    </TitleCard>
  );
}
