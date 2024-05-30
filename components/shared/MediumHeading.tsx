import React from "react";

const MediumHeading = ({ children }: { children: React.ReactNode }) => {
  return (
    <h1 className="text-3xl text-zinc-600 font-josefin-sans font-bold text-center mt-16">
      {children}
    </h1>
  );
};

export default MediumHeading;
