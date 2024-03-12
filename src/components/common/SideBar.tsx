"use client";
import { useAuth } from "@clerk/nextjs";
import { Boxes, Container, Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

type TabLinkProps = {
  href: string;
  label: string;
  isActive: boolean;
  icon?: React.ReactNode;
};

function TabLink({ href, label, isActive, icon }: TabLinkProps) {
  return (
    <Link
      href={href}
      className={`flex gap-3 p-2 rounded items-center ${isActive ? "bg-primary-foreground border text-primary" : "text-zinc-700 dark:text-zinc-400 hover:bg-primary-foreground hover:text-primary hover:dark:text-primary"}`}
    >
      {icon !== undefined && icon}
      <span>{label}</span>
    </Link>
  );
}

export default function SideBar() {
  const pathName = usePathname();
  const { isSignedIn } = useAuth();

  return (
    <div className="h-screen min-w-[300px] border-r-[1px]">
      <div className="h-[65px] border-b-[1px] flex flex-col justify-center">
        <h1 className="text-2xl font-bold px-8">Postboy</h1>
      </div>
      <div className="px-8 py-5 flex flex-col gap-3">
        <p className="text-sm text-zinc-700 dark:text-zinc-400">Main Menu</p>
        <TabLink
          href={"/"}
          label="New Request"
          isActive={pathName === "/"}
          icon={<Plus size="20" />}
        />
        {isSignedIn && (
          <>
            <TabLink
              href={"/collections"}
              label="Collections (soon)"
              isActive={pathName === "/collections"}
              icon={<Boxes size="20" />}
            />
            <TabLink
              href={"/environments"}
              label="Environments (soon)"
              isActive={pathName === "/environments"}
              icon={<Container size="20" />}
            />
          </>
        )}
      </div>
    </div>
  );
}
