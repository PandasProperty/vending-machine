import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import bemHelper from 'react-bem-helper';
import Keypad from '../../components/keypad';
import Display from '../../components/display';
import Error from '../../components/error';
import { actionPressKeypad, actionCancelOperation, actionSelectProduct } from '../../redux/vending-machine';
import { VENDING_MACHINE_STATES, VENDING_MACHINE_CURRENCY } from '../../utils/constants';
import { productsSelector, modeSelector, inputProductSelector, errorMessageSelector } from '../../redux/vending-machine-selectors';

require('./select-product.scss');

const bem = bemHelper('select-product');

const SelectProduct = () => {
    const dispatch = useDispatch();
    const products = useSelector(productsSelector);
    const vendingMachineState = useSelector(modeSelector);
    const inputProduct = useSelector(inputProductSelector);
    const errorMessage = useSelector(errorMessageSelector);

    const handleOnPressKey = (value) => {
        if (vendingMachineState !== VENDING_MACHINE_STATES.PAYMENT) {
            dispatch(actionPressKeypad(value));
        }
    }

    const handleOnPressEnter = () =>  dispatch(actionSelectProduct());

    const handleOnPressCancel = () => dispatch(actionCancelOperation());

    let displayMessage = '';
    let displayValue = '';
    let displayPrice = false;
    let selectedProduct;

    if (vendingMachineState ===  VENDING_MACHINE_STATES.PAYMENT) {
        selectedProduct = products[inputProduct];
        displayMessage = 'Product';
        displayValue = `${selectedProduct.id} - ${selectedProduct.name}`;
        displayPrice = true;
    } else {
        displayMessage = 'Select Product';
        displayValue = (
            vendingMachineState ===  VENDING_MACHINE_STATES.IDLE ||
            vendingMachineState ===  VENDING_MACHINE_STATES.DELIVER
        ) ? '' : inputProduct;
    }

    const error = vendingMachineState === VENDING_MACHINE_STATES.IDLE ? errorMessage : '';

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