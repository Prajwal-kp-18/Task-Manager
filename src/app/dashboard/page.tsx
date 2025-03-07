import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { DataTable } from "./data-table-components/data-table";
import { columns } from "./data-table-components/columns";
import { getTaskData } from "@/actions/taskAction";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const mainData = await getTaskData();

  return (
    <div className="pb-2 pt-[100px]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Manage and track all your tasks in one place.
        </p>
      </div>
      <DataTable data={mainData} columns={columns} />
    </div>
  );
}
