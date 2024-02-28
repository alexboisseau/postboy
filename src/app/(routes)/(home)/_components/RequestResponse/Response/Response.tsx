import { useContext } from "react";
import { RequestResponseContext } from "../state/context";
import ResponseHeader from "./ResponseHeader";
import ResponseError from "./ResponseError";
import KeyValueTable from "./KeyValueTable";
import CookiesTable from "./CookiesTable";
import Body from "./Body";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";

export default function Response() {
  const {
    requestResponse: { response },
  } = useContext(RequestResponseContext);

  return (
    <div className="flex flex-col gap-1">
      <ResponseHeader />
      {response.value !== null && (
        <Tabs defaultValue="body">
          <TabsList>
            <TabsTrigger value="body">Body</TabsTrigger>
            <TabsTrigger value="headers">Headers</TabsTrigger>
            <TabsTrigger value="cookies">Cookies</TabsTrigger>
          </TabsList>
          <TabsContent value="body">
            {response.value !== null && <Body />}
          </TabsContent>
          <TabsContent value="headers">
            {response.value !== null && (
              <KeyValueTable data={response.value.headers} />
            )}
          </TabsContent>
          <TabsContent value="cookies">
            {response.value !== null && (
              <CookiesTable cookies={response.value.cookies} />
            )}
          </TabsContent>
        </Tabs>
      )}

      {response.error && <ResponseError />}
    </div>
  );
}
