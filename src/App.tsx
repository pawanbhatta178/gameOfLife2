import React from 'react';
import ReactTooltip from "react-tooltip";
import {Icon } from "./Components/Icons";
import { Logo, logoTypes} from "./Components/Logo";
import {Grid } from "./Components/Grid";


const data:Array<Array<number>> = [[0, 1, 1, 1, 1,0,0,1,1,1,1,1, 1,1,2,3, 5,5], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,3,2,4,2,2,25,3,3], [0,1,2,1,2,3,3,2,2,1,2,3,3,3,4,23,23,23]];

function App() {
  return (
    <div className="flex flex-col h-full ">
      <div className="absolute top-0 left-0 right-0 border bg-transparent">
        <Logo type={logoTypes.SM} />
       </div>
      <div className="flex-1 border flex ">
        
        
        <div className=" h-screen w-screen border overflow-scroll py-10 ">
          <Grid data={data} frameColSize={12} frameRowSize={13} />
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
