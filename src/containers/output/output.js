import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import bemHelper from 'react-bem-helper';
import { actionPickItem } from '../../redux/vending-machine';
import { VENDING_MACHINE_STATES } from '../../utils/constants';
import { modeSelector, selectedProductSelector } from '../../redux/vending-machine-selectors';

require('./output.scss');

const bem = bemHelper('output');

const Output = () => {
    const selectedProduct = useSelector(selectedProductSelector);
    const vendingMachineState = useSelector(modeSelector);
    const dispatch = useDispatch();

    return (
        <div {...bem()}>
            {
                vendingMachineState === VENDING_MACHINE_STATES.DELIVER && (
                    <div
                        {...bem('container')}
                        onClick={() => dispatch(actionPickItem())}
                    >
                        <div {...bem('label')}>Here you go:</div>
                        <div {...bem('icon')}>
                            <FontAwesomeIcon
                                icon={selectedProduct.icon}
                                size='4x'
                                color={selectedProduct.color}
                            />
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Output;