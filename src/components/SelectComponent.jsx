import React from "react";
export function SelectComponent({ children, ...rest }) {
  return <select {...rest}>{children}</select>;
}
