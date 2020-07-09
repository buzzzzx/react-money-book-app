import React from "react";

import { AppContext } from "./App";

const withContext = (WrappedComponent) => {
  const newComponent = (props) => {
    return (
      <AppContext.Consumer>
        {({ state, actions }) => {
          return <WrappedComponent {...props} data={state} actions={actions} />;
        }}
      </AppContext.Consumer>
    );
  };
  return newComponent;
};

export default withContext;
