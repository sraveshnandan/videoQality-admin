import { ITask } from "@/lib/database/models/task.model";
import { IUser } from "@/lib/database/models/user.model";
import { ReactNode, createContext, useContext, useState } from "react";

const MainContext = createContext({});

const MainContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [tasks, setTasks] = useState<ITask[] | null>(null);
  return (
    <MainContext.Provider value={{ user, setUser, tasks, setTasks }}>
      {children}
    </MainContext.Provider>
  );
};

export { MainContextProvider, MainContext };
