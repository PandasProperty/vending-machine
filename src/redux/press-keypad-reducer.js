import { VENDING_MACHINE_STATES } from "../utils/constants";

const pressKeypadReducer = (state, { payload: key }) => {
    const inputProduct = (state.mode === VENDING_MACHINE_STATES.READING)
        ? state.inputProduct * 10 + key
        : key;
    return ({
        ...state,
        mode: VENDING_MACHINE_STATES.READING,
        inputProduct,
        errorMessage: null
    });
};

export default pressKeypadReducer;
