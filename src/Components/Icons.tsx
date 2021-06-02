import React from 'react'
import { RiPauseFill, RiPlayFill } from "react-icons/ri";
import { GiResize } from "react-icons/gi";
import {FiRepeat} from "react-icons/fi";
import { GrClear } from "react-icons/gr";

export interface IconProps  {
    name: string;
    className?: string;
}

export const HoverTransition: string = "transition duration-300 ease-out hover:bg-gray-200 dark:hover:bg-gray-700";

export const BaseIconStyle: string = " rounded-full ";

const Icon: React.FC<IconProps> = ({ name, className }) => {
    if (name === "pause") {
        return <RiPauseFill className={`${BaseIconStyle} ${HoverTransition} ${className}`}/>
    }
    if (name === "play") {
        return <RiPlayFill className={`${BaseIconStyle} ${HoverTransition} ${className}`}/>
    }
    if (name === "repeat") {
        return <FiRepeat className={`${BaseIconStyle}  ${HoverTransition} ${className}`}/>
    }
    if (name === "resize") {
        return <GiResize className={`${BaseIconStyle} ${HoverTransition} ${className}`}/>
    }
    if (name === "clear") {
        return <GrClear className={`${BaseIconStyle} ${HoverTransition} ${className}`}/>
    }
    return <></>
}





export { Icon};
