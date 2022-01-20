import { useGetLatestPostsQuery } from "../../state/reducers/api";
import Post from "./Post";
import { useState } from "react";
import { Channel } from "../../state/interfaces";
export default function LatestPosts() {
  const [channel, setChannel] = useState("Bugs");
  const { data, isLoading, error } = useGetLatestPostsQuery(channel);
  const channels: Channel = {
    Announcements: { icon: "🎉", color: "#FF9900" },
    Bugs: { icon: "🐞", color: "#DBFF00" },
    Suggestions: { icon: "🙏", color: "#0094FF" },
    Changelogs: { icon: "🔑", color: "#FF4D00" },
  };
  return (
    <div className="">
      <div className="block min-w-max m-5 bg-[#F5F5F5] text-center">
        <div>
          {Object.keys(channels).map((c, idx) => (
            <span
              key={idx}
              className={`px-5 text-sm overflow-auto mr-[2vw] py-3 hover:bg-gray-200 hover:cursor-pointer rounded-lg ${
                channel == c && "bg-gray-300"
              }`}
              onClick={() => setChannel(c)}
            >
              {channels[c].icon + " " + c}
            </span>
          ))}
        </div>
      </div>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error.data}</div>}
      {data &&
        data.map((p, idx) => {
          return <Post key={idx} data={p} channel={channel} color={channels[channel].color}  showDivider={false} />;
        })}
    </div>
  );
}