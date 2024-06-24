"use client";

import Loader from "@/components/shared/Loader";
import { ITask } from "@/lib/database/models/task.model";
import useStore from "@/stores/main-store";
import { FetchAllTask } from "@/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {};

const DashboardPage = (props: Props) => {
  const { tasks, setTasks } = useStore();
  const [loading, setloading] = useState<boolean>(false);

  useEffect(() => {
    setloading(true);
    FetchAllTask((params) => {
      setloading(false);
      if (!tasks?.length) {
        return setTasks(params);
      }
    });
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="flex flex-col text-white gap-2">
      {/* queued tasks  */}
      <div className="bg-dark-surface flex flex-col gap-2 rounded-md shadow-lg p-4">
        <span className="text-white text-2xl font-semibold">
          All Queued Tasks
        </span>

        {tasks &&
          tasks
            .filter((t: ITask) => t.status === "queued")
            .map((item: ITask) => (
              <div
                key={item._id}
                className="bg-dark-bg text-white flex-row justify-between rounded-md p-2 flex "
              >
                {/* id section  */}
                <div className="flex flex-col items-start">
                  <span>Task ID:</span>
                  <span>{item?._id.substring(0, 8)}...</span>
                </div>

                {/* creation  section  */}
                <div className="flex flex-col items-start">
                  <span>Creation Date:</span>
                  <span>{item.createdAt.split("T")[0]}</span>
                </div>

                {/* user   section  */}
                <div className="flex flex-col items-start">
                  <span>User Name:</span>
                  <span>{item.user.first_name}</span>
                </div>

                {/* creation  section  */}
                <div className="flex flex-col items-start justify-start">
                  <span>Action:</span>
                  <Link
                    className="text-blue-500 font-medium cursor-pointer bg-white rounded-full px-3 "
                    href={`/dashboard/tasks/${item._id}`}
                  >
                    Process
                  </Link>
                </div>
              </div>
            ))}
      </div>

      {/* processing tasks  */}
      <div className="bg-dark-surface flex flex-col gap-2 rounded-md shadow-lg p-4">
        <span className="text-white text-2xl font-semibold">
          All Processing Tasks
        </span>

        {tasks &&
          tasks
            .filter((t: ITask) => t.status === "processing")
            .map((item: ITask) => (
              <div
                key={item._id}
                className="bg-dark-bg text-white flex-row justify-between rounded-md p-2 flex "
              >
                {/* id section  */}
                <div className="flex flex-col items-start">
                  <span>Task ID:</span>
                  <span>{item?._id.substring(0, 8)}...</span>
                </div>

                {/* creation  section  */}
                <div className="flex flex-col items-start">
                  <span>Creation Date:</span>
                  <span>{item.createdAt.split("T")[0]}</span>
                </div>

                {/* user   section  */}
                <div className="flex flex-col items-start">
                  <span>User Name:</span>
                  <span>{item.user.first_name}</span>
                </div>

                {/* creation  section  */}
                <div className="flex flex-col items-start justify-start">
                  <span>Action:</span>
                  <Link
                    className="text-blue-500 font-medium cursor-pointer bg-white rounded-full px-3 "
                    href={"/"}
                  >
                    Process
                  </Link>
                </div>
              </div>
            ))}
      </div>

      {/* completed tasks  */}

      <div className="bg-dark-surface flex flex-col gap-2 rounded-md shadow-lg p-4">
        <span className="text-white text-2xl font-semibold">
          All Completed Tasks
        </span>

        {tasks &&
          tasks
            .filter((t: ITask) => t.status === "completed")
            .map((item: ITask) => (
              <div
                key={item._id}
                className="bg-dark-bg text-white flex-row justify-between rounded-md p-2 flex "
              >
                {/* id section  */}
                <div className="flex flex-col items-start">
                  <span>Task ID:</span>
                  <span>{item?._id.substring(0, 8)}...</span>
                </div>

                {/* creation  section  */}
                <div className="flex flex-col items-start">
                  <span>Creation Date:</span>
                  <span>{item.createdAt.split("T")[0]}</span>
                </div>

                {/* user   section  */}
                <div className="flex flex-col items-start">
                  <span>User Name:</span>
                  <span>{item.user.first_name}</span>
                </div>

                {/* creation  section  */}
                <div className="flex flex-col items-start justify-start">
                  <span>Action:</span>
                  <Link
                    className="text-blue-500 font-medium cursor-pointer bg-white rounded-full px-3 "
                    href={"/"}
                  >
                    Process
                  </Link>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default DashboardPage;
