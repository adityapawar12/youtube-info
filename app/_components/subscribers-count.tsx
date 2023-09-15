"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
  channelInfo: {
    viewCount: string;
    subscriberCount: string;
    hiddenSubscriberCount: boolean;
    videoCount: string;
  };
};

const SubscribersCount = ({ channelInfo }: Props) => {
  const { register, handleSubmit, setValue } = useForm();

  const [pageBackgroundColor, setPageBackgroundColor] = useState("#000");
  const [pageTextColor, setPageTextColor] = useState("#fff");
  const [pageStaticText, setPageStaticText] = useState("SUB GOAL");

  useEffect(() => {
    setValue("staticSubscribersText", "SUB GOAL");
  });

  const handleFormSubmit = (data: any) => {
    const { backgroundColor, textColor, staticSubscribersText } = data;

    setPageBackgroundColor(backgroundColor);
    setPageTextColor(textColor);
    setPageStaticText(staticSubscribersText);
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen w-screen"
      style={{ backgroundColor: pageBackgroundColor }}
    >
      {channelInfo && channelInfo.subscriberCount ? (
        <>
          <h1
            className={`text-6xl font-bold`}
            style={{ color: pageTextColor }}
          >{`${channelInfo.subscriberCount}`}</h1>
          <h1
            className={`text-3xl fon-normal`}
            style={{ color: pageTextColor }}
          >{`${pageStaticText}`}</h1>
        </>
      ) : (
        <></>
      )}

      <form
        onChange={handleSubmit(handleFormSubmit)}
        className="my-4 w-60 flex justify-center items-center flex-col"
      >
        <>
          <label
            className="text-2xl self-start"
            style={{ color: pageTextColor }}
            htmlFor="backgroundColor"
          >
            BG COLOR
          </label>
          <input
            type="color"
            {...register("backgroundColor")}
            className="p-1 my-2 h-10 w-full rounded border-[4px] border-gray-900"
          />
        </>
        <>
          <label
            className="text-2xl self-start"
            style={{ color: pageTextColor }}
            htmlFor="textColor"
          >
            TEXT COLOR
          </label>
          <input
            type="color"
            {...register("textColor")}
            className="p-1 my-2 h-10 w-full rounded border-[4px] border-gray-900"
          />
        </>
        <>
          <label
            className="text-2xl self-start"
            style={{ color: pageTextColor }}
            htmlFor="staticSubscribersText"
          >
            TEXT BELOW
          </label>
          <input
            type="text"
            {...register("staticSubscribersText")}
            placeholder="Static Subscribers Text"
            className="p-2 my-2 h-10  w-full rounded border border-gray-300"
          />
        </>
      </form>
    </div>
  );
};

export default SubscribersCount;
