import { map, keys } from 'lodash';
import { createAction, handleActions } from 'redux-actions';
import { getMachineCapital, generateVendingMachineContent, getMaximumChange, getCoinsDescription } from '../utils/products';
import { VENDING_MACHINE_STATES, VENDING_MACHINE_MONEY } from '../utils/constants';

export const ACTION_ENTER_INPUT = 'ACTION_ENTER_INPUT';
export const ACTION_CANCEL_INPUT = 'ACTION_CANCEL_INPUT';
export const ACTION_INPUT_MONEY = 'ACTION_INPUT_MONEY';
export const ACTION_COLLECT = 'ACTION_COLLECT';
export const ACTION_GET_AVAILABLE_BALANCE = 'ACTION_GET_AVAILABLE_BALANCE';

const products = generateVendingMachineContent();

const defaultState = {
    coins: map(keys(VENDING_MACHINE_MONEY), coindId => ({
        id: coindId,
        quantity: 10,
        ...VENDING_MACHINE_MONEY[coindId]
    })),
    products,
    state: VENDING_MACHINE_STATES.IDLE,
    machineCapital: 0,
    selectedProduct: null,
    userBalance: 0,
    userChange: null
};

export const enterInputAction = createAction(ACTION_ENTER_INPUT);
export const cancelInputAction = createAction(ACTION_CANCEL_INPUT);
export const inputMoneyAction = createAction(ACTION_INPUT_MONEY);
export const collectAction = createAction(ACTION_COLLECT);
export const getAvailableBalance = createAction(ACTION_GET_AVAILABLE_BALANCE);

export const enterInputReducer = (state, { payload }) => {
    const selectedProduct = state.products[payload];
    if (state.userBalance >= selectedProduct.price) {
        return stateAfterDelivery(selectedProduct, state.userBalance, state);
    }
    return {
        ...state,
        state: VENDING_MACHINE_STATES.PAYMENT,
        selectedProduct,
    };
};

export const cancelInputReducer = (state) => ({
    ...state,
    state: VENDING_MACHINE_STATES.IDLE,
    selectedProduct: null,
});

export const inputMoneyReducer = (state, { payload: coinId }) => {
    const { selectedProduct } = state;
    const userBalance = state.userBalance + VENDING_MACHINE_MONEY[coinId].value;
    const updatedCoins = map(state.coins, (coin) => 
        coin.id === coinId ? ({ ...coin, quantity: coin.quantity + 1 }) : coin
    );
    let newState;
    if (userBalance < selectedProduct.price) {
        newState = {
            ...state,
            userBalance,
            state: VENDING_MACHINE_STATES.PAYMENT
        };
    } else {
        newState = stateAfterDelivery(selectedProduct, userBalance, state);
    }
    newState.coins = updatedCoins;
    newState.machineCapital = VENDING_MACHINE_MONEY[coinId].value; 
    return newState;
};

export const collectActionReducer = (state) => ({
    ...state,
    state: VENDING_MACHINE_STATES.IDLE,
    revenueDescription: null,
    userChange: null
});

export const getAvailableBalanceReducer = (state) => {
    const changeObj = getMaximumChange(state.coins, state.userBalance);
    const remainingCoins = changeObj.coins;
    const oldCapital = getMachineCapital(state.coins);
    const remainingCapital = getMachineCapital(remainingCoins);
    const userChange = oldCapital - remainingCapital;

    return {
        ...state,
        userBalance: state.userBalance - userChange,
        userChange: {
            value: userChange,
            split: getCoinsDescription(state.coins, remainingCoins),
            success: changeObj.nrOfCoins
        },
        coins: remainingCoins,
        machineCapital: remainingCapital
    };
};

const stateAfterDelivery = (selectedProduct, userBalance, state) => ({
    ...state,
    products: {
        ...state.products,
        [selectedProduct.id]: {
            ...selectedProduct,
            quantity: selectedProduct.quantity - 1
        }
    },
    selectedProduct: {
        ...selectedProduct,
        quantity: selectedProduct.quantity - 1
    },
    userBalance: userBalance - selectedProduct.price,
    state: VENDING_MACHINE_STATES.DELIVER
});

const reducer = handleActions(
    {
        [enterInputAction]: enterInputReducer,
        [cancelInputAction]: cancelInputReducer,
        [inputMoneyAction]: inputMoneyReducer,
        [collectAction]: collectActionReducer,
        [getAvailableBalance]: getAvailableBalanceReducer
    },
    defaultState
);

export default reducer;