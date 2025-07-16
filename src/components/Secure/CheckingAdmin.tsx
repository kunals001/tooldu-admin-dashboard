"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { Loader2 } from "lucide-react";

const CheckingAdmin = ({ children }: { children: React.ReactNode }) => {
  const { admin, checkAuth, checkingAuth } = useAuthStore();
  const [isClient, setIsClient] = useState(false);
  const [tabParam, setTabParam] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
    checkAuth();

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      setTabParam(tab);
    }
  }, [checkAuth]);

  useEffect(() => {
    if (isClient && !checkingAuth) {
      if (!admin) {
        router.push("/login");
      } else {
        if (pathname === "/" && !tabParam) {
          router.replace("/?tab=allposts");
        }
      }
    }
  }, [isClient, checkingAuth, admin, pathname, tabParam, router]);

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
