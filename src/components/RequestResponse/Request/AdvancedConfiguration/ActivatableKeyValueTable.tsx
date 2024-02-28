import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Input } from "@/src/components/ui/input";
import { ActivatableKeyValue } from "@/src/core/types/activatable-key-value";
import { Trash2 } from "lucide-react";

export default function ActivatableKeyValueTable({
  data,
  onCheckAll,
  onUpdateRecord,
  onRemoveRecord,
}: {
  data: ActivatableKeyValue[];
  onCheckAll: (checked: boolean) => void;
  onUpdateRecord: (updatedRecord: ActivatableKeyValue, index: number) => void;
  onRemoveRecord: (index: number) => void;
}) {
  const handleUpdateRecord = (
    index: number,
    updatedAttribute: "key" | "active" | "value",
    value: string | boolean
  ) => {
    const recordToUpdate = data[index];

    onUpdateRecord(
      {
        ...recordToUpdate,
        [updatedAttribute]: value,
      },
      index
    );
  };

  const tableHeadersTwClasses = "border p-2";
  const tableRowsTwClasses = "border p-2";
  const tableInputTwClasses =
    "p-0 h-auto bg-transparent border-none focus-visible:ring-0";

  return (
    <div className="flex flex-col">
      {data.length > 0 ? (
        <table className="table-auto text-left mb-2 max-h-[400px] overflow-auto">
          <thead>
            <tr className="text-sm font-semibold">
              <th className={`${tableHeadersTwClasses} w-[3%] text-center`}>
                <Checkbox
                  onCheckedChange={(checked: boolean) => {
                    onCheckAll(checked);
                  }}
                  checked={data.every((record) => record.active)}
                />
              </th>
              <th className={`${tableHeadersTwClasses} w-5/12`}>Key</th>
              <th className={`${tableHeadersTwClasses} w-5/12`}>Value</th>
              <th className={`${tableHeadersTwClasses} w-1/12`}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((record, index) => {
              return (
                <tr key={index}>
                  <td className={`${tableRowsTwClasses} text-center`}>
                    <Checkbox
                      checked={record.active}
                      onCheckedChange={(checked: boolean) => {
                        handleUpdateRecord(index, "active", checked);
                      }}
                    />
                  </td>
                  <td className={tableRowsTwClasses}>
                    <Input
                      value={record.key}
                      onChange={(e) => {
                        handleUpdateRecord(index, "key", e.currentTarget.value);
                      }}
                      className={tableInputTwClasses}
                    />
                  </td>
                  <td className={tableRowsTwClasses}>
                    <Input
                      className={tableInputTwClasses}
                      value={record.value}
                      onChange={(e) => {
                        handleUpdateRecord(
                          index,
                          "value",
                          e.currentTarget.value
                        );
                      }}
                    />
                  </td>
                  <td className={tableRowsTwClasses}>
                    <Button
                      className="p-1 h-6"
                      onClick={() => {
                        onRemoveRecord(index);
                      }}
                    >
                      <Trash2 size={15} />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-sm">No Records ...</p>
      )}
    </div>
  );
}
