import React, {useReducer} from 'react';
import ReactTooltip from "react-tooltip";
import {Icon } from "./Components/Icons";
import { Logo, logoTypes} from "./Components/Logo";
import {Grid, CellId } from "./Components/Grid";


type Action =
   | { type: 'toggle_cell', col: number, row: number }
   | { type: 'next_generation' }
   | {type:"alter_grid", col:number, row:number}
   | {type:"clear_grid"}

 


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
  
    default:
      return state;
  }
}




function App() {

  const [data, dispatch] = useReducer(gridReducer,[[0, 1, 1, 1, 1,0,0,1,1,1,1,1, 1,1,2,3, 5,5], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,3,2,4,2,2,25,3,3], [0,1,2,1,2,3,3,2,2,1,2,3,3,3,4,23,23,23]]);

  const onCellClick = ({ row, col }: CellId) => {
    dispatch({ type: "toggle_cell", row, col });
  }

  return (
    <div className="flex flex-col h-full ">
      <div className="absolute top-0 left-0 right-0 border bg-transparent">
        <Logo type={logoTypes.SM} />
       </div>
      <div className="flex-1 border flex ">
        
        
        <div className=" h-screen w-screen border overflow-scroll py-10 ">
          <Grid data={data} frameColSize={12} frameRowSize={13} onCellClick={onCellClick} />
        </div>
   </div>
      <div className="absolute bg-transparent bottom-0 border m-0 left-0 right-0 ">
        <div className="flex justify-around my-2">
        <button  data-tip data-for="playTip"> < Icon name={ "play"} /> </button>
          <button data-tip data-for="nextGenTip"><Icon name="repeat" /></button>
          <button data-tip data-for="clearTip"><Icon name="clear" /></button>
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
