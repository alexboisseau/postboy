"use client";
import { Boxes, Container, Plus } from "lucide-react";

function TabLink({
  label,
  isActive,
  icon,
}: {
  label: string;
  isActive: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div
      className={`flex gap-3 p-2 rounded items-center ${isActive ? "bg-primary-foreground border text-primary" : "text-secondary-foreground"}`}
    >
      {icon !== undefined && icon}
      <span>{label}</span>
    </div>
  );
}

export default function SideBar() {
  return (
    <div className="h-screen w-[350px] border-r-[1px]">
      <div className="h-[65px] border-b-[1px] flex flex-col justify-center">
        <h1 className="text-2xl font-bold px-8">Postboy</h1>
      </div>
      <div className="px-8 py-5 flex flex-col gap-3">
        <p className="text-sm text-foreground">Main Menu</p>
        <TabLink
          label="New Request"
          isActive={true}
          icon={<Plus size="20" />}
        />
        <TabLink
          label="Collections (soon)"
          isActive={false}
          icon={<Boxes size="20" />}
        />
        <TabLink
          label="Environments (soon)"
          isActive={false}
          icon={<Container size="20" />}
        />
      </div>
    </div>
  );
}
