import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#e8f0e9] flex flex-col">
      <body className="min-h-screen bg-[#e8f0e9] flex flex-col">
        <Header name="Joana da Silva Oliveira" />

        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 flex flex-col md:flex-row">{children}</main>
        </div>
      </body>
    </div>
  );
}
