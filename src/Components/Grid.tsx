import React, {useRef, useState, useEffect} from 'react'


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
                    return <div key={`cell-${i}-${j}`} onMouseEnter={(e) => onMouseOver({ row:i, col:j })} onClick={(e) => { onCellClick({ row: i, col: j }) }} className={(cell > 0) ? GridStyles['gridCellAliveStyle'] : GridStyles['gridCellStyle']}></div>
                } ) }</div>
            } )}
        </div>
    )
}

export { Grid }
