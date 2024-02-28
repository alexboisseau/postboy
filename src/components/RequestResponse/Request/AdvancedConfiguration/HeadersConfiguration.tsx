import { useContext } from "react";
import { RequestResponseActionTypes } from "../../state/actions";
import { RequestResponseContext } from "../../state/context";
import ActivatableKeyValueTable from "./ActivatableKeyValueTable";
import { Button } from "@/src/components/ui/button";
import { ActivatableKeyValue } from "@/src/core/types/activatable-key-value";

export default function HeadersConfiguration() {
  const {
    requestResponse: {
      request: {
        fields: { headers },
      },
    },
    dispatchRequestResponseAction,
  } = useContext(RequestResponseContext);

  const handleCheckedAll = (checked: boolean) => {
    dispatchRequestResponseAction({
      type: RequestResponseActionTypes.REQUEST_CHECK_ALL_HEADERS,
      payload: checked,
    });
  };

  const handleUpdateParam = (
    updatedParam: ActivatableKeyValue,
    index: number
  ) => {
    dispatchRequestResponseAction({
      type: RequestResponseActionTypes.REQUEST_UPDATE_HEADER,
      payload: {
        index,
        header: updatedParam,
      },
    });
  };

  const handleNewParam = () => {
    dispatchRequestResponseAction({
      type: RequestResponseActionTypes.REQUEST_NEW_HEADER,
    });
  };

  const handleRemoveParam = (index: number) => {
    dispatchRequestResponseAction({
      type: RequestResponseActionTypes.REQUEST_REMOVE_HEADER,
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
      <Button onClick={handleNewParam} className="w-fit" variant={"secondary"}>
        Add Header
      </Button>
    </div>
  );
}
