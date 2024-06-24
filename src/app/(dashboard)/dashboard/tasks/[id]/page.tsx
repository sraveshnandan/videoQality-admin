"use client";
import Loader from "@/components/shared/Loader";
import { ITask } from "@/lib/database/models/task.model";
import useStore from "@/stores/main-store";
import { FetchAllTask } from "@/utils";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

const TaskMutationPage = (props: Props) => {
  const { tasks, setTasks } = useStore();

  const params = useParams();

  const [task, settask] = useState<ITask | null>(null);
  const [loading, setloading] = useState<boolean>(true);

  // handling taskProcess

  const handleTaskProcess = () => {};

  useEffect(() => {
    const t = tasks?.find((t) => t._id.toString() === params.id);
    settask(t as any);
  }, [task]);

  useEffect(() => {
    setloading(true);
    FetchAllTask((params) => {
      setloading(false);
      if (!tasks?.length) {
        return setTasks(params);
      }
      return;
    });
  }, [tasks]);

  return loading ? (
    <Loader />
  ) : (
    <div className="flex flex-col items-start justify-start gap-2 bg-dark-surface rounded-md my-8 p-8">
      <span className="text-xl text-white"> Details of {task?._id}</span>
      <hr />

      {/* task details  */}

      <div className="flex text-xl bg-glass rounded-md shadow-lg  p-4 text-white flex-col gap-2">
        {/* task Id  */}
        <span className="flex  text-xl font-semibold  w-fit mb-2  flex-row items-center gap-2">
          Task ID: <span className="text-gray-500 text-lg">{task?._id}</span>
        </span>
        {/* task prompt  */}
        <span className="flex text-xl font-semibold   w-fit mb-2  flex-row items-center gap-2">
          Prompt:{" "}
          <span className=" text-gray-500 text-lg line-clamp-1">
            {task?.prompt}
          </span>
          <span className="text-white cursor-pointer"></span>
        </span>

        {task?.editing_type && (
          <>
            {/* editing type  */}
            <div className="flex text-xl line-clamp-1 font-semibold   w-fit mb-2  flex-row items-center gap-2">
              Type:{" "}
              <span className=" text-gray-500 text-lg line-clamp-1">
                {task?.prompt}
              </span>
              <span className="text-white cursor-pointer"></span>
            </div>
          </>
        )}

        {/* task createdAt data  */}
        <span className="flex text-xl font-semibold   w-fit  flex-row items-center gap-2">
          Created At:{" "}
          <span className="text-gray-500 text-lg">
            {task?.createdAt.split("T")[0]}
          </span>
        </span>

        {/* Video Section  */}

        <span className="text-4xl flex flex-row items-center gap-2 mb-4 font-semibold text-white">
          Status: <span className="text-gray-500 text-xl">{task?.status}</span>
        </span>

        <div className="flex lg:flex-row   items-center justify-start p-2 rounded-md min-h-fit flex-col gap-2">
          <div className="flex flex-col w-full items-center justify-center lg:w-1/2 min-h-[250px] border p-2 rounded-md gap-2">
            <span className="text-white mb-1 border-b-[2px] text-lg font-semibold">
              Previous Video
            </span>

            <video
              className="w-full h-full"
              src={task?.rawVideo!}
              controls
              autoPlay
            ></video>
          </div>

          {task?.finalVideo && (
            <>
              <div className="flex flex-col w-full items-center justify-center lg:w-1/2 min-h-[250px] border p-2 rounded-md gap-2">
                <span className="text-white mb-1 border-b-[2px] text-lg font-semibold">
                  Previous Video
                </span>

                <video
                  className="w-full h-full"
                  src={task?.rawVideo!}
                  controls
                  autoPlay
                ></video>
              </div>
            </>
          )}
        </div>

        {/* Process Button  */}

        {!task?.finalVideo && (
          <>
            <button
              disabled={loading}
              onClick={handleTaskProcess}
              className={`bg-indigo-600 ${
                loading && "bg-gray-400 "
              } duration-300  transition-all cursor-pointer  text-center text-white px-5 py-3 rounded-md w-[30%] my-4  font-semibold`}
            >
              {loading ? "Please wait..." : "Process task"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskMutationPage;
