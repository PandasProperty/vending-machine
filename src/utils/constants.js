export const VENDING_MACHINE_CONFIG = {
    ROWS: 7,
    COLUMNS: 5,
    TOTAL_ITEMS: 15
};

export const VENDING_MACHINE_STATES = {
    IDLE: 'IDLE',
    READING: 'READING',
    PAYMENT: 'PAYMENT',
    DELIVER: 'DELIVER'
};

export const VENDING_MACHINE_CURRENCY = 'RON';

export const VENDING_MACHINE_MONEY = {
    0: {
        value: 0.5,
        label: '50 bani'
    },
    1: {
        value: 1,
        label: '1 leu'
    },
    2: {
        value: 5,
        label: '5 lei'
    },
    3: {
        value: 10,
        label: '10 lei'
    }
};