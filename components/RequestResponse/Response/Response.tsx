import { useContext } from "react";
import { RequestResponseContext } from "../state/context";
import ResponseHeader from "./ResponseHeader";
import ResponseError from "./ResponseError";
import KeyValueTable from "./KeyValueTable";
import CookiesTable from "./CookiesTable";
import Body from "./Body";
import TabsViews from "@/components/shared/TabsViews";

export default function Response() {
  const {
    requestResponse: { response },
  } = useContext(RequestResponseContext);

  return (
    <div className="flex flex-col gap-1">
      <ResponseHeader />
      <TabsViews
        tabs={[
          {
            title: "Headers",
            view: response.value !== null && (
              <KeyValueTable data={response.value.headers} />
            ),
          },
          {
            title: "Cookies",
            view: response.value !== null && (
              <CookiesTable cookies={response.value.cookies} />
            ),
          },
          {
            title: "Body",
            view: response.value !== null && <Body />,
          },
        ]}
      />
      {response.error && <ResponseError />}
    </div>
  );
}
