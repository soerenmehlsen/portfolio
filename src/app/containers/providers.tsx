import ActiveSectionContextProvider from "@/app/containers/active-section";

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