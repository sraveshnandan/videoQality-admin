"use client";

import { LucideShieldClose, UploadCloud } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

import { CldUploadWidget } from "next-cloudinary";

type Props = {
  rawVideoFile: Dispatch<SetStateAction<string | null>>;
};

const Uploader = ({ rawVideoFile }: Props) => {
  const [file, setfile] = useState<File | null>(null);
  const [previewUrl, setpreviewUrl] = useState<string | null>(null);

  return (
    <div className="flex  bg-glass shadow-md shadow-black   w-full rounded-md xl:h-[380px] h-fit items-center justify-center flex-col overflow-hidden p-4">
      {/* preview section  */}

      {previewUrl ? (
        <div className="flex items-center justify-center  relative flex-grow">
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
          {/* video preview  */}
          <video
            src={previewUrl}
            controls
            muted
            className="rounded-md w-fit h-fit"
          ></video>
        </div>
      ) : (
        <>
          <CldUploadWidget
            options={{
              maxFiles: 1,
              multiple: false,
              clientAllowedFormats: ["mp4", "mov", "avi", "m4a", "webm"],
              maxFileSize: 100000000,
            }}
            onSuccess={(res) => {
              setpreviewUrl(res.info?.secure_url);
              rawVideoFile(res.info.secure_url);
            }}
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
          >
            {({ open }) => {
              return (
                <button
                  className="bg-white flex flex-col items-center gap-2 p-4 text-black rounded-xl my-2 font-medium"
                  onClick={() => open()}
                >
                  <UploadCloud size={55} />
                  Upload an Video
                </button>
              );
            }}
          </CldUploadWidget>
          <span className="text-white font-semibold text-center">
            Max Size: 100 Mb
          </span>
        </>
      )}
    </div>
  );
};

export default Uploader;
