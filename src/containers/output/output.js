import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import bemHelper from 'react-bem-helper';
import { collectAction } from '../../redux/vending-machine';
import { VENDING_MACHINE_STATES } from '../../utils/constants';

require('./output.scss');

const bem = bemHelper('output');

const Output = () => {
    const selectedProduct = useSelector(state => state.vendingMachine.selectedProduct);
    const vendingMachineState = useSelector(state => state.vendingMachine.state);
    const dispatch = useDispatch();

    return (
        <div {...bem()}>
            {
                vendingMachineState ===VENDING_MACHINE_STATES.DELIVER && (
                    <>
                        <div {...bem('label')}>Here you go:</div>
                        <div {...bem('icon')} onClick={() => dispatch(collectAction())}>
                            <FontAwesomeIcon
                                icon={selectedProduct.icon}
                                size='4x'
                                color={selectedProduct.color}
                            />
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default Output;