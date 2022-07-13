import React from "react";
import { ContextProvider } from "./Context/ContextProvider";
import Routing from "./Routing";

import styles from "./App.module.scss";

function App() {
  return (
    <div>
      <div className={styles.appContainer}>
        <ContextProvider>
          <Routing />
        </ContextProvider>
      </div>
    </div>
  );
}

export default App;
