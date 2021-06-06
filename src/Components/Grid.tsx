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
    footPrint?: boolean;
    className?: string;
    onCellClick: (cellId: CellId) => void;
}


interface Dictionary<T>{
    [key: string]: T;
}

const GridStyles: Dictionary<string> = {
gridCellStyle:`flex-none h-4  w-4 border-b border-l border-purple-200`,
gridCellAliveStyle: `flex-none h-4 w-4 border-b border-l bg-purple-700 border-purple-100`,
}



const CellHeatStyle = (hit: number):string => {
    if (hit <1) {
        return "bg-white"
    }
    if (hit === 1) {
        return "bg-purple-50"

    }
    if (hit === 2) {
        return "bg-purple-100"

    }
    if (hit < 4) {
        return "bg-purple-200"

    }
    if (hit < 6) {
        return "bg-purple-300"

    }
    if (hit > 8) {
        return "bg-purple-400"

    }
    return "bg-purple-400";
}


const Grid: React.FC<GridProps> = ({ data, frameColSize, frameRowSize, footPrint=false, onCellClick }) => {
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
                    return <div key={`cell-${i}-${j}`} onMouseEnter={(e) => onMouseOver({ row: i, col: j })} onClick={(e) => { onCellClick({ row: i, col: j }) }} className={(cell?.alive) ? `${footPrint&&CellHeatStyle(cell.counter)} ${GridStyles['gridCellAliveStyle']}` : `${footPrint&&CellHeatStyle(cell.counter)} ${GridStyles['gridCellStyle']}`}></div>
                } ) }</div>
            } )}
        </div>
    )
}

export { Grid }
