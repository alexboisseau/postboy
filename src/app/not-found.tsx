import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full py-5 px-6 bg-background border-[1px]">
      <div className="flex gap-3 items-center py-5">
        <SearchX size="50" />
        <h2 className="text-5xl font-semibold">Page Not Found</h2>
      </div>
      <p>Oops, could not find requested resource</p>
    </div>
  );
}
