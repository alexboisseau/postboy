import { useContext, useState } from "react";
import { RequestResponseContext } from "../state/context";
import ResponseHeader from "./ResponseHeader";
import ResponseError from "./ResponseError";
import { Button } from "@/components/ui/button";
import KeyValueTable from "./KeyValueTable";
import CookiesTable from "./CookiesTable";
import Body from "./Body";

type ConfigTab = "headers" | "cookies" | "body";

type NavigationTabsProps = {
  configTab: ConfigTab;
  setConfigTab: (type: ConfigTab) => void;
};

function NavigationTabs({ configTab, setConfigTab }: NavigationTabsProps) {
  const {
    requestResponse: { response },
  } = useContext(RequestResponseContext);

  const getTabBtnTwClasses = (tab: ConfigTab) => {
    return `text-sm p-0 ${configTab === tab && "font-semibold"}`;
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="link"
        className={getTabBtnTwClasses("headers")}
        onClick={() => {
          setConfigTab("headers");
        }}
      >
        Headers{" "}
        {response.value?.headers &&
          `(${Object.keys(response.value.headers).length})`}
      </Button>
      <Button
        variant="link"
        className={getTabBtnTwClasses("cookies")}
        onClick={() => {
          setConfigTab("cookies");
        }}
      >
        Cookies
      </Button>
      <Button
        variant="link"
        className={getTabBtnTwClasses("body")}
        onClick={() => {
          setConfigTab("body");
        }}
      >
        Body
      </Button>
    </div>
  );
}

export default function Response() {
  const {
    requestResponse: { response },
  } = useContext(RequestResponseContext);
  const [tab, setTab] = useState<ConfigTab>("headers");

  return (
    <div className="flex flex-col gap-4">
      <ResponseHeader />
      <NavigationTabs configTab={tab} setConfigTab={setTab} />
      {response.error && <ResponseError />}
      {tab === "headers" && response.value !== null && (
        <KeyValueTable data={response.value.headers} />
      )}
      {tab === "cookies" && response.value !== null && (
        <CookiesTable cookies={response.value.cookies} />
      )}
      {tab === "body" && response.value !== null && <Body />}
    </div>
  );
}
