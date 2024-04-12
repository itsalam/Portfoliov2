"use client";

import { Spinner } from "@radix-ui/themes";
import { motion } from "framer-motion";
import { DynamicOptionsLoadingProps } from "next/dynamic";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function LoadingCard(_props: DynamicOptionsLoadingProps) {
  return (
    <motion.div className="flex h-full w-full items-center justify-center">
      <Spinner size={"3"} />
    </motion.div>
  );
}
