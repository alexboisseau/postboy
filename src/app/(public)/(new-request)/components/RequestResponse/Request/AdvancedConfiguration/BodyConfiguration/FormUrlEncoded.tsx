import ActivatableKeyValueTable from "../ActivatableKeyValueTable";
import { ActivatableKeyValue } from "@core/types/activatable-key-value";
import { Button } from "@components/ui/button";
import { useAppSelector } from "@context/hooks/use-app-selector";
import { useAppDispatch } from "@context/hooks/use-app-dispatch";
import {
  addBodyXWWWFormUrlEncodedRecord,
  checkAllBodyXWwwFormUrlencodedRecords,
  removeBodyXWwwFormUrlencodedRecord,
  updateBodyXWWWFormUrlEncodedRecord,
} from "@context/features/currentRequest/currentRequestSlice";
import { selectCurrentRequestFields } from "@context/features/currentRequest/currentRequestSelectors";

export default function FormUrlEncoded() {
  const {
    body: { xWwwFormUrlencoded },
  } = useAppSelector(selectCurrentRequestFields);
  const dispatch = useAppDispatch();

  const handleCheckAll = (checked: boolean) => {
    dispatch(checkAllBodyXWwwFormUrlencodedRecords(checked));
  };

  const handleAddRecord = () => {
    dispatch(addBodyXWWWFormUrlEncodedRecord());
  };

  const handleRemoveRecord = (index: number) => {
    dispatch(removeBodyXWwwFormUrlencodedRecord(index));
  };

  const handleUpdateRecord = (
    updatedRecord: ActivatableKeyValue,
    index: number
  ) => {
    dispatch(
      updateBodyXWWWFormUrlEncodedRecord({
        index,
        record: updatedRecord,
      })
    );
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
