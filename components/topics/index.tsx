import Image from "next/image";
import { getTopis } from "@/api/api";

interface Topic {
  id: string;
  title: string;
  cover_photo: {
    urls: {
      thumb: string;
    };
  };
}
const Topics = async () => {
  const topics: Topic[] = await getTopis();
  console.log("topics", topics);
  return (
    <div className="flex flex-row items-center gap-1 w-full whitespace-nowrap  overflow-x-auto no-scrollbar ">
      {topics.map((topic) => (
        <div
          key={topic.id}
          className="h-10 cursor-pointer items-center gap-2 rounded-full bg-muted p-1 text-neutral-900 flex flex-row  border-1 border-neutral-200 "
        >
          <Image
            src={topic?.cover_photo?.urls?.thumb}
            alt={topic?.title}
            width={32}
            height={32}
            className="h-8 w-8 flex-shrink-0 rounded-full object-cover"
          />
          <div className="text-sm">{topic?.title}</div>
        </div>
      ))}
    </div>
  );
};

export default Topics;
