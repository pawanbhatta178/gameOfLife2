import React from 'react'


export enum logoTypes{
    SM,
    MD,
    LG,
}

interface logoProps{
    type?: logoTypes;
    className?: string;
}


const Logo: React.FC<logoProps> = ({ type, className }) => {
    
    if (type === logoTypes.SM) {
        <div className={`font-semibold font-mono text-xl  ${className}`}>John Conway's Game of Life</div>
    }
    return (
        <div className={`font-semibold font-mono text-2xl ${className}`}>John Conway's Game of Life</div>
    )
}

export { Logo }
