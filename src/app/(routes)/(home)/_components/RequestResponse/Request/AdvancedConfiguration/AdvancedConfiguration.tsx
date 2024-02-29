import QueryParametersConfiguration from "./QueryParametersConfiguration";
import HeadersConfiguration from "./HeadersConfiguration";
import BodyConfiguration from "./BodyConfiguration/BodyConfiguration";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import AuthorizationConfiguration from "./AuthorizationConfiguration/AuthorizationConfiguration";
import { useAppSelector } from "@context/hooks/use-app-selector";
import { selectCurrentRequestFields } from "@context/features/currentRequest/currentRequestSelectors";

export default function AdvancedConfiguration() {
  const { authorization } = useAppSelector(selectCurrentRequestFields);

  const authorizationIsActive = authorization.type !== "no-auth";

  return (
    <Tabs defaultValue="query-parameters">
      <TabsList>
        <TabsTrigger value="query-parameters">Query Parameters</TabsTrigger>
        <TabsTrigger value="headers">Headers</TabsTrigger>
        <TabsTrigger value="authorization">
          <div className="flex gap-1 items-center">
            <span>Authorization</span>
            <div
              className={`${authorizationIsActive ? "bg-green-600" : "bg-red-600"} rounded-full w-[7px] h-[7px]`}
            ></div>
          </div>
        </TabsTrigger>
        <TabsTrigger value="body">Body</TabsTrigger>
      </TabsList>
      <TabsContent value="query-parameters">
        <QueryParametersConfiguration />
      </TabsContent>
      <TabsContent value="authorization">
        <AuthorizationConfiguration />
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
