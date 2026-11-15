import SmoothScroll from "@/app/components/motion/SmoothScroll";

type ProvidersProps = {
    children: React.ReactNode;
};

export default function Providers({children}: ProvidersProps) {
    return <SmoothScroll>{children}</SmoothScroll>;
}
