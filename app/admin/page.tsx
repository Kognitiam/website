"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { CalendarDays } from "lucide-react";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const sections = [
  {
    href: "/admin/events",
    icon: CalendarDays,
    label: "Events",
    description: "Create and manage community events",
  },
];

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();

  async function handleSignOut() {
    await signOut(auth);
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1
              className="text-xl font-bold text-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Kognitiam Admin
            </h1>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <p className="text-sm text-muted-foreground mb-6">
          What would you like to manage?
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {sections.map(({ href, icon: Icon, label, description }) => (
            <Link key={href} href={href}>
              <Card className="border-border hover:border-primary/50 hover:shadow-sm transition-all cursor-pointer group h-full">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="p-3 rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p
                      className="font-bold text-foreground"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {label}
                    </p>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
