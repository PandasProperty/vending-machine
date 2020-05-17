import { keys } from 'lodash';
import { getMachineCapital, generateVendingMachineContent, getMaximumChange } from './products';
import { VENDING_MACHINE_CONFIG } from './constants';

describe('Test utils functions', () => {
    it('Testing generator of vending maching content', () => {
        const content = generateVendingMachineContent();
        expect(keys(content).length).toEqual(
            VENDING_MACHINE_CONFIG.ROWS * VENDING_MACHINE_CONFIG.COLUMNS
        );
    });

    it('1. Testing getMaximumChange', () => {
        const maximumChange = getMaximumChange([
            { id: "0", quantity: 3, value: 5, label: "5 lei" },
            { id: "1", quantity: 4, value: 2, label: "2 lei" },
        ], 11);
        expect(maximumChange.nrOfCoins).toEqual(4);
    });
        
    it('2. Testing getMaximumChange', () => {
        const maximumChange = getMaximumChange([
            { id: "0", quantity: 6, value: 0.5, label: "50 bani" },
            { id: "1", quantity: 4, value: 1, label: "1 leu" },
            { id: "2", quantity: 3, value: 5, label: "5 lei" },
            { id: "3", quantity: 2, value: 10, label: "10 lei" }
        ], 40);
        expect(maximumChange.nrOfCoins).toEqual(13);
    });

    it('3. Testing getMaximumChange', () => {
        const maximumChange = getMaximumChange([
            { id: "0", quantity: 6, value: 0.5, label: "50 bani" },
            { id: "1", quantity: 4, value: 1, label: "1 leu" },
            { id: "2", quantity: 3, value: 5, label: "5 lei" },
            { id: "3", quantity: 2, value: 10, label: "10 lei" }
        ], 8);
        expect(maximumChange.nrOfCoins).toEqual(7);
    });

    it('3. Testing getMaximumChange', () => {
        const maximumChange = getMaximumChange([
            { id: "0", quantity: 6, value: 0.5, label: "50 bani" },
            { id: "1", quantity: 4, value: 1, label: "1 leu" },
            { id: "2", quantity: 3, value: 5, label: "5 lei" },
            { id: "3", quantity: 2, value: 10, label: "10 lei" }
        ], 4);
        expect(maximumChange.nrOfCoins).toEqual(7);
    });

    it('3. Testing getMaximumChange', () => {
        const maximumChange = getMaximumChange([
            { id: "0", quantity: 2, value: 0.5, label: "50 bani" },
            { id: "1", quantity: 4, value: 1, label: "1 leu" },
            { id: "2", quantity: 3, value: 5, label: "5 lei" },
            { id: "3", quantity: 2, value: 10, label: "10 lei" }
        ], 1.7);
        expect(maximumChange.nrOfCoins).toEqual(11);
    });

    it('Testing get machine capital', () => {
        const machineCapital = getMachineCapital([
            { id: "0", quantity: 2, value: 0.5, label: "50 bani" },
            { id: "1", quantity: 4, value: 1, label: "1 leu" },
            { id: "2", quantity: 3, value: 5, label: "5 lei" },
            { id: "3", quantity: 2, value: 10, label: "10 lei" }
        ]);
        expect(machineCapital).toEqual(40);
    });

});
