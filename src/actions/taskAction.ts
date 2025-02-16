"use server";
import { db } from "@/db";
import { tasks } from "@/db/schema";
import { getCurrentUser } from "@/lib/session";
import { and, asc, eq, inArray, not } from "drizzle-orm";
import { revalidatePath } from "next/cache";
// Ensure required fields are provided when adding a task
interface NewTask {
  title: string;
  description?: string;
  dueDate?: Date | null;
  completed?: boolean;
  project?: string;
}

// Function to add a task for the authenticated user
export const addTask = async (task: NewTask) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  await db.insert(tasks).values({
    ...task,
    userId: user.id,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  revalidatePath("/");
};

export const getTaskData = async () => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }
  const data = await db
    .select()
    .from(tasks)
    .where(eq(tasks.userId, user.id))
    .orderBy(asc(tasks.id));
  return data;
};
type Task = {
  id: number;
  userId: number;
  title: string;
  description?: string | null; // Allow `null`
  dueDate?: number | null; // Store as timestamp (UNIX epoch in seconds)
  completed: boolean;
  createdAt: number; // Convert `Date` to timestamp
  updatedAt: number;
  project: string; // Define the project field type
  // Add other fields if necessary
};
export const getTaskDataCalendar = async (): Promise<Task[]> => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }
  const data = await db
    .select()
    .from(tasks)
    .where(eq(tasks.userId, user.id))
    .orderBy(asc(tasks.id));

  // Normalize data
  return data.map((task) => ({
    ...task,
    dueDate: task.dueDate ? new Date(task.dueDate).getTime() : null, // Convert Date to timestamp
    createdAt: new Date(task.createdAt).getTime(),
    updatedAt: new Date(task.updatedAt).getTime(),
    project: task.project || "", // Ensure project is a string
  }));
};

export const toggleTask = async (taskId: number) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }
  await db
    .update(tasks)
    .set({
      completed: not(tasks.completed),
    })
    .where(and(eq(tasks.userId, user.id), eq(tasks.id, taskId)));

  revalidatePath("/");
};

interface EditTask extends Partial<NewTask> {
  id: number;
}

export const editTask = async (task: EditTask) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const { id, ...updates } = task;

  await db
    .update(tasks)
    .set({
      ...updates,
      updatedAt: new Date(),
    })
    .where(eq(tasks.id, id));

  revalidatePath("/");
};

// Function to delete one or more tasks for the authenticated user
export const deleteTask = async (taskIds: number | number[]) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  // Ensure taskIds is an array
  const ids = Array.isArray(taskIds) ? taskIds : [taskIds];

  await db
    .delete(tasks)
    .where(and(eq(tasks.userId, user.id), inArray(tasks.id, ids)));
  revalidatePath("/");
};

export const getProjects = async () => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const data = await db
    .select({ project: tasks.project })
    .from(tasks)
    .where(eq(tasks.userId, user.id))
    .groupBy(tasks.project);

  return data
    .map((value: { project: string | null }) => value.project)
    .filter(Boolean); // Adjust the type in the map function
};
