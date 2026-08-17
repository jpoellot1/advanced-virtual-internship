import React from "react";

interface SkeletonProps {
    width?: string | number;
    height?: string | number;
    borderRadius?: string | number;
    children?: React.ReactNode;
    className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ width , height, borderRadius, className="" }) => {
  return (
    <div
      className={`skeleton-box ${className}`.trim()}
      style={{
        width,
        height,
        borderRadius,
      }}
    ></div>
  );
};

export default Skeleton;