import React from "react";

import { AppContext } from "./App";

const withContext = (WrappedComponent) => {
  return (props) => {
    return (
      <AppContext.Consumer>
        {({ state, actions }) => {
          return <WrappedComponent {...props} data={state} actions={actions} />;
        }}
      </AppContext.Consumer>
    );
  };
};

export default withContext;
