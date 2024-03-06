import { Boxes } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full py-5 px-6 bg-background border-[1px]">
      <div className="flex gap-3 items-center py-5">
        <Boxes size="50" />
        <h2 className="text-5xl font-semibold">Requests Collections</h2>
      </div>
      <p>Under development for the moment ...</p>
    </div>
  );
}
