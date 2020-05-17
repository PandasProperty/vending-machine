import { VENDING_MACHINE_STATES } from "../utils/constants";
import { stateAfterDelivery } from './vending-machine';

const selectProductReducer = (state) => {
    console.log('selectProductReducer')
    if (state.mode !== VENDING_MACHINE_STATES.READING) {
        return ({ ...state });
    }
    let errorMessage = null;
    const selectedProduct = state.products[state.inputProduct];
    if (!selectedProduct) {
        errorMessage = 'Select a valid product number.';
    } else {
        if (selectedProduct.quantity === 0) {
            errorMessage = 'This product is unavailable.';
        }
    }
    if (errorMessage) {
        return ({
            ...state,
            mode: VENDING_MACHINE_STATES.IDLE,
            inputProduct: 0,
            errorMessage: errorMessage
        });
    }
    if (state.userBalance >= selectedProduct.price) {
        return stateAfterDelivery(selectedProduct, state.userBalance, state);
    }
    return ({
        ...state,
        mode: VENDING_MACHINE_STATES.PAYMENT,
        errorMessage: null
    });
};

export default selectProductReducer;
