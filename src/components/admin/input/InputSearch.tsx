import React, { RefObject } from "react";

type Props = {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  onChangeText?(value: string): void;
  autoFocus?: boolean;
  value?: any;
  ref?: RefObject<HTMLInputElement>;
};

const InputSearch = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  return (
    <input
      placeholder={props.placeholder ?? props.label}
      type={props.type}
      name={props.name}
      id={props.type}
      autoComplete="off"
      autoFocus={props.autoFocus}
      value={props.value}
      ref={ref}
      {...(!!props.onChangeText && {
        onChange: (event) => props.onChangeText?.(event?.target?.value),
      })}
    />
  );
});

export default InputSearch;