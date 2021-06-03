import React, { useReducer, useState, useEffect } from 'react';
import ReactTooltip from "react-tooltip";
import {Icon } from "./Components/Icons";
import { Logo, logoTypes} from "./Components/Logo";
import {Grid, CellId } from "./Components/Grid";
import * as _ from "lodash";

type Action =
   | { type: 'toggle_cell', col: number, row: number }
   | { type: 'next_generation' }
   | {type:"alter_grid", col:number, row:number}
   | {type:"clear_grid"}


  const numOfAliveNeighbors = ({array, i, j}:{array:Array<Array<number>>,i:number, j:number}):number => {
    let neighbor1 = array[i - 1][j - 1];
    let neighbor2 = array[i - 1][j];
    let neighbor3 = array[i - 1][j + 1];
    let neighbor4 = array[i][j - 1];
    let neighbor5 = array[i][j + 1];
    let neighbor6 = array[i + 1][j - 1];
    let neighbor7 = array[i + 1][j];
    let neighbor8 =array[i + 1][j + 1];
  
    let aliveNeighbors: number = 0;
  
    if (neighbor1 !== 0) {
      aliveNeighbors++;
    }
    if (neighbor2 !== 0) {
      aliveNeighbors++;
    }
    if (neighbor3 !== 0) {
      aliveNeighbors++;
    }
    if (neighbor4 !== 0) {
      aliveNeighbors++;
    }
    if (neighbor5 !== 0) {
      aliveNeighbors++;
    }
    if (neighbor6 !== 0) {
      aliveNeighbors++;
    }
    if (neighbor7 !== 0) {
      aliveNeighbors++;
    }
    if (neighbor8 !== 0) {
      aliveNeighbors++;
    }
    return aliveNeighbors;
  }


const gridReducer = (state: Array<Array<number>>, action: Action): Array<Array<number>> => {
  switch (action.type) {
    case "toggle_cell":
      const newState = [...state];
      if (newState[action.row][action.col] === 0) {
        newState[action.row][action.col] = 1;
      }
      else {
        newState[action.row][action.col] = 0;
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
          if (cell === 0) {
            if (aliveNeighbors === 3) { //birth
              nextState[i][j]++;
            }
          }

          //dying logic
          if (aliveNeighbors < 2 || aliveNeighbors > 3) {
            nextState[i][j] = 0;
          }
        })
      })
      return nextState;
    
    case "clear_grid":
      const newClearedGrid = initializeGridArray({ numCols: state[0].length, numRows: state.length });
      return newClearedGrid;
    
    default:
      return state;
  }
}

const initializeGridArray = ({ numCols, numRows }: { numCols: number, numRows: number }): Array<Array<number>> => {
  const returnVal: Array<Array<number>> = [];
  for (let i = 0; i < numRows; i++){
    returnVal.push(new Array(numCols).fill(0));
  }
  return returnVal;
}


function App() {
  const [numCols, setNumCols] = useState<number>(50);
  const [numRows, setNumRows] = useState<number>(50);
  const [frameSize, setFrameSize] = useState<number>(3);
  const [data, dispatch] = useReducer(gridReducer,initializeGridArray({numCols, numRows}));
  const [isGameOn, setIsGameOn] = useState<boolean>(false);
  const [playSpeed, setPlaySpeed] = useState<number>(1);
  
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

 

  return (
    <div className="flex flex-col h-full ">
      <div className="absolute top-0 left-0 right-0 border bg-transparent">
        <Logo type={logoTypes.SM} />
       </div>
      <div className="flex-1 border flex ">
         <div className=" h-screen w-screen border overflow-scroll py-10 ">
             <Grid data={data} frameColSize={frameSize} frameRowSize={frameSize} onCellClick={onCellClick} />
           </div>
        </div>
      <div className="absolute bg-transparent bottom-0 border m-0 left-0 right-0 ">
        <div className="flex justify-around my-2">
          <button onClick={toggleGame} data-tip data-for="playTip"> {isGameOn?<Icon name={"pause"}/>:< Icon name={"play"} />} </button>
          <button onClick={getNextGeneration} data-tip data-for="nextGenTip"><Icon name="repeat" /></button>
          <button onClick={clearGrid} data-tip data-for="clearTip"><Icon name="clear" /></button>
          <ReactTooltip id="clearTip" place="top" effect="solid">
           Wipes out all the living cells
          </ReactTooltip>
          <ReactTooltip id="nextGenTip" place="top" effect="solid">
           Next Generation
          </ReactTooltip>
          <ReactTooltip id="playTip" place="top" effect="solid">
           Start/Pause
          </ReactTooltip>
          <ReactTooltip id="changeGridTip" place="top" effect="solid">
           Alter Grid
          </ReactTooltip>
        </div>
      </div>
    </div>
  );
}

export default App;
