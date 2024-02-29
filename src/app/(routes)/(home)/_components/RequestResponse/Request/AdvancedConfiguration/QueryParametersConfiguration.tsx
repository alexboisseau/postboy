import { Button } from "@components/ui/button";
import { ActivatableKeyValue } from "@core/types/activatable-key-value";
import ActivatableKeyValueTable from "./ActivatableKeyValueTable";
import { useAppSelector } from "@context/hooks/use-app-selector";
import { useAppDispatch } from "@context/hooks/use-app-dispatch";
import {
  addQueryParameter,
  checkAllQueryParameters,
  removeQueryParameter,
  updateQueryParameter,
} from "@context/features/currentRequest/currentRequestSlice";
import { selectCurrentRequestFields } from "@context/features/currentRequest/currentRequestSelectors";

export default function QueryParametersConfiguration() {
  const { queryParameters } = useAppSelector(selectCurrentRequestFields);
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col">
      <ActivatableKeyValueTable
        data={queryParameters}
        onCheckAll={(checked: boolean) => {
          dispatch(checkAllQueryParameters(checked));
        }}
        onUpdateRecord={(updatedParam: ActivatableKeyValue, index: number) => {
          dispatch(
            updateQueryParameter({
              queryParameter: updatedParam,
              index,
            })
          );
        }}
        onRemoveRecord={(index: number) => {
          dispatch(removeQueryParameter(index));
        }}
      />
      <Button
        onClick={() => {
          dispatch(addQueryParameter());
        }}
        className="w-fit"
        variant={"secondary"}
      >
        Add Param
      </Button>
    </div>
  );
}
