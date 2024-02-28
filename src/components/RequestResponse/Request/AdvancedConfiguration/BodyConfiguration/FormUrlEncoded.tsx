import { useContext } from "react";
import ActivatableKeyValueTable from "../ActivatableKeyValueTable";
import { RequestResponseContext } from "@/src/components/RequestResponse/state/context";
import { RequestResponseActionTypes } from "@/src/components/RequestResponse/state/actions";
import { ActivatableKeyValue } from "@/src/core/types/activatable-key-value";
import { Button } from "@/src/components/ui/button";

export default function FormUrlEncoded() {
  const {
    requestResponse: {
      request: {
        fields: {
          body: { xWwwFormUrlencoded },
        },
      },
    },
    dispatchRequestResponseAction,
  } = useContext(RequestResponseContext);

  const handleCheckAll = (checked: boolean) => {
    dispatchRequestResponseAction({
      type: RequestResponseActionTypes.REQUEST_CHECK_ALL_X_WWW_FORM_URLENCODED_RECORDS,
      payload: checked,
    });
  };

  const handleAddRecord = () => {
    dispatchRequestResponseAction({
      type: RequestResponseActionTypes.REQUEST_NEW_X_WWW_FORM_URLENCODED_RECORD,
    });
  };

  const handleRemoveRecord = (index: number) => {
    dispatchRequestResponseAction({
      type: RequestResponseActionTypes.REQUEST_REMOVE_X_WWW_FORM_URLENCODED_RECORD,
      payload: index,
    });
  };

  const handleUpdateRecord = (
    updatedRecord: ActivatableKeyValue,
    index: number
  ) => {
    dispatchRequestResponseAction({
      type: RequestResponseActionTypes.REQUEST_UPDATE_X_WWW_FORM_URLENCODED_RECORD,
      payload: { record: updatedRecord, index },
    });
  };

  return (
    <div>
      <ActivatableKeyValueTable
        data={xWwwFormUrlencoded}
        onCheckAll={handleCheckAll}
        onRemoveRecord={handleRemoveRecord}
        onUpdateRecord={handleUpdateRecord}
      />
      <Button variant="secondary" onClick={handleAddRecord}>
        Add Record
      </Button>
    </div>
  );
}
