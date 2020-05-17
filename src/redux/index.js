import { applyMiddleware, createStore, combineReducers } from 'redux';
import logger from 'redux-logger'

import vendingMachineReducer from './vending-machine';

export const reducer = combineReducers({
    vendingMachine: vendingMachineReducer
});

const store = createStore(reducer, applyMiddleware(logger));

export default store;