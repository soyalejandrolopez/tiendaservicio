"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface MotionWrapperProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
}

// Fade In Up Animation
export function FadeInUp({ children, delay = 0, ...props }: MotionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Fade In Animation
export function FadeIn({ children, delay = 0, ...props }: MotionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Scale In Animation
export function ScaleIn({ children, delay = 0, ...props }: MotionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.4, 0.25, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Slide In From Left
export function SlideInLeft({ children, delay = 0, ...props }: MotionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Slide In From Right
export function SlideInRight({ children, delay = 0, ...props }: MotionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Stagger Container for child animations
export function StaggerContainer({ children, delay = 0, ...props }: MotionWrapperProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren: delay,
            staggerChildren: 0.15,
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Stagger Item (use inside StaggerContainer)
export function StaggerItem({ children, ...props }: Omit<MotionWrapperProps, "delay">) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Hover Scale Effect
export function HoverScale({ children, scale = 1.05, ...props }: MotionWrapperProps & { scale?: number }) {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Parallax Scroll Effect
export function ParallaxSection({ children, ...props }: MotionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Float Animation (continuous)
export function FloatAnimation({ children, ...props }: MotionWrapperProps) {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Blur In Animation
export function BlurIn({ children, delay = 0, ...props }: MotionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
