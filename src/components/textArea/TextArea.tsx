import clsx from "clsx";
import React, { HTMLProps, forwardRef } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

type TextAreaProps = HTMLProps<HTMLTextAreaElement>;

type Props = {
  label: string;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  disabled?: boolean;
} & TextAreaProps;

const TextArea = forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  const { label, error, disabled, className, type, ...rest } = props;

  return (
    <div className="mb-4 md:mr-2 md:mb-0">
      <label
        className="block mb-2 text-sm font-semibold text-neutral-500"
        htmlFor={rest.id}
      >
        {label}
      </label>
      <textarea
        {...rest}
        ref={ref}
        className={clsx(
          "w-full px-3 py-2 text-sm leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline text-zinc-700",
          { "bg-neutral-100 cursor-not-allowed": disabled },
          className
        )}
        disabled={disabled}
      />
      {error && (
        <p className="text-sm italic text-red-500 mt-3" role="alert">
          {error.toString()}
        </p>
      )}
    </div>
  );
});

export default TextArea;
