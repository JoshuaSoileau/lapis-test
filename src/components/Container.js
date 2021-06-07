import React from "react";
import "twin.macro";

const Container = ({ children, ...rest }) => {
  return (
    <div {...rest} tw="max-w-full md:max-w-md lg:max-w-md lg:max-w-lg mx-auto">
      {children}
    </div>
  );
};

export default Container;
