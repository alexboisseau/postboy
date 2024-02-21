import { useState } from "react";
import { Button } from "../ui/button";

type TabsViewsProps<> = {
  tabs: Array<{
    title: string;
    view: React.ReactNode;
  }>;
};

export default function TabsViews({ tabs }: TabsViewsProps) {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

  const handleClick = (index: number) => {
    setSelectedTabIndex(index);
  };

  return (
    <div>
      <div className="flex gap-2 mb-2">
        {tabs.map((tab, index) => (
          <Button
            className={`text-sm p-0 h-fit ${selectedTabIndex === index && "font-semibold"}`}
            variant="link"
            key={index}
            onClick={() => {
              handleClick(index);
            }}
          >
            {tab.title}
          </Button>
        ))}
      </div>
      {tabs[selectedTabIndex] !== undefined && tabs[selectedTabIndex].view}
    </div>
  );
}
