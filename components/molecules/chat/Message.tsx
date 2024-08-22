import clsx from "clsx";
import Image from "next/image";

interface MessageProps {
  isAuthor?: boolean;
  message: string;
}

const Message = ({ isAuthor = false, message }: MessageProps) => {
  return (
    <div
      className={clsx(
        "flex gap-5 items-center",
        !isAuthor && "flex-row-reverse"
      )}
    >
      <Image
        src="/avatar.jpg"
        width={40}
        height={40}
        alt=""
        className="w-10 h-10"
      />
      <p>{message}</p>
    </div>
  );
};

export default Message;
