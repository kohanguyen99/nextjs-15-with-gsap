"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/headless/Modal";
import { useLenis } from "lenis/react";
import React from "react";

const page = () => {
  const lenis = useLenis();
  return (
    <div>
      <div className="bg-red-200 h-screen"></div>
      <div>
        <button onClick={() => lenis?.stop()}>Stop lenis</button>
      </div>
      <Dialog onOpenChange={(open) => (open ? lenis?.stop() : lenis?.start())}>
        <DialogTrigger>Open Modal</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers. This action cannot
              be undone. This will permanently delete your account and remove
              your data from our servers. This action cannot be undone. This
              will permanently delete your account and remove your data from our
              servers. This action cannot be undone. This will permanently
              delete your account and remove your data from our servers. This
              action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div
        className="bg-yellow-200 h-[200px] overflow-y-auto"
        data-lenis-prevent="true"
      >
        <p className="text-[50px]">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </div>
    </div>
  );
};

export default page;
