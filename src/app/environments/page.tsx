import { Container } from "lucide-react";

export default function Environments() {
  return (
    <div className="flex flex-col items-center justify-center h-full py-5 px-6 bg-background border-[1px]">
      <div className="flex gap-3 items-center py-5">
        <Container size="50" />
        <h2 className="text-5xl font-semibold">Environments</h2>
      </div>
      <p>Under development for the moment ...</p>
    </div>
  );
}
