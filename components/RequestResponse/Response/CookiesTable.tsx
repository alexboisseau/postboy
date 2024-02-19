import { HttpCookie } from "@/core/types/http-response";

export default function CookiesTable({ cookies }: { cookies: HttpCookie[] }) {
  const tableHeadersTwClasses = "border p-2";
  const tableRowsTwClasses = "border p-2 break-words";

  return (
    <div className="flex flex-col max-h-[400px] overflow-y-auto">
      {cookies.length > 0 ? (
        <table className="table-fixed text-left mb-2 w-full">
          <thead>
            <tr className="text-gray-700 text-sm font-semibold">
              <th className={`${tableHeadersTwClasses}`}>Key</th>
              <th className={`${tableHeadersTwClasses}`}>Value</th>
              <th className={`${tableHeadersTwClasses}`}>Domain</th>
              <th className={`${tableHeadersTwClasses}`}>Path</th>
              <th className={`${tableHeadersTwClasses}`}>Expires</th>
              <th className={`${tableHeadersTwClasses}`}>HttpOnly</th>
              <th className={`${tableHeadersTwClasses}`}>Secure</th>
            </tr>
          </thead>
          <tbody>
            {cookies.map((cookie, index) => {
              return (
                <tr key={index} className="hover:bg-gray-50 text-sm">
                  <td className={tableRowsTwClasses}>{cookie.key}</td>
                  <td className={tableRowsTwClasses}>{cookie.value}</td>
                  <td className={tableRowsTwClasses}>{cookie.domain}</td>
                  <td className={tableRowsTwClasses}>{cookie.path}</td>
                  <td className={tableRowsTwClasses}>{cookie.expires}</td>
                  <td className={tableRowsTwClasses}>
                    {cookie.httpOnly ? "true" : "false"}
                  </td>
                  <td className={tableRowsTwClasses}>
                    {cookie.secure ? "true" : "false"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-sm">No Cookies ...</p>
      )}
    </div>
  );
}
