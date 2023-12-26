"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Props = {
  channelInfoInitial: {
    viewCount: string;
    subscriberCount: string;
    hiddenSubscriberCount: boolean;
    videoCount: string;
  };
};

const SubscribersCount = ({ channelInfoInitial }: Props) => {
  const { register, handleSubmit, setValue } = useForm();

  const [channelInfo, setChannelInfo] = useState<{
    viewCount: string;
    subscriberCount: string;
    hiddenSubscriberCount: boolean;
    videoCount: string;
  }>(channelInfoInitial);

  const [pageBackgroundColor, setPageBackgroundColor] =
    useState<string>("#000000");
  const [pageTextColor, setPageTextColor] = useState<string>("#ffffff");
  const [pageStaticText, setPageStaticText] = useState<string>("SUB GOAL");
  const [subGoalText, setSubGoalText] = useState<number>(100);

  useEffect(() => {
    const getSubCount = async () => {
      const subCountAPI = await fetch(`/api/get-sub-count`);
      const subCountAPIResponse = await subCountAPI.json();

      if (subCountAPIResponse.isError) {
        throw Error(subCountAPIResponse.errorObj.message);
      }

      setChannelInfo(subCountAPIResponse.ytSubCountAPIData.items[0].statistics);
    };

    const subscribersInterval = setInterval(() => {
      getSubCount();
    }, 1000);

    return () => {
      clearInterval(subscribersInterval);
    };
  }, []);

  useEffect(() => {
    setValue("staticSubscribersText", "SUB GOAL");
    setValue("subGoalNumber", 100);
    setValue("backgroundColor", "#000000");
    setValue("textColor", "#ffffff");
  }, []);

  const handleFormSubmit = (data: any) => {
    const { backgroundColor, textColor, staticSubscribersText, subGoalNumber } =
      data;

    setPageBackgroundColor(backgroundColor);
    setPageTextColor(textColor);
    setPageStaticText(staticSubscribersText);
    setSubGoalText(subGoalNumber);
  };

  const resetStyle = (data: any) => {
    setValue("staticSubscribersText", "SUB GOAL");
    setValue("subGoalNumber", 100);
    setValue("backgroundColor", "#000000");
    setValue("textColor", "#ffffff");

    setPageBackgroundColor("#000000");
    setPageTextColor("#ffffff");
    setPageStaticText("SUB GOAL");
    setSubGoalText(200);
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen w-screen relative"
      style={{ backgroundColor: pageBackgroundColor }}
    >
      {channelInfo && channelInfo.subscriberCount ? (
        <>
          <h1
            className={`text-6xl font-bold`}
            style={{ color: pageTextColor }}
          >{`${channelInfo.subscriberCount}/${subGoalText.toString()}`}</h1>
          <h1
            className={`text-3xl fon-semibold`}
            style={{ color: pageTextColor }}
          >{`${pageStaticText}`}</h1>
        </>
      ) : (
        <>Loading Data</>
      )}

      <AlertDialog>
        <div className="absolute bottom-2 right-2 bg-white text-black text-2xl font-semibold p-4 rounded border-black shadow-xl">
          <AlertDialogTrigger>EDIT PAGE</AlertDialogTrigger>
        </div>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="w-full text-center">
              <AlertDialogTitle>
                <div className="text-4xl font-bold">Edit styles</div>
              </AlertDialogTitle>
              <form
                onChange={handleSubmit(handleFormSubmit)}
                className="my-4 flex justify-center items-center flex-col"
              >
                <>
                  <label
                    className="text-xl self-start text-black"
                    htmlFor="backgroundColor"
                  >
                    BACKGROUND COLOR
                  </label>
                  <input
                    type="color"
                    {...register("backgroundColor")}
                    className="p-1 my-2 h-10 w-full rounded border-[4px] border-gray-900"
                  />
                </>
                <>
                  <label
                    className="text-xl self-start text-black"
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
                    className="text-xl self-start text-black"
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
                <>
                  <label
                    className="text-xl self-start text-black"
                    htmlFor="subGoalNumber"
                  >
                    TEXT BELOW
                  </label>
                  <input
                    type="text"
                    {...register("subGoalNumber")}
                    placeholder="Static Subscribers Text"
                    className="p-2 my-2 h-10  w-full rounded border border-gray-300"
                  />
                </>
              </form>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={resetStyle}>
              RESET STYLE
            </AlertDialogAction>
            <AlertDialogCancel>CLOSE</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SubscribersCount;
