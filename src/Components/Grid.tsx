import React from 'react'


interface GridArgs{
    data: Array<Array<number>>;
    frameColSize: number;
    frameRowSize: number;
}


export interface CellId{
    row: number;
    col: number;
}

interface GridProps extends GridArgs{
    className?: string;
    onCellClick: (cellId: CellId) => void;
}




interface Dictionary<T>{
    [key: string]: T;
}

const GridStyles: Dictionary<string> = {
gridCellStyle:`flex-none h-4  w-4 border-b border-l border-purple-200`,
gridCellAliveStyle :`flex-none h-4 w-4 border-b border-l bg-purple-600 border-purple-100`
}



const Grid: React.FC<GridProps> = ({ data, frameColSize, frameRowSize, onCellClick }) => {
    return (
        <div className="flex flex-col items-center">
            {data.map((rowData, i) => <div key={`row-${i}`} className=" flex  flex-nowrap">{rowData.map((cell, j) => <div key={`cell-${i}-${j}`} onClick={(e) => { onCellClick({ row: i, col: j }) }} className={(cell>0)?GridStyles['gridCellAliveStyle']:GridStyles['gridCellStyle']}></div>) }</div>)}
        </div>
    )
}

export { Grid }
