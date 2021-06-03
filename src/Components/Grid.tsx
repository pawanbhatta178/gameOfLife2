import React, {useEffect, useState} from 'react'


interface GridArgs{
    data: Array<Array<number>>;
    frameColSize: number;
    frameRowSize: number;
}

interface GridProps extends GridArgs{
    className?: string;
}

interface arrayToRowsArgs{
    array: Array<number>;
    numOfRows: number;
}


interface Dictionary<T>{
    [key: string]: T;
}

const GridStyles: Dictionary<string> = {
gridCellStyle:`flex-none h-4  w-4 border-b border-l border-opacity-0`,
gridCellAliveStyle :`flex-none h-4 w-4 border-b border-l bg-purple-600 border-opacity-0`
}



const arrayToRows = ({ array, numOfRows }: arrayToRowsArgs) => {
    const returnArrays: Array<Array<number>> = [];
    const rowLength: number = Math.floor(array.length / numOfRows);
    for (let i = 0; i < numOfRows;i++) {
       returnArrays.push(array.splice(i,rowLength));
    }
    return returnArrays;
}



const Grid: React.FC<GridProps> = ({ data, frameColSize, frameRowSize }) => {
    

    return (
        <div className="flex flex-col items-center">
            {data.map((rowData) => <div className=" flex  flex-nowrap">{rowData.map((cell) => <div className={(cell>0)?GridStyles['gridCellAliveStyle']:GridStyles['gridCellStyle']}></div>) }</div>)}
        </div>
    )
}

export { Grid }
