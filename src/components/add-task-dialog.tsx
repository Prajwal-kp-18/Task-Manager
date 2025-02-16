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
import { Plus } from "lucide-react";
import { Textarea } from "../components/ui/textarea";
import { addTask, getProjects } from "../actions/taskAction";
import { useState, useTransition, useEffect } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

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

export function AddTaskDialog() {
  const [open, setOpen] = useState(false);
  const [isAddTaskPending, addTaskTransition] = useTransition();
  const [projects, setProjects] = useState<string[]>([]);
  const [newProject, setNewProject] = useState<string>("");
  const [showProjectList, setShowProjectList] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await getProjects();
        setProjects(
          projectsData.filter((project): project is string => project !== null),
        );
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };
    fetchProjects();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    addTaskTransition(async () => {
      try {
        const projectName = newProject || values.project;
        await addTask({
          ...values,
          dueDate: values.dueDate ? new Date(values.dueDate) : null,
          project: projectName,
        });
        // close the dialog when task added
        setOpen(false);
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

  const handleBlur = () => {
    setTimeout(() => {
      setShowProjectList(false);
    }, 1);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {/* buttons for mobile and desktop */}
        <>
          <Button size={"sm"} className="sm:hidden">
            <Plus className="h-4 w-4" />
          </Button>
          <Button size={"sm"} className="hidden sm:flex">
            <Plus className="mr-2 h-4 w-4" /> Add Task{" "}
          </Button>
        </>
      </DialogTrigger>
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
                        console.log("New project name:", e.target.value);
                        setNewProject(e.target.value);
                        form.setValue("project", e.target.value);
                      }}
                      placeholder="New project name"
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
                {isAddTaskPending && (
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
