import { useContext } from "react";
import { RequestResponseContext } from "../../context";
import { Button } from "@/components/ui/button";
import { ActivatableKeyValue } from "@/core/types/activatable-key-value";
import ActivatableKeyValueTable from "./ActivatableKeyValueTable";
import { RequestFormActionTypes } from "../actions";

export default function QueryParametersConfiguration() {
  const {
    httpRequestForm: {
      fields: { queryParameters },
    },
    dispatchHttpRequestFormAction,
  } = useContext(RequestResponseContext);

  const handleCheckedAll = (checked: boolean) => {
    dispatchHttpRequestFormAction({
      type: RequestFormActionTypes.CHECK_ALL_QUERY_PARAMETERS,
      payload: checked,
    });
  };

  const handleUpdateParam = (
    updatedParam: ActivatableKeyValue,
    index: number
  ) => {
    dispatchHttpRequestFormAction({
      type: RequestFormActionTypes.UPDATE_QUERY_PARAMETER,
      payload: {
        index,
        queryParameter: updatedParam,
      },
    });
  };

  const handleNewParam = () => {
    dispatchHttpRequestFormAction({
      type: RequestFormActionTypes.ADD_NEW_QUERY_PARAMETER,
    });
  };

  const handleRemoveParam = (index: number) => {
    dispatchHttpRequestFormAction({
      type: RequestFormActionTypes.REMOVE_QUERY_PARAMETER,
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
      <Button onClick={handleNewParam} className="w-fit">
        Add Param
      </Button>
    </div>
  );
}
