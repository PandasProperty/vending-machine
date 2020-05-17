
import { random, reduce, map, find } from 'lodash';
import {
    faHamburger,
    faPizzaSlice,
    faEgg,
    faCheese,
    faBreadSlice,
    faBacon,
    faHotdog,
    faIceCream,
    faFish,
    faCookie,
    faCandyCane,
    faCarrot,
    faLemon,
    faAppleAlt,
    faGlassWhiskey,
    faGlassMartini,
    faWineBottle,
    faBeer,
    faCoffee,
    faMugHot
} from '@fortawesome/free-solid-svg-icons';
import { VENDING_MACHINE_CONFIG } from './constants';

const colors = ['green', 'yellow', 'red', 'blue', 'purple', 'orange'];

const availableProducts = [{
    icon: faHamburger,
    name: 'Hamburger',
    price: 15
}, {
    icon: faPizzaSlice,
    name: 'Pizza',
    price: 15
}, {
    icon: faEgg,
    name: 'Kinder Egg',
    price: 5
}, {
    icon: faCheese,
    name: 'Cheese',
    price: 15
}, {
    icon: faBreadSlice,
    name: 'Toast',
    price: 2
}, {
    icon: faBacon,
    name: 'Bacon',
    price: 5
}, {
    icon: faHotdog,
    name: 'Hotdog',
    price: 7
}, {
    icon: faIceCream,
    name: 'Ice Cream',
    price: 5
}, {
    icon: faFish,
    name: 'Fish Chips',
    price: 15
}, {
    icon: faCookie,
    name: 'Cookie',
    price: 5
}, {
    icon: faCandyCane,
    name: 'Candy',
    price: 3
}, {
    icon: faCarrot,
    name: 'Carrot',
    price: 2
}, {
    icon: faLemon,
    name: 'Lemon',
    price: 3
}, {
    icon: faAppleAlt,
    name: 'Apple',
    price: 3
}, {
    icon: faGlassWhiskey,
    name: 'Whiskey',
    price: 20
}, {
    icon: faGlassMartini,
    name: 'Martini',
    price: 20
}, {
    icon: faWineBottle,
    name: 'Wine Bottle',
    price: 35
}, {
    icon: faBeer,
    name: 'Beer',
    price: 10
}, {
    icon: faCoffee,
    name: 'Coffee',
    price: 5
}, {
    icon: faMugHot,
    name: 'Hot Chocolate',
    price: 5
}];

export const generateVendingMachineContent = () => {
    const vendingMachineProducts = {};
    for (let rowIndex = 0; rowIndex < VENDING_MACHINE_CONFIG.ROWS; rowIndex++) {
        for (let columnIndex = 0; columnIndex < VENDING_MACHINE_CONFIG.COLUMNS; columnIndex++) {
            const productIndex = random(0, availableProducts.length - 1);
            const productId = rowIndex * VENDING_MACHINE_CONFIG.COLUMNS + columnIndex;
            vendingMachineProducts[productId] = {
                id: productId,
                ...availableProducts[productIndex],
                color: colors[random(0, colors.length - 1)],
                quantity: random(1, VENDING_MACHINE_CONFIG.TOTAL_ITEMS)
            };
        };
    };
    return vendingMachineProducts;
};

const computeCoins = (coins, length, ammount, max) => {
    if (!ammount) {
        return {
            coins,
            nrOfCoins: 0
        };
    }
    let rest = {
        coins,
        nrOfCoins: max
    };
    for (let i=0; i<length; i++) {
        if (coins[i].value <= ammount && coins[i].quantity > 0) {
            
            const newCoins = map(coins, coin => ({
                ...coin,
                quantity: coin.id === coins[i].id ? coin.quantity - 1 : coin.quantity
            }));

            let subRest = computeCoins(newCoins, length, ammount - coins[i].value, max);

            if (subRest.nrOfCoins !== max && subRest.nrOfCoins + 1 < rest.nrOfCoins) {
                rest = {
                    ...subRest,
                    nrOfCoins: subRest.nrOfCoins + 1
                };
                break;
            }
        }
    }
    return rest;
};

export const getMaximumChange = (coins, ammount) => {
    let max = 0;
    map(coins, coin => max += coin.quantity);
    return computeCoins(coins, coins.length, ammount, max);
};

export const getMachineCapital = (coins) => (
    reduce(coins, (sum, coin) => sum + coin.quantity * coin.value, 0)
);

export const getCoinsDescription = (oldCoins, newCoins) => {
    const description = [];
    map(oldCoins, oldCoin => {
        const newCoin = find(newCoins, newCoin => oldCoin.id === newCoin.id);
        description.push({
            ...newCoin,
            quantity: oldCoin.quantity - newCoin.quantity
        })
    });
    return description;
};
