import { ITask } from "@/lib/database/models/task.model";
import { IUser } from "@/lib/database/models/user.model";
import { create } from "zustand";

type Store = {
  user: IUser | null;
  setUser: (user: IUser) => void;
  tasks: ITask[] | null;
  setTasks: (tasks: ITask[]) => void;
};

const useStore = create<Store>()((set) => ({
  tasks: null,
  setTasks: (tasks: ITask[]) => set((state) => ({ tasks: tasks })),
  user: null,
  setUser: (user: IUser) => set((state) => ({ user: user })),
}));

export default useStore;
