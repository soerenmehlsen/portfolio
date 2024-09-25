import ActiveSectionContextProvider from "@/app/containers/active-section";
import ThemeContextProvider from "@/app/containers/theme-context";

type ProvidersProps = {
    children: React.ReactNode;
};

export default function Providers({children}: ProvidersProps) {
    return (
        <ThemeContextProvider>
            <ActiveSectionContextProvider>
                {children}
            </ActiveSectionContextProvider>
        </ThemeContextProvider>
    );
}