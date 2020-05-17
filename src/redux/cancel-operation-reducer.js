import { VENDING_MACHINE_STATES } from "../utils/constants";

const cancelOperationReducer = (state) => ({
    ...state,
    mode: VENDING_MACHINE_STATES.IDLE,
    inputProduct: 0,
    selectedProduct: null,
    errorMessage: null
});

export default cancelOperationReducer;
