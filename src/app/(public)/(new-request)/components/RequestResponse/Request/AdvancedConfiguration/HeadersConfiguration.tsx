import { Button } from "@components/ui/button";
import { ActivatableKeyValue } from "@core/types/activatable-key-value";
import ActivatableKeyValueTable from "./ActivatableKeyValueTable";
import { useAppSelector } from "@context/hooks/use-app-selector";
import { useAppDispatch } from "@context/hooks/use-app-dispatch";
import {
  addHeader,
  checkAllHeaders,
  removeHeader,
  updateHeader,
} from "@context/features/currentRequest/currentRequestSlice";
import { selectCurrentRequestFields } from "@context/features/currentRequest/currentRequestSelectors";
import { Plus } from "lucide-react";

export default function HeadersConfiguration() {
  const { headers } = useAppSelector(selectCurrentRequestFields);
  const dispatch = useAppDispatch();

  const handleCheckedAll = (checked: boolean) => {
    dispatch(checkAllHeaders(checked));
  };

  const handleUpdateParam = (
    updatedParam: ActivatableKeyValue,
    index: number
  ) => {
    dispatch(
      updateHeader({
        header: updatedParam,
        index,
      })
    );
  };

  const handleNewParam = () => {
    dispatch(addHeader());
  };

  const handleRemoveParam = (index: number) => {
    dispatch(removeHeader(index));
  };

  return (
    <div className="flex flex-col">
      <ActivatableKeyValueTable
        data={headers}
        onCheckAll={handleCheckedAll}
        onUpdateRecord={handleUpdateParam}
        onRemoveRecord={handleRemoveParam}
      />
      <Button
        className="w-fit flex gap-2 items-center"
        onClick={handleNewParam}
        variant={"outline"}
      >
        <Plus size="16" />
        <span>Add Header</span>
      </Button>
    </div>
  );
}
