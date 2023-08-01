import { Variants } from "framer-motion";

export const animationVariant: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.05 } },
  exit: { opacity: 0 },
};

export const defaultAnimation = {
  variants: animationVariant,
  initial: "initial",
  animate: "animate",
  exit: "exit",
};
