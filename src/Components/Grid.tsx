import React, {useRef, useState, useEffect} from 'react'


export interface Cell{
    alive: boolean;
    counter: number;
  }
  

export type GridData = Array<Array<Cell>>;




interface GridArgs{
    data: GridData;
    frameColSize: number;
    frameRowSize: number;
}


export interface CellId{
    row: number;
    col: number;
}

interface GridProps extends GridArgs{
    leaveFootPrint?: boolean;
    className?: string;
    onCellClick: (cellId: CellId) => void;
}


interface Dictionary<T>{
    [key: string]: T;
}

const GridStyles: Dictionary<string> = {
gridCellStyle:`flex-none h-4  w-4 border-b border-l border-purple-200`,
gridCellAliveStyle: `flex-none h-4 w-4 border-b border-l bg-purple-600 border-purple-100`,
}



const CellHeatStyle = (hit: number):string => {
    if (hit <1) {
        return "bg-white"
    }
    if (hit === 1) {
        return "bg-gray-200"

    }
    if (hit === 2) {
        return "bg-gray-300"

    }
    if (hit < 4) {
        return "bg-gray-400"

    }
    if (hit < 6) {
        return "bg-gray-500"

    }
    if (hit < 8) {
        return "bg-gray-600"

    }
    return "bg-gray-700";
}


const Grid: React.FC<GridProps> = ({ data, frameColSize, frameRowSize, leaveFootPrint=false, onCellClick }) => {
    const gridRef = useRef<HTMLDivElement>(null);
    const [isDrawable, setIsDrawable] = useState<boolean>(false);


    const onMouseDown = (e: MouseEvent) => {
        setIsDrawable(true);
   }
    
    const onMouseUp = (e:MouseEvent) => {
        setIsDrawable(false);
    }

    const onMouseOver = ({ row, col}:{ row: number, col: number }) => {
        if (!isDrawable) {
            return;
        }
        onCellClick({row, col});
    }

    useEffect(() => {
        if (!gridRef.current) {
            return;
        }

        gridRef.current.addEventListener("mousedown", onMouseDown)
        gridRef.current.addEventListener("mouseup", onMouseUp)

        return () => {
            gridRef.current?.removeEventListener("mousedown", onMouseDown);
            gridRef.current?.removeEventListener("mouseup", onMouseUp);
        }
    },[gridRef])



    return (
        <div  ref={gridRef} className="flex flex-col items-center">
            {data.map((rowData, i) => {
                if (i < frameRowSize || i >= data.length - frameRowSize) {
                    return null;
                }
                return <div key={`row-${i}`} className=" flex  flex-nowrap">{rowData.map((cell, j) => {
                    if (j< frameColSize || j >= data[0].length - frameColSize) {
                        return null;
                    }   
                    return <div key={`cell-${i}-${j}`} onMouseEnter={(e) => onMouseOver({ row: i, col: j })} onClick={(e) => { onCellClick({ row: i, col: j }) }} className={(cell?.alive) ? `${leaveFootPrint&&CellHeatStyle(cell.counter)} ${GridStyles['gridCellAliveStyle']}` : `${leaveFootPrint&&CellHeatStyle(cell.counter)} ${GridStyles['gridCellStyle']}`}></div>
                } ) }</div>
            } )}
        </div>
    )
}

export { Grid }
