"use client";
import { MainContextProvider } from "@/context/MainContext";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Providers = ({ children }: Props) => {
  return <MainContextProvider>{children}</MainContextProvider>;
};

export default Providers;
