import QueryParametersConfiguration from "./QueryParametersConfiguration";
import HeadersConfiguration from "./HeadersConfiguration";
import BodyConfiguration from "./BodyConfiguration/BodyConfiguration";
import TabsViews from "@/components/shared/TabsViews";

export default function AdvancedConfiguration() {
  return (
    <TabsViews
      tabs={[
        {
          title: "Query Parameters",
          view: <QueryParametersConfiguration />,
        },
        {
          title: "Headers",
          view: <HeadersConfiguration />,
        },
        {
          title: "Body",
          view: <BodyConfiguration />,
        },
      ]}
    />
  );
}
