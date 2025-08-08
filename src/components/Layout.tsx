import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const navItems = [
  { label: "Mitglieder", to: "/" },
  { label: "Abteilungen", to: "/abteilungen" },
  { label: "Gruppen", to: "/gruppen" },
];

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="border-b">
        <nav className="container flex items-center justify-between h-16 px-4">
          <div className="flex gap-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  location.pathname === item.to
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      {/* Inhalt */}
      <main className="flex-1 container py-6 px-4">{children}</main>
    </div>
  );
}
