import QueryParametersConfiguration from "./QueryParametersConfiguration";
import HeadersConfiguration from "./HeadersConfiguration";
import BodyConfiguration from "./BodyConfiguration/BodyConfiguration";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdvancedConfiguration() {
  return (
    <Tabs defaultValue="query-parameters">
      <TabsList>
        <TabsTrigger value="query-parameters">Query Parameters</TabsTrigger>
        <TabsTrigger value="headers">Headers</TabsTrigger>
        <TabsTrigger value="body">Body</TabsTrigger>
      </TabsList>
      <TabsContent value="query-parameters">
        <QueryParametersConfiguration />
      </TabsContent>
      <TabsContent value="headers">
        <HeadersConfiguration />
      </TabsContent>
      <TabsContent value="body">
        <BodyConfiguration />
      </TabsContent>
    </Tabs>
  );
}
