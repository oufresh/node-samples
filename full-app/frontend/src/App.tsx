import React from "react";
import "./App.css";
import { UserInfo } from "./UserInfo";
import { ElementsInfo } from "./ElementsInfo";
const App: React.FC = () => {
  return (
    <div className="App">
      {/*<ElementsInfo />*/}
      <UserInfo />
    </div>
  );
};

export default App;
