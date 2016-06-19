import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../app/rootReducer';
import allSagas from '../app/allSagas';

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  ));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../app/rootReducer', () => {
      const nextReducer = rootReducer;
      store.replaceReducer(nextReducer);
    });
  }

  // Run Sagas - needs to be done after the middleware is added to the store
  allSagas.map((_) => sagaMiddleware.run(_));

  return store;
}
