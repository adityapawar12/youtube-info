import SubscribersCount from "./_components/subscribers-count";

const Home = async () => {
  const apiKey = process.env.NEXT_PUBLIC_YT_API_KEY;
  const channelId = process.env.NEXT_PUBLIC_YT_CHANNEL_ID;

  const ytSubCountAPI = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`
  );

  const ytSubCountAPIData: any = await ytSubCountAPI.json();

  // const ytStatusAPI = await fetch(
  //   `https://www.googleapis.com/youtube/v3/channels?part=liveStream&id=${channelId}&key=${apiKey}`
  // );

  // const ytStatusAPIData: any = await ytStatusAPI.json();

  // console.log("ytStatusAPIData >>> ", ytStatusAPIData.error.errors);

  return (
    <SubscribersCount
      channelInfoInitial={ytSubCountAPIData.items[0].statistics}
    />
  );
};

export default Home;
