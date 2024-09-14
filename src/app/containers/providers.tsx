import ActiveSectionContextProvider from "@/app/containers/active-section";
import react from "react";

type ProvidersProps = {
    children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
    return (
        <ActiveSectionContextProvider>
            {children}
        </ActiveSectionContextProvider>
    );
}