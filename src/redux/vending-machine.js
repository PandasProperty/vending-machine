import { map, keys } from 'lodash';
import { createAction, handleActions } from 'redux-actions';
import { generateVendingMachineContent } from '../utils/products';
import { VENDING_MACHINE_STATES, VENDING_MACHINE_MONEY } from '../utils/constants';
import pressKeypadReducer from './press-keypad-reducer';
import cancelOperationReducer from './cancel-operation-reducer';
import selectProductReducer from './select-product-reducer';
import insertMoneyReducer from './insert-money-reducer';
import pickItemReducer from './pick-item-reducer';
import getAvailableBalanceReducer from './get-available-balance-reducer';
import collectChangeReducer from './collect-change-reducer';

export const ACTION_PRESS_KEYPAD = 'ACTION_PRESS_KEYPAD';
export const ACTION_PRESS_CANCEL = 'ACTION_PRESS_CANCEL';
export const ACTION_PRESS_ENTER = 'ACTION_PRESS_ENTER';
export const ACTION_INSERT_MONEY = 'ACTION_INSERT_MONEY';
export const ACTION_PICK_ITEM = 'ACTION_PICK_ITEM';
export const ACTION_GET_AVAILABLE_BALANCE = 'ACTION_GET_AVAILABLE_BALANCE';
export const ACTION_COLLECT_CHANGE = 'ACTION_COLLECT_CHANGE';

const products = generateVendingMachineContent();

const defaultState = {
    coins: map(keys(VENDING_MACHINE_MONEY), coindId => ({
        id: coindId,
        quantity: 10,
        ...VENDING_MACHINE_MONEY[coindId]
    })),
    products,
    mode: VENDING_MACHINE_STATES.IDLE,
    inputProduct: 0,
    machineCapital: 0,
    userBalance: 0,
    userChange: null,
    errorMessage: null
};

export const actionPressKeypad = createAction(ACTION_PRESS_KEYPAD);
export const actionCancelOperation = createAction(ACTION_PRESS_CANCEL);
export const actionSelectProduct = createAction(ACTION_PRESS_ENTER);
export const actionInsertMoney = createAction(ACTION_INSERT_MONEY);
export const actionPickItem = createAction(ACTION_PICK_ITEM);
export const actionGetAvailableBalance = createAction(ACTION_GET_AVAILABLE_BALANCE);
export const actionCollectChange = createAction(ACTION_COLLECT_CHANGE);

export const stateAfterDelivery = (selectedProduct, userBalance, state) => ({
    ...state,
    products: {
        ...state.products,
        [selectedProduct.id]: {
            ...selectedProduct,
            quantity: selectedProduct.quantity - 1
        }
    },
    userBalance: userBalance - selectedProduct.price,
    mode: VENDING_MACHINE_STATES.DELIVER
});

const reducer = handleActions(
    {
        [actionPressKeypad]: pressKeypadReducer,
        [actionCancelOperation]: cancelOperationReducer,
        [actionSelectProduct]: selectProductReducer,
        [actionInsertMoney]: insertMoneyReducer,
        [actionPickItem]: pickItemReducer,
        [actionGetAvailableBalance]: getAvailableBalanceReducer,
        [actionCollectChange]: collectChangeReducer
    },
    defaultState
);

export default reducer;