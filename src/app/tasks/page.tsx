import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { getTaskData } from "@/actions/taskAction";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const mainData = await getTaskData();
  const currentDate = new Date().toISOString().split("T")[0];
  const tasksForToday = mainData.filter(
    (task) =>
      task.dueDate && task.dueDate.toISOString().split("T")[0] === currentDate,
  );

  return (
    <div className="pb-2 pt-[100px]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Tasks for {currentDate}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Manage and track all your tasks in one place.
        </p>
      </div>
      <div>
        {tasksForToday.length > 0 ? (
          tasksForToday.map((task) => (
            <div
              key={task.id}
              className={`task-item mb-2 flex items-center justify-between rounded p-4 ${task.completed ? "bg-green-400" : "bg-red-400"}`}
            >
              <div>
                <h2 className="text-xl font-semibold text-black">
                  <span className="text-xl">Title: </span>
                  {task.title}
                </h2>
                <p className="text-black">
                  <span className="text-lg">Description: </span>
                  {task.description}
                </p>
              </div>
              <span
                className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${task.completed ? "bg-green-800" : "bg-red-800"} text-white`}
              >
                {task.completed ? "✓" : "✗"}
              </span>
            </div>
          ))
        ) : (
          <p>No tasks for today.</p>
        )}
      </div>
    </div>
  );
}
