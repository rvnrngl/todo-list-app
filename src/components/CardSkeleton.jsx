import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const CardSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((item, index) => (
      <div key={index} className="flex w-full overflow-hidden my-2 rounded-xl">
        <Skeleton
          width={500}
          height={50}
          borderRadius={0}
          baseColor="#e4e4e7"
        />
      </div>
    ));
};
