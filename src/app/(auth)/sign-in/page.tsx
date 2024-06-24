"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {};

const SignInPage = (props: Props) => {
  const router = useRouter();
  const [formdata, setformdata] = useState<{ email: string; password: string }>(
    { email: "", password: "" }
  );
  const handleFormSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (!formdata.email.includes("@") || formdata.email.length === 0) {
      return toast.error("Invalid Email address.");
    }

    if (formdata.password.length === 0) {
      return toast.error("Please enter your password.");
    }
    const payload = { ...formdata };
    const data: any = await fetch("/api/admin/auth", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const res = await data.json();
    if (res.success) {
      toast.success(res.message);
      localStorage.setItem("user", JSON.stringify(res.user) as string);
      return router.push("/dashboard");
    } else {
      toast.error(res.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      return router.push("/dashboard");
    }
  });

  return (
    <div className="flex items-center justify-center px-4 lg:px-0 min-h-[100vh]">
      {/* outer section  */}
      <div className="bg-dark-surface/50 min-h-[450px] h-fit  items-center justify-center lg:w-[60%] w-full rounded-md shadow-lg flex lg:flex-row flex-col  gap-2 shadow-black/30 p-2">
        {/* left section  */}
        <section className="lg:w-[48%] flex-col gap-2 items-start justify-start h-[430px] p-8 hidden lg:flex w-full">
          <Image src={"/logo.png"} alt="logo" width={100} height={100} />
          <span className=" mt-4 bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-500 text-transparent bg-clip-text animate-gradient text-3xl">
            VideoQuality.in
          </span>

          <span className="text-lg bg-dark-bg p-2 xl:max-w-[80%] w-full text-wrap rounded-md text-white/80">
            Login to your account, to access your role.
          </span>
        </section>
        {/* form section  */}
        <section className="lg:w-[48%]  flex w-full ">
          <form
            onSubmit={handleFormSubmit}
            className="flex-grow p-3 flex-col gap-2 flex"
          >
            <input
              type="text"
              name="email"
              onChange={(ev) =>
                setformdata((prev) => ({ ...prev, email: ev.target.value }))
              }
              className="p-2 font-semibold bg-dark-bg text-white text-lg my-2 rounded-md"
              placeholder="Email Address"
              id="email"
            />
            <input
              type="password"
              name="password"
              className="p-2 bg-dark-bg font-semibold text-white text-lg my-2 rounded-md"
              placeholder="Access Key"
              id="password"
              onChange={(ev) =>
                setformdata((prev) => ({ ...prev, password: ev.target.value }))
              }
            />

            <button
              type="submit"
              className="bg-white px-5 py-3 rounded-md shadow-lg shadow-black text-black"
            >
              Login to Dashboard
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default SignInPage;
