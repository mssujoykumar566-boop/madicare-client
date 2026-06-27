
"use client";

import { authClient } from "@/lib/auth-client";
import { Spinner } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      router.replace("/login");
      return;
    }

    if (session.user.role === "admin") {
      router.replace("/dashboard/admin");
    } else if (session.user.role === "doctor") {
      router.replace("/dashboard/doctor");
    } else {
      router.replace("/dashboard/patient");
    }
  },[session, isPending, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner size="lg" />
    </div>
  );
}