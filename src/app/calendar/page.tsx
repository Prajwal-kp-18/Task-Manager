import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { getTaskData } from "@/actions/taskAction";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const mainData = await getTaskData();

  return (
    <div className="pb-2 pt-[100px]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Calender</h1>
        <p className="mt-2 text-muted-foreground">
          Manage and track all your tasks in one place.
        </p>
      </div>
      <p>This is from calender</p>
    </div>
  );
}
