import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {

}


export function Input(props: Props) {
  return (
    <input
      {...props}
      className=" bg-zinc-900 h-12 py-3 px-4 rounded text-sm placeholder:text-zinc-500 text-zinc-300"
    />
  )
}