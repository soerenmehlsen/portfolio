import { useEffect} from "react";
import { useInView } from "react-intersection-observer";
import { useActiveSectionContext } from "@/app/containers/active-section";
import type { SectionName } from "@/app/lib/types";

export function useSectionInView(sectionName: SectionName, threshold = 0.75) {
    const { ref, inView } = useInView({ threshold });
    const { setActiveSection, timeOfLastClick } = useActiveSectionContext();

    useEffect(() => {
        if (inView && Date.now() - timeOfLastClick > 1000) {
            setActiveSection(sectionName);
        }
    }, [inView, setActiveSection, timeOfLastClick, sectionName]);

    return {
        ref,
        inView};
}
