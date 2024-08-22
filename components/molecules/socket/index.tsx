"use client";

import { socket } from "@/lib/socket";
import { useEffect, useRef, useState } from "react";
import { useEventListener } from "usehooks-ts";
import Message from "../chat/Message";

interface SocketSampleProps {}

const SocketSample = ({}: SocketSampleProps) => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const inputRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const messageWrapperRef = useRef<HTMLDivElement>(null);
  const [isDisabledUI, setDisabledUI] = useState<boolean>(true);
  const [user, setUser] = useState<{
    id: string;
    user: string;
  } | null>(null);
  const [messages, setMessage] = useState<string[]>([]);
  const handleSendMessage = () => {
    setDisabledUI(true);
    const value = inputRef.current?.value || "";

    if (!value) return;
    socket.emit("enter_message", value);
    setDisabledUI(false);
  };

  const onSubmitUserName = async () => {
    const value = userNameRef.current?.value || "";
    if (!value) return;
    socket.emit("enter_room", value);
  };

  useEffect(() => {
    function onDisconnect() {
      setIsConnected(false);
    }
    const onEnterMessage = (message: string) => {
      if (messageWrapperRef.current) {
        const _message = [...messages];
        _message.push(message);
        setMessage(_message);
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      }
    };

    const onEnterRoom = (user: any) => {
      setUser(user);
      setDisabledUI(false);
    };
    socket.on("enter_room", onEnterRoom);
    socket.on("enter_message", onEnterMessage);

    return () => {
      socket.off("enter_message", onEnterMessage);
      socket.off("enter_room", onEnterRoom);
      socket.off("disconnect", onDisconnect);
    };
  }, [messages]);

  useEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  });

  console.log(userNameRef.current?.value);

  return (
    <>
      {!user && (
        <div className="fixed z-40 w-full h-full bg-black/30 inset-0 flex flex-col">
          <div className="flex-1 flex flex-col w-[400px] mx-auto justify-center">
            <div className="w-full">
              <div className="flex gap-5 items-center">
                <p>Your name:</p>
                <input
                  name="user_name"
                  className="border border-grey-300 flex-1 min-h-[40px]"
                  ref={userNameRef}
                />
              </div>
              <div className="mt-5">
                <button
                  onClick={onSubmitUserName}
                  className="border w-full border-white px-5 py-2.5 bg-white"
                >
                  Submit user name
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="w-full space-y-10">
        <div className="h-[400px] bg-white overflow-y-auto overflow-x-hidden">
          <div ref={messageWrapperRef}>
            {messages.map((item, key) => (
              <Message
                key={key}
                message={item}
                isAuthor={user?.user === userNameRef.current?.value}
              />
            ))}
          </div>
        </div>
        <div className="min-h-[50px] grid grid-cols-12">
          <input
            name="text"
            type="text"
            ref={inputRef}
            className="col-span-10"
            disabled={isDisabledUI}
          />
          <div className="col-span-2 flex items-center justify-center">
            <button
              type="button"
              onClick={handleSendMessage}
              className="bg-white"
              disabled={isDisabledUI}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SocketSample;
