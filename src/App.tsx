import React, { useReducer, useState, useEffect } from 'react';
import ReactTooltip from "react-tooltip";
import {Icon } from "./Components/Icons";
import { Logo, logoTypes} from "./Components/Logo";
import {Grid, CellId, Cell, GridData } from "./Components/Grid";
import * as _ from "lodash";


const createCell=({alive=false,counter=0}:{alive?:boolean, counter?:number}):Cell=> {
  return { alive, counter };
}


type Action =
   | { type: 'toggle_cell', col: number, row: number }
  | { type: 'next_generation' }
  | {type:'next_generation_weighted'}
   | {type:"alter_grid", col:number, row:number}
   | {type:"clear_grid"}


  const numOfAliveNeighbors = ({array, i, j}:{array:GridData,i:number, j:number}):number => {
    let neighbor1 = array[i - 1][j - 1];
    let neighbor2 = array[i - 1][j];
    let neighbor3 = array[i - 1][j + 1];
    let neighbor4 = array[i][j - 1];
    let neighbor5 = array[i][j + 1];
    let neighbor6 = array[i + 1][j - 1];
    let neighbor7 = array[i + 1][j];
    let neighbor8 =array[i + 1][j + 1];
  
    let aliveNeighbors: number = 0;
  
    if (neighbor1?.alive ) {
      aliveNeighbors++;
    }
    if (neighbor2?.alive) {
      aliveNeighbors++;
    }
    if (neighbor3?.alive) {
      aliveNeighbors++;
    }
    if (neighbor4?.alive) {
      aliveNeighbors++;
    }
    if (neighbor5?.alive) {
      aliveNeighbors++;
    }
    if (neighbor6?.alive) {
      aliveNeighbors++;
    }
    if (neighbor7?.alive) {
      aliveNeighbors++;
    }
    if (neighbor8?.alive) {
      aliveNeighbors++;
    }
    return aliveNeighbors;
  }


const gridReducer = (state: GridData, action: Action): GridData=> {
  switch (action.type) {
    case "toggle_cell":
      const newState = [...state];
      newState[action.row][action.col].alive = !newState[action.row][action.col].alive;
      if (newState[action.row][action.col].alive) {
        newState[action.row][action.col].counter++;
      }
      return newState;
     
    case "next_generation":
      const nextState = _.cloneDeep(state);
      state.forEach((rowItem, i) => {
        if (i === 0||i===state.length-1) {
          return; 
        }
        rowItem.forEach((cell, j) => {
          if (j === 0||j===state[0].length-1) {
            return; 
          }
          const aliveNeighbors = numOfAliveNeighbors({ array: state, i, j });

          //born logic
          if (!cell.alive) {
            if (aliveNeighbors === 3) { //birth
              nextState[i][j].alive = true;
              nextState[i][j].counter++;
            }
          }

          //dying logic
          if (aliveNeighbors < 2 || aliveNeighbors > 3) {
            nextState[i][j].alive = false;
          }
        })
      })
      return nextState;
  
    case "clear_grid":
      const newClearedGrid = initializeGridArray({ numCols: state[0].length, numRows: state.length });
      return newClearedGrid;
    
    case "alter_grid":
      const newAlteredGrid = initializeGridArray({ numCols: action.col, numRows: action.row });
      return newAlteredGrid;
    default:
      return state;
  }
}

const initializeGridArray = ({ numCols, numRows }: { numCols: number, numRows: number }): GridData => {
  const returnVal: GridData = [];
  for (let i = 0; i < numRows; i++){
    let array = [];
    for (let j = 0; j < numCols; j++){
      array.push(createCell({}))
    }
    returnVal.push(array);
  }
  return returnVal;
}


function App() {
  const [numCols, setNumCols] = useState<number>(50);
  const [numRows, setNumRows] = useState<number>(50);
  const [frameSize] = useState<number>(3);
  const [data, dispatch] = useReducer(gridReducer,initializeGridArray({numCols, numRows}));
  const [isGameOn, setIsGameOn] = useState<boolean>(false);
  const [playSpeed, setPlaySpeed] = useState<number>(3);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [isFootPrintOn, setIsFootPrintOn] = useState<boolean>(false);


  useEffect(() => {
    if (isFullScreen) {
      setNumCols(80);
      setNumRows(60);
    }
    else {
      setNumCols(48);
      setNumRows(52);
    }
  }, [isFullScreen])


  useEffect(() => {
      dispatch({type:"alter_grid",col:numCols, row:numRows});
  }, [numCols, numRows])


  useEffect(() => {
    if (!isGameOn) {
      return;
    }
  
    const interval = setInterval(() => {
      dispatch({ type: "next_generation" });
    }, 1000/playSpeed);

    return () => {
      clearInterval(interval);
    }
  }, [isGameOn, playSpeed])


  const onCellClick = ({ row, col }: CellId) => {
  
    dispatch({ type: "toggle_cell", row, col });
  }
  
  const getNextGeneration = () => {
    dispatch({ type: "next_generation" });
  }

  const clearGrid = () => {
    if (window.confirm("Are you sure you want to proceed? All the progress will reset.")) {
      dispatch({ type: "clear_grid" });
    }
  }

  const toggleGame = () => {
    setIsGameOn(currentVal => !currentVal);
  }

  const onPlaySpeedChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setPlaySpeed(Number(e.currentTarget.value));
   }

  const alterGridSize = () => {
    if (window.confirm("Are you sure you want to resize grid? There might be performance issue on the larger grid.")) {
      setIsFullScreen((current) => !current);
    }
  }
  
  const onFootPrintToggle = (e:React.FormEvent<HTMLInputElement>) => {
    setIsFootPrintOn(current => !current);
  }

  return (
    <div className="flex flex-col h-full ">
      <div className="absolute top-0 left-0 right-0 bg-purple-100 shadow-sm">
        <Logo type={logoTypes.SM} />
       </div>
      <div className="flex-1 border flex ">
         <div className=" h-screen w-screen border overflow-scroll py-10 ">
          <Grid data={data} frameColSize={frameSize} frameRowSize={frameSize} onCellClick={onCellClick} footPrint={ isFootPrintOn}/>
           </div>
        </div>
      <div className="absolute bg-purple-100 shadow-sm bottom-0  m-0 left-0 right-0 ">
        <div className="flex justify-around my-2">
          <button onClick={toggleGame} data-tip data-for="playTip"> {isGameOn?<Icon name={"pause"}/>:< Icon name={"play"} />} </button>
          <button onClick={getNextGeneration} data-tip data-for="nextGenTip"><Icon name="repeat" /></button>
          <button onClick={clearGrid} data-tip data-for="clearTip"><Icon name="clear" /></button>
          <button onClick={alterGridSize} data-tip data-for="alterGridTip">{isFullScreen ? <Icon name="minimize" data-tip data-for="alterGridTip" /> : <Icon name="maximize" data-tip data-for="alterGridTip" />} </button>
          <select name="playSpeed" onChange={onPlaySpeedChange}  value={playSpeed} >
            <option value={1}>1x</option>
            <option value={2}>2x</option>
            <option value={3}>3x</option>
            <option value={4}>4x</option>
            <option value={5}>5x</option>
          </select>

            <label className="flex items-center space-x-1">
            <input onChange={onFootPrintToggle} className="pl-2" type="checkbox" checked={isFootPrintOn} />
             <span>Footprint</span>
             </label>
          <ReactTooltip id="clearTip" place="top" effect="solid">
           Wipes out all the living cells
          </ReactTooltip>
          <ReactTooltip id="nextGenTip" place="top" effect="solid">
           Next Generation
          </ReactTooltip>
          <ReactTooltip id="playTip" place="top" effect="solid">
           Start/Pause
          </ReactTooltip>
            <ReactTooltip id="alterGridTip" place="top" effect="solid">
            Minimize/Maximize
          </ReactTooltip>
        </div>
      </div>
    </div>
  );
}

export default App;
