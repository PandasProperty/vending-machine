import { getMachineCapital, getMaximumChange, getCoinsDescription } from '../utils/products';

const getAvailableBalanceReducer = (state) => {
    if (!state.machineCapital) {
        return ({
            ...state,
            errorMessage: `The machine doesn't have capital available.`
        });
    }
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

export default getAvailableBalanceReducer;
