"use client";

import { LucideShieldClose, LucideUploadCloud } from "lucide-react";
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import { toast } from "react-hot-toast";

type Props = {
  rawVideoFile?: Dispatch<SetStateAction<File | null>>;
  vidurl?: Dispatch<SetStateAction<string | null>>;
};

const Uploader = ({ rawVideoFile, vidurl }: Props) => {
  const [file, setfile] = useState<File | null>(null);
  const [previewUrl, setpreviewUrl] = useState<string | null>(null);

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target.files![0].size > 100 * 1024 * 1024) {
      return toast.error("Max Video size is 100 Mb.");
    }
    setfile(ev.target.files![0]);
    if (rawVideoFile) {
      rawVideoFile(ev.target.files![0]);
      setpreviewUrl(
        (window.URL || window.webkitURL).createObjectURL(ev.target.files![0])
      );
    }

    setpreviewUrl(
      (window.URL || window.webkitURL).createObjectURL(ev.target.files![0])
    );
  };
  return (
    <div className="flex   bg-glass shadow-md shadow-black   w-full rounded-md  h-fit items-center justify-center flex-col overflow-hidden p-4">
      {/* preview section  */}

      {previewUrl ? (
        <div className="flex items-center justify-center  relative flex-grow">
          {/* video preview  */}

          {/* cancle button  */}

          <div
            onClick={() => {
              setpreviewUrl("");
              setfile(null);
            }}
            className="bg-white p-1  rounded-md cursor-pointer h-fit top-4 z-50 right-4 absolute  "
          >
            <LucideShieldClose size={34} color="red" />
          </div>
          <video
            src={previewUrl}
            controls
            className="w-full rounded-md h-full"
          ></video>
        </div>
      ) : (
        <form className={`flex flex-col gap-2`}>
          {/* upload lable  */}
          <label
            htmlFor="vid"
            className="bg-white/40 hover:bg-gradient-to-tr from-pink-500 to-indigo-500  text-black rounded-md px-5  py-2 cursor-pointer group duration-300 transition-all"
          >
            <LucideUploadCloud size={140} className="group-hover:text-white" />
          </label>
          <input
            onChange={(ev) => handleChange(ev)}
            type="file"
            hidden
            required
            id="vid"
            accept="video/*"
            className="mb-4"
            maxLength={10 * 1024 * 1024}
          />

          <span className="text-white font-semibold">Choose from device.</span>
          <span className="text-white font-semibold text-center">
            Max Size: 100 Mb
          </span>
        </form>
      )}
    </div>
  );
};

export default Uploader;
