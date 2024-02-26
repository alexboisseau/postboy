import { useContext } from "react";
import { RequestResponseActionTypes } from "../../state/actions";
import { RequestResponseContext } from "../../state/context";
import { Button } from "@/components/ui/button";
import { ActivatableKeyValue } from "@/core/types/activatable-key-value";
import ActivatableKeyValueTable from "./ActivatableKeyValueTable";

export default function QueryParametersConfiguration() {
  const {
    requestResponse: {
      request: {
        fields: { queryParameters },
      },
    },
    dispatchRequestResponseAction,
  } = useContext(RequestResponseContext);

  const handleCheckedAll = (checked: boolean) => {
    dispatchRequestResponseAction({
      type: RequestResponseActionTypes.REQUEST_CHECK_ALL_QUERY_PARAMETERS,
      payload: checked,
    });
  };

  const handleUpdateParam = (
    updatedParam: ActivatableKeyValue,
    index: number
  ) => {
    dispatchRequestResponseAction({
      type: RequestResponseActionTypes.REQUEST_UPDATE_QUERY_PARAMETER,
      payload: {
        index,
        queryParameter: updatedParam,
      },
    });
  };

  const handleNewParam = () => {
    dispatchRequestResponseAction({
      type: RequestResponseActionTypes.REQUEST_NEW_QUERY_PARAMETER,
    });
  };

  const handleRemoveParam = (index: number) => {
    dispatchRequestResponseAction({
      type: RequestResponseActionTypes.REQUEST_REMOVE_QUERY_PARAMETER,
      payload: index,
    });
  };

  return (
    <div className="flex flex-col">
      <ActivatableKeyValueTable
        data={queryParameters}
        onCheckAll={handleCheckedAll}
        onUpdateRecord={handleUpdateParam}
        onRemoveRecord={handleRemoveParam}
      />
      <Button onClick={handleNewParam} className="w-fit" variant={"secondary"}>
        Add Param
      </Button>
    </div>
  );
}
