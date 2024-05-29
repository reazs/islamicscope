import Image from "next/image";
import React from "react";

const BrandName = () => {
  return (
    <>
      <div className="flex flex-col items-center text-xl">
        <Image
          src="/islamicScope.png"
          alt="logo img"
          height={64}
          width={64}
          className=" mask mask-circle"
        />
        <div>
          <span className="text-emerald-500">islamic</span>
          <span className=" text-rose-500">Scope</span>
        </div>
      </div>
    </>
  );
};

export default BrandName;
