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
        <div className="flex flex-col  items-center">
            {data.map((rowData) => <div className=" h-6 flex flex-nowrap">{rowData.map((cell) => <div className="flex-none  w-6 border">{ cell}</div>) }</div>)}
        </div>
    )
}

export { Grid }
