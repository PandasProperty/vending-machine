import { VENDING_MACHINE_STATES } from "../utils/constants";

const pickItemReducer = (state) => ({
    ...state,
    mode: VENDING_MACHINE_STATES.IDLE,
    inputProduct: 0,
    errorMessage: null
});

export default pickItemReducer;
