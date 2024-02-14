import { useState } from "react";
import { Button } from "../../../ui/button";
import QueryParametersConfiguration from "./QueryParametersConfiguration";
import HeadersConfiguration from "./HeadersConfiguration";

type ConfigTab = "query-parameters" | "headers";

type NavigationTabsProps = {
  configTab: ConfigTab;
  setConfigTab: (type: ConfigTab) => void;
};

function NavigationTabs({ configTab, setConfigTab }: NavigationTabsProps) {
  const getTabBtnTwClasses = (tab: ConfigTab) => {
    return `text-sm p-0 ${configTab === tab && "font-semibold"}`;
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="link"
        className={getTabBtnTwClasses("query-parameters")}
        onClick={() => {
          setConfigTab("query-parameters");
        }}
      >
        Params
      </Button>
      <Button
        variant="link"
        className={getTabBtnTwClasses("headers")}
        onClick={() => {
          setConfigTab("headers");
        }}
      >
        Headers
      </Button>
    </div>
  );
}

export default function AdvancedConfiguration() {
  const [tab, setTab] = useState<ConfigTab>("query-parameters");

  return (
    <div>
      <NavigationTabs configTab={tab} setConfigTab={setTab} />
      {tab === "query-parameters" && <QueryParametersConfiguration />}
      {tab === "headers" && <HeadersConfiguration />}
    </div>
  );
}
