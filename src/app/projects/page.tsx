"use client";

import { useEffect, useState } from "react";
import {
  getProjects,
  getTasksByProject,
  getTaskData,
} from "@/actions/taskAction";

export default function DashboardPage() {
  const [projects, setProjects] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [todayTasks, setTodayTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const projectsData = await getProjects();
      setProjects(
        projectsData.filter((project): project is string => project !== null),
      );
      setLoading(false);
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      const allTasks = await getTaskData();
      const today = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
      const filteredTasks = allTasks.filter((task) => {
        const taskDate = task.dueDate
          ? new Date(task.dueDate).toISOString().split("T")[0]
          : null;
        return taskDate === today;
      });
      setTodayTasks(filteredTasks);
      setLoading(false);
    };
    fetchTasks();
  }, []);

  const handleProjectClick = async (projectName: string) => {
    setLoading(true);
    setSelectedProject(projectName);
    const tasksData = await getTasksByProject(projectName);
    setTasks(tasksData);
    setLoading(false);
  };

  return (
    <div className="mt-[80px] flex flex-col p-4 text-white md:mt-[100px]">
      <h1 className="mb-4 text-3xl font-bold">Projects</h1>
      {loading && <div className="loader">Loading...</div>}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project}
            className="cursor-pointer rounded-lg border border-gray-700 p-4 shadow-md transition duration-200 hover:bg-gray-800"
            onClick={() => handleProjectClick(project)}
          >
            <h2 className="text-xl font-semibold">{project}</h2>
          </div>
        ))}
      </div>

      {selectedProject && !loading && (
        <div className="mt-6">
          <h2 className="mb-2 text-2xl font-bold">
            Tasks for {selectedProject}
          </h2>
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`flex items-center justify-between rounded-lg border p-4 shadow-sm ${task.completed ? "bg-green-800" : "bg-red-800"} border-gray-700`}
              >
                <div>
                  <h3 className="font-medium text-white">
                    <span className="text-xl font-bold text-black">
                      Title:{" "}
                    </span>
                    {task.title}
                  </h3>
                  <p>
                    <span className="text-whi text-lg font-bold text-black">
                      Description:{" "}
                    </span>
                    {task.description}
                  </p>
                </div>
                <span
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${task.completed ? "bg-green-500" : "bg-red-500"} text-white`}
                >
                  {task.completed ? "✓" : "✗"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {loading && (
        <div className="mt-[100px] flex justify-center">
          <div className="loader">Loading...</div>
        </div>
      )}
    </div>
  );
}
