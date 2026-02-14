import React from "react";
import styles from "./Container.module.scss";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "normal" | "wide" | "narrow" | "full";
  as?: "div" | "section" | "article" | "header" | "footer";
}

export function Container({
  children,
  className = "",
  size = "normal",
  as: Component = "div",
}: ContainerProps) {
  const sizeClass = styles[size];

  return (
    <Component className={`${sizeClass} ${className}`}>{children}</Component>
  );
}
