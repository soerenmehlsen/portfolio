import SmoothScroll from "@/app/components/motion/SmoothScroll";
import ScrollAnimationsFallback from "@/app/components/motion/ScrollAnimationsFallback";

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <SmoothScroll>
      <ScrollAnimationsFallback />
      {children}
    </SmoothScroll>
  );
}
