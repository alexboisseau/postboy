export default function KeyValueTable({
  data,
}: {
  data: Array<{
    key: string;
    value: string;
  }>;
}) {
  const tableHeadersTwClasses = "border p-2";
  const tableRowsTwClasses = "border p-2";

  return (
    <div className="flex flex-col max-h-[400px] overflow-y-auto">
      {data.length > 0 ? (
        <table className="table-auto text-left mb-2">
          <thead>
            <tr className="text-slate-700 text-sm font-semibold">
              <th className={`${tableHeadersTwClasses} w-3/12`}>Key</th>
              <th className={`${tableHeadersTwClasses} w-9/12`}>Value</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => {
              return (
                <tr key={index} className="hover:bg-slate-50 text-sm">
                  <td className={tableRowsTwClasses}>{row.key}</td>
                  <td className={tableRowsTwClasses}>{row.value}</td>
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
