"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";
import { editTask } from "../actions/taskAction";
import { useState, useTransition, useEffect } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Task } from "@/db/schema";
import { getProjects } from "../actions/taskAction";

const formSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().max(9999).optional(),
  completed: z.boolean().optional(),
  dueDate: z
    .string()
    .optional()
    .refine((value) => !value || !isNaN(Date.parse(value)), {
      message: "Invalid date format",
    }),
  project: z.string().optional(),
});

interface EditTasksDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  task: Task;
}

export function EditTaskDialog({ task, ...props }: EditTasksDialogProps) {
  const [isUpdatePending, startUpdateTransition] = useTransition();
  const [projects, setProjects] = useState<string[]>([]);
  const [newProject, setNewProject] = useState<string>(task.project ?? "");
  const [showProjectList, setShowProjectList] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task.title ?? "",
      description: task.description ?? "",
      completed: task.completed,
      dueDate: task.dueDate
        ? task.dueDate.toISOString().split("T")[0]
        : undefined,
      project: task.project ?? "",
    },
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await getProjects();
        setProjects(
          projectsData.filter(
            (project: string | null): project is string => project !== null,
          ),
        );
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };
    fetchProjects();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startUpdateTransition(async () => {
      try {
        await editTask({
          id: task.id,
          title: values.title,
          description: values.description,
          completed: values.completed,
          dueDate: values.dueDate ? new Date(values.dueDate) : null,
          project: values.project,
        });
        // close the dialog when task added
        // setOpen(false);
        props.onOpenChange?.(false);
        toast.success("Task has been created");
        // Reset the form fields
        form.reset();
      } catch (error) {
        toast.error("Task has not been created");

        console.error(error);
      }
    });

    console.log(values);
  }

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create task</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new task.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Task name" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Task Description" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Input type="date" placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="completed"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Completed</FormLabel>
                    <FormDescription>
                      Mark this task as completed.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="project"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project</FormLabel>
                  <FormControl>
                    <input
                      type="text"
                      value={newProject}
                      onFocus={() => setShowProjectList(true)}
                      onChange={(e) => {
                        setNewProject(e.target.value);
                        form.setValue("project", e.target.value);
                      }}
                      placeholder="Current Project"
                      className="mt-2 w-full rounded border bg-gray-800 p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  {showProjectList && projects.length > 0 && (
                    <ul className="mt-2 max-h-40 overflow-y-auto rounded border bg-gray-900 shadow-lg">
                      {projects
                        .filter((project) =>
                          project
                            .toLowerCase()
                            .includes(newProject.toLowerCase()),
                        )
                        .map((project) => (
                          <li
                            key={project}
                            className="cursor-pointer p-2 text-white transition-colors duration-200 hover:bg-blue-700"
                            onMouseDown={() => {
                              setNewProject(project);
                              form.setValue("project", project);
                              setShowProjectList(false);
                            }}
                          >
                            <span className="font-medium">{project}</span>
                          </li>
                        ))}
                      {projects.filter((project) =>
                        project
                          .toLowerCase()
                          .includes(newProject.toLowerCase()),
                      ).length > 3 && (
                        <li className="p-2 text-center text-gray-400">
                          Scroll for more...
                        </li>
                      )}
                    </ul>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>

              <Button type="submit">
                {isUpdatePending && (
                  <ReloadIcon
                    className="mr-2 size-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
