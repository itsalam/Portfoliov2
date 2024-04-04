import { motion, useMotionValue } from "framer-motion";
import { useEffect } from "react";
import { moveCursorEffect } from "../Grid/util";

const Effect = () => {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  useEffect(() => {
    const followMouse = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const follower = document.getElementById("cursor");
      const canvas = document.getElementById("mask");
      // Dynamically update the mask on the canvas
      // Note: For simplicity, this example uses a simple circle mask centered on the follower.
      // For more complex shapes, you might need an SVG mask or more complex calculations.
      if (canvas && follower) {
        const curWidth = follower?.clientWidth;
        canvas.setAttribute("data-circle-radius", `${curWidth * 1.5}`);
        canvas.setAttribute("data-circle-x", `${e.clientX - curWidth / 2}`);
        canvas.setAttribute("data-circle-y", `${e.clientY}`);
        moveCursorEffect(canvas);
      }
      // canvas.style.webkitMaskPosition = `${e.client}px ${e.client}px`;
      // canvas.style.maskPosition = `${e.client}px ${e.client}px`;
    };
    window.addEventListener("mousemove", followMouse);
    return () => {
      window.removeEventListener("mousemove", followMouse);
    };
  });
  return (
    <motion.div
      style={{ x, y }}
      id="cursor"
      className="mouse-effect w-g-4/8 pointer-events-none absolute left-0 top-0 z-[50] aspect-square cursor-none rounded-full backdrop-grayscale backdrop-invert"
    />
  );
};

export default Effect;
