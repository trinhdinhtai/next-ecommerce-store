import React from "react"
import Image from "next/image"

const PrevIcon = ({ ...props }) => {
  return (
    <button
      {...props}
      className="absolute left-[-16px] top-1/2 z-10 h-8 w-8 -translate-y-1/2 transform cursor-pointer rounded-full bg-white text-center text-lg text-gray-700 shadow-md"
      aria-hidden="true"
      type="button"
    >
      <Image
        src="/prev-icon.svg"
        width="10"
        height="10"
        alt="Prev Icon"
        className="relative left-[40%]"
      />
    </button>
  )
}

export default PrevIcon
