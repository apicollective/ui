// @flow

// Put global manual declarations here

// For hot module loading - configureStore
declare var module: {
  hot: {
    accept(path: ?string, callback:() => void) : void;
  }
};
