import { useContext } from "react";
import { RequestResponseContext } from "../../context";
import ActivatableKeyValueTable from "./ActivatableKeyValueTable";
import { Button } from "@/components/ui/button";
import { ActivatableKeyValue } from "@/core/types/activatable-key-value";
import { RequestFormActionTypes } from "../actions";

export default function HeadersConfiguration() {
  const {
    httpRequestForm: {
      fields: { headers },
    },
    dispatchHttpRequestFormAction,
  } = useContext(RequestResponseContext);

  const handleCheckedAll = (checked: boolean) => {
    dispatchHttpRequestFormAction({
      type: RequestFormActionTypes.CHECK_ALL_HEADERS,
      payload: checked,
    });
  };

  const handleUpdateParam = (
    updatedParam: ActivatableKeyValue,
    index: number
  ) => {
    dispatchHttpRequestFormAction({
      type: RequestFormActionTypes.UPDATE_HEADER,
      payload: {
        index,
        header: updatedParam,
      },
    });
  };

  const handleNewParam = () => {
    dispatchHttpRequestFormAction({
      type: RequestFormActionTypes.ADD_HEADER,
    });
  };

  const handleRemoveParam = (index: number) => {
    dispatchHttpRequestFormAction({
      type: RequestFormActionTypes.REMOVE_HEADER,
      payload: index,
    });
  };

  return (
    <div className="flex flex-col">
      <ActivatableKeyValueTable
        data={headers}
        onCheckAll={handleCheckedAll}
        onUpdateRecord={handleUpdateParam}
        onRemoveRecord={handleRemoveParam}
      />
      <Button onClick={handleNewParam} className="w-fit">
        Add Header
      </Button>
    </div>
  );
}
