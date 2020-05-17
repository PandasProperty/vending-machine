import { map } from 'lodash';
import { VENDING_MACHINE_STATES, VENDING_MACHINE_MONEY } from "../utils/constants";
import { stateAfterDelivery } from './vending-machine';

const insertMoneyReducer = (state, { payload: coinId }) => {
    console.log('insertMoneyReducer')
    const userBalance = state.userBalance + VENDING_MACHINE_MONEY[coinId].value;
    const updatedCoins = map(state.coins, (coin) => 
        coin.id === coinId ? ({ ...coin, quantity: coin.quantity + 1 }) : coin
    );
    const machineCapital = state.machineCapital + VENDING_MACHINE_MONEY[coinId].value;

    if (
        state.mode === VENDING_MACHINE_STATES.DELIVER ||
        state.mode !== VENDING_MACHINE_STATES.PAYMENT ||
        userBalance < state.products[state.inputProduct].price
    ) {
        return ({
            ...state,
            userBalance,
            machineCapital,
            coins: updatedCoins
        });
    }

    const selectedProduct = state.products[state.inputProduct];
    const newState = stateAfterDelivery(selectedProduct, userBalance, state);
    newState.coins = updatedCoins;
    newState.machineCapital = machineCapital;
    return newState;
};

export default insertMoneyReducer;
