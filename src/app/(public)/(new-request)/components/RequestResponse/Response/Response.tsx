"use client";
import ResponseHeader from "./ResponseHeader";
import ResponseError from "./ResponseError";
import KeyValueTable from "./KeyValueTable";
import CookiesTable from "./CookiesTable";
import Body from "./Body";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { useAppSelector } from "@context/hooks/use-app-selector";
import { selectCurrentRequest } from "@context/features/currentRequest/currentRequestSelectors";
import { Skeleton } from "@components/ui/skeleton";

export default function Response() {
  const { response, isSubmitting } = useAppSelector(selectCurrentRequest);

  return (
    <div className="flex flex-col gap-1 py-5 px-6 bg-background border-[1px]">
      <ResponseHeader />
      {isSubmitting && <Skeleton className="w-full h-[400px]" />}
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
