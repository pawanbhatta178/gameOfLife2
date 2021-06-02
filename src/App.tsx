import React from 'react';
import ReactTooltip from "react-tooltip";
import {Icon } from "./Components/Icons";

function App() {
  return (
    <div className="flex flex-col h-full ">
      <div className="border bg-transparent">Hey</div>
      <div className="flex-1 border">grid</div>
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
