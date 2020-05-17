import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { join, map, keys } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRegistered, faCoins } from '@fortawesome/free-solid-svg-icons';
import bemHelper from 'react-bem-helper';
import UserChange from '../user-change/user-change';
import Display from '../../components/display';
import Error from '../../components/error';
import { inputMoneyAction, getAvailableBalance } from '../../redux/vending-machine';
import { VENDING_MACHINE_CURRENCY, VENDING_MACHINE_MONEY, VENDING_MACHINE_STATES } from'../../utils/constants';

require('./payment.scss');

const bem = bemHelper('payment');

const Payment = () => {
    const dispatch = useDispatch();
    const selectedProduct = useSelector(state => state.vendingMachine.selectedProduct);
    const vendingMachineState = useSelector(state => state.vendingMachine.state);
    const userBalance = useSelector(state => state.vendingMachine.userBalance);
    const userChange = useSelector(state => state.vendingMachine.userChange);
    const machineCapital = useSelector(state => state.vendingMachine.machineCapital);
    
    const [error, setError] = useState(null);
    const supportedMoneyLabel = join(map(VENDING_MACHINE_MONEY, money => money.label), ', ');
    const isOverlay = vendingMachineState === VENDING_MACHINE_STATES.PAYMENT && 'overlay';

    const handlePressRest = () => {
        if (machineCapital) {
            dispatch(getAvailableBalance());
        } else {
            setError(`The machine doesn't have capital availabel`);
            setTimeout(() => setError(null), 2000)
        }
    };

    const handleInputModey = (moneyId) => () => dispatch(inputMoneyAction(moneyId));

    return (
        <div {...bem()}>
            <label {...bem('info')}>The vending maching support only {supportedMoneyLabel}.</label>
            <Display label={'Balance'} value={`${userBalance} ${VENDING_MACHINE_CURRENCY}`} />
            <div {...bem('payment-input')}>
                <FontAwesomeIcon
                    {...bem('icon', isOverlay)}
                    icon={faRegistered}
                    size='2x'
                    onClick={handlePressRest}
                />
                <div {...bem('info')}>Press the 'R' button for rest.</div>
            </div>
            { error && <Error error={error} />}
            {
                <div {...bem('wallet', isOverlay)}>
                    {
                        selectedProduct && (
                            <>
                                <div {...bem('info')}>Your Wallet</div>
                                <div {...bem('coins')}>
                                    {
                                        map(keys(VENDING_MACHINE_MONEY), moneyId => {
                                            const money = VENDING_MACHINE_MONEY[moneyId];
                                            return (
                                                <div
                                                    key={`coin-${moneyId}`}
                                                    {...bem('coin')}
                                                    onClick={handleInputModey(moneyId)}
                                                >
                                                    <FontAwesomeIcon {...bem('icon')} icon={faCoins} size='2x' />
                                                    <label>{money.label}</label>
                                                </div> 
                                            );
                                        })
                                    }
                                </div>
                            </>
                        )
                    }
                </div>
            }
            {
                userChange && <UserChange />
            }
        </div>
    );
};

export default Payment;