import React from "react";

export const LoadingPlaceholder = () => {
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 w-full inline-block overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:to-transparent before:border-neutral-300 before:via-neutral-300">
      <div className={"w-auto inline-block bg-neutral-200"} />
    </div>
  );
};
