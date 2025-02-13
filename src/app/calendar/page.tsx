"use client";

import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS for the date picker
import { Flag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getTaskDataCalendar } from "@/actions/taskAction";

// Interface matching the data returned from getTaskDataCalendar
interface Task {
  id: number;
  userId: number;
  title: string;
  description?: string | null;
  dueDate?: number | null; // Unix timestamp
  completed: boolean;
  createdAt: number; // Unix timestamp
  updatedAt: number; // Unix timestamp
}

// Interface for the returned data from getTaskDataCalendar
interface TaskData {
  id: number;
  userId: number;
  title: string;
  description?: string | null;
  dueDate?: Date | null;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const formatDateToIndianStyle = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const TaskCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showTasks, setShowTasks] = useState<boolean>(false);
  const [tasksForSelectedDate, setTasksForSelectedDate] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        const taskData: TaskData[] = (await getTaskDataCalendar()).map(
          (task) => ({
            ...task,
            dueDate: task.dueDate ? new Date(task.dueDate) : null,
            createdAt: new Date(task.createdAt),
            updatedAt: new Date(task.updatedAt),
          }),
        );

        // Convert Date objects to Unix timestamps
        const convertedTasks: Task[] = taskData.map((task) => ({
          ...task,
          dueDate: task.dueDate ? task.dueDate.getTime() / 1000 : null,
          createdAt: task.createdAt.getTime() / 1000,
          updatedAt: task.updatedAt.getTime() / 1000,
        }));

        setTasks(convertedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const getTasksForDay = (date: Date): Task[] => {
    return tasks.filter((task) => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate * 1000);
      return isSameDay(taskDate, date) && !task.completed; // Show only incomplete tasks
    });
  };

  const handleCloseTasks = () => {
    setShowTasks(false);
    setTasksForSelectedDate([]);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-muted-foreground">Loading tasks...</p>
      </div>
    );
  }

  return (
    <div className="mt-[80px] flex flex-col md:mt-[100px]">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your tasks efficiently.
        </p>
      </div>
      <div className="container mx-auto mb-8 flex flex-col items-start justify-center gap-10 p-4 pt-[60px] md:flex-row md:pt-[80px]">
        {/* Date Picker Section */}
        <div className="mr-4">
          <Card className="w-full max-w-md p-6">
            <h3 className="mb-4 text-center text-xl font-semibold">
              Select Date
            </h3>

            {/* Date Picker */}
            <div className="mb-4">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  if (date) {
                    setSelectedDate(date);
                    setCurrentMonth(date);
                  }
                }}
                inline
                className="text-center"
              />
            </div>
          </Card>
        </div>

        {/* Calendar Display Section */}
        <div className="flex flex-grow flex-col gap-10 md:flex-row">
          <Card className="h-[400px] w-full max-w-sm p-4">
            {" "}
            {/* Adjusted height for square shape */}
            <h3 className="mb-4 text-center text-xl font-semibold">
              Tasks for {selectedDate.toDateString()}
            </h3>
            {/* Calendar Display */}
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 42 }).map((_, index) => {
                const day =
                  index -
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth(),
                    1,
                  ).getDay() +
                  1;
                const date = new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth(),
                  day,
                );
                const tasksForDay = getTasksForDay(date);
                const taskCount = tasksForDay.length;

                return (
                  <div
                    key={index}
                    className={`flex h-12 flex-col items-center justify-center border ${isSameDay(date, selectedDate) ? "bg-blue-600" : ""}`}
                    onClick={() => {
                      if (
                        day > 0 &&
                        day <=
                          new Date(
                            currentMonth.getFullYear(),
                            currentMonth.getMonth() + 1,
                            0,
                          ).getDate()
                      ) {
                        setSelectedDate(date);
                        setTasksForSelectedDate(tasksForDay);
                        if (taskCount > 0) {
                          setShowTasks(true);
                        }
                      }
                    }}
                  >
                    <span className="text-lg font-bold">
                      {day > 0 &&
                      day <=
                        new Date(
                          currentMonth.getFullYear(),
                          currentMonth.getMonth() + 1,
                          0,
                        ).getDate()
                        ? day
                        : ""}
                    </span>
                    {taskCount > 0 && (
                      <div className="flex cursor-pointer items-center">
                        <Flag className="text-red-500" />
                        <span className="ml-1">{taskCount}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
          <Card className="h-auto w-full max-w-sm p-4">
            <div className="mt-4 space-y-4">
              {getTasksForDay(selectedDate).length > 0 ? (
                getTasksForDay(selectedDate).map((task) => (
                  <Card key={task.id} className="p-4">
                    <h4 className="mb-1 font-medium">{task.title}</h4>
                    {task.description && (
                      <p className="ml-2 text-sm">{task.description}</p>
                    )}
                    <p className="ml-2 text-xs">
                      Due:{" "}
                      {task.dueDate
                        ? formatDateToIndianStyle(task.dueDate)
                        : "No due date"}
                    </p>
                  </Card>
                ))
              ) : (
                <p className="py-8 text-center text-muted-foreground">
                  No tasks scheduled for this day
                </p>
              )}
            </div>
          </Card>
        </div>

        {/* Modal for showing tasks */}
        {showTasks && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <Card className="p-6">
              <h3 className="mb-4 text-xl font-semibold">
                Tasks for {selectedDate.toDateString()}
              </h3>
              {tasksForSelectedDate.length > 0 ? (
                tasksForSelectedDate.map((task) => (
                  <div key={task.id} className="mb-2">
                    <h4 className="font-medium">{task.title}</h4>
                    {task.description && (
                      <p className="ml-4 text-sm">{task.description}</p>
                    )}
                  </div>
                ))
              ) : (
                <p>No tasks for this day.</p>
              )}
              <Button onClick={handleCloseTasks} className="mt-4">
                Close
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCalendar;
