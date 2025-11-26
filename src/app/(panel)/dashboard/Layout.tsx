import { Toaster } from 'sonner';
import { Sidebar } from "./_components/sidebar";
export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Sidebar >
              <Toaster position="top-right" richColors  duration={2500} />
                {children}
           </Sidebar >
        </>
    );
}