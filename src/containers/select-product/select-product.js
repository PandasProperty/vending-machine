import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import bemHelper from 'react-bem-helper';
import Keypad from '../../components/keypad';
import Display from '../../components/display';
import Error from '../../components/error';
import { enterInputAction, cancelInputAction } from '../../redux/vending-machine';
import { VENDING_MACHINE_STATES, VENDING_MACHINE_CURRENCY } from '../../utils/constants';

require('./select-product.scss');

const bem = bemHelper('select-product');

const SelectProduct = () => {
    const products = useSelector(state => state.vendingMachine.products);
    const vendingMachineState = useSelector(state => state.vendingMachine.state);
    const selectedProduct = useSelector(state => state.vendingMachine.selectedProduct);
    
    const dispatch = useDispatch();

    const [input, setInput] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setInput(null);
    }, [selectedProduct]);
    
    const handleOnPressKey = (value) => setInput(input * 10 + value);

    const handleError = (message) => {
        setError(message);
        setInput(null);
        setTimeout(() => {
            setError(null);
        }, 2000);
    };

    const handleOnPressEnter = () => {
        if (!products[input]) {
            handleError('Select a valid product number.');
            return;
        }
        const selectedProduct = products[input];
        if (selectedProduct.quantity === 0) {
            handleError('This product is unavailable.');
            return;
        }
        dispatch(enterInputAction(input));
    };

    const handleOnPressCancel = () => {
        setInput(null);
        dispatch(cancelInputAction());
    };

    let displayMessage = '';
    let displayValue = '';
    let displayPrice = false;

    switch (vendingMachineState) {
        case VENDING_MACHINE_STATES.IDLE:
        case VENDING_MACHINE_STATES.DELIVER:
            displayMessage = 'Select Product';
            displayValue = input;
            break;
        case VENDING_MACHINE_STATES.PAYMENT:
            displayMessage = 'Product';
            displayValue = `${selectedProduct.id} - ${selectedProduct.name}`;
            displayPrice = true;
            break;
        default:
            break;
    }

    return (
        <div {...bem()}>
            <Display
                label={displayMessage}
                value={displayValue}
            />
            <Display
                label={displayPrice ? 'Price' : ''}
                value={displayPrice ? `${selectedProduct.price} ${VENDING_MACHINE_CURRENCY}` : ''}
            />
            <Error error={error} />
            <Keypad
                handleOnPressKey={handleOnPressKey}
                handleOnPressEnter={handleOnPressEnter}
                handleOnPressCancel={handleOnPressCancel}
            />
        </div>
    );
};

export default SelectProduct;