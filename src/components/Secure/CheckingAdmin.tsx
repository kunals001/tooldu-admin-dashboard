"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { Loader2 } from "lucide-react";

const CheckingAdmin = ({ children }: { children: React.ReactNode }) => {
  const { admin, checkAuth, checkingAuth } = useAuthStore();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsClient(true); // Avoid hydration mismatch
    checkAuth();       // Run auth check
  }, [checkAuth]);

  useEffect(() => {
    if (isClient && !checkingAuth) {
      if (!admin) {
        router.push("/login");
      } else {
        // ✅ Admin is logged in — if no tab selected, redirect to ?tab=allposts
        const tab = searchParams.get("tab");
        if (pathname === "/" && !tab) {
          router.replace("/?tab=allposts"); // use replace to avoid adding to history
        }
      }
    }
  }, [isClient, checkingAuth, admin, pathname, searchParams, router]);

  if (!isClient || checkingAuth) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader2 className="animate-spin mx-auto text-indigo-500 md:size-[3vw] size-[5vh]" />
      </div>
    );
  }

  return <>{children}</>;
};

export default CheckingAdmin;
