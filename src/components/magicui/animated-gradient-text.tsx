import { ReactNode } from "react";

import { cn } from "@/lib/utils";

export default function AnimatedGradientText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex px-2 font-medium duration-500 ease-out [--bg-size:300%] ",
        className,
      )}
    >
      {children}
    </div>
  );
}
