export const productsSelector = state => state.vendingMachine.products;

export const selectedProductSelector =
    state => state.vendingMachine.products[state.vendingMachine.inputProduct];

export const modeSelector = state => state.vendingMachine.mode;

export const inputProductSelector = state => state.vendingMachine.inputProduct;

export const errorMessageSelector = state => state.vendingMachine.errorMessage;

export const userBalanceSelector = state => state.vendingMachine.userBalance;

export const userChangeSelector = state => state.vendingMachine.userChange;

export const machineCapitalSelector = state => state.vendingMachine.machineCapital;
