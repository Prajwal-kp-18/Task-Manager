import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { DataTable } from "./data-table-components/data-table";
import { columns } from "./data-table-components/columns";
import path from "path";
import fs from "fs";
import { getTaskData } from "@/actions/taskAction";

async function getData() {
  const filePath = path.join(
    process.cwd(),
    "src/app/dashboard/data-table-components",
    "data.json",
  );
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}
export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  // const data = await getData();
  const mainData = await getTaskData();
  // console.log("data", mainData);

  return (
    <div className="pb-2 pt-3">
      <DataTable data={mainData} columns={columns} />
    </div>
  );
}
