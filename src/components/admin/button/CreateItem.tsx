import React, { ReactNode } from 'react'

type Props = {
  onClick ?: ()=>void;
  type?: "submit" | "button";
  className ?: string;
  nameBtn ?: string;
  children ?: ReactNode
}

export const CreateItem = (props: Props) => {
  return (
    <button className="btn-create" onClick={props.onClick}>
      {props?.nameBtn}
      {props?.children}
    </button>
  )
}