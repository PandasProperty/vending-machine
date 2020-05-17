import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { join, map, keys } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRegistered, faCoins } from '@fortawesome/free-solid-svg-icons';
import bemHelper from 'react-bem-helper';
import UserChange from '../user-change/user-change';
import Display from '../../components/display';
import Error from '../../components/error';
import { actionInsertMoney, actionGetAvailableBalance } from '../../redux/vending-machine';
import { VENDING_MACHINE_CURRENCY, VENDING_MACHINE_MONEY, VENDING_MACHINE_STATES } from'../../utils/constants';
import { productsSelector, modeSelector, userBalanceSelector, userChangeSelector, machineCapitalSelector, errorMessageSelector } from '../../redux/vending-machine-selectors';

require('./payment.scss');

const bem = bemHelper('payment');

const Payment = () => {
    const dispatch = useDispatch();
    const selectedProduct = useSelector(productsSelector);
    const vendingMachineState = useSelector(modeSelector);
    const errorMessage = useSelector(errorMessageSelector);
    const userBalance = useSelector(userBalanceSelector);
    const userChange = useSelector(userChangeSelector);
    
    const supportedMoneyLabel = join(map(VENDING_MACHINE_MONEY, money => money.label), ', ');
    const isOverlay = vendingMachineState === VENDING_MACHINE_STATES.PAYMENT && 'overlay';

    const handleGetChange = () => dispatch(actionGetAvailableBalance());

    const handleInputModey = (moneyId) => () => dispatch(actionInsertMoney(moneyId));

    const error = vendingMachineState === VENDING_MACHINE_STATES.PAYMENT ? errorMessage : '';
    
    return (
        <div {...bem()}>
            <label {...bem('info')}>The vending maching support only {supportedMoneyLabel}.</label>
            <Display label={'Balance'} value={`${userBalance} ${VENDING_MACHINE_CURRENCY}`} />
            <div {...bem('payment-input')}>
                <FontAwesomeIcon
                    {...bem('icon', isOverlay)}
                    icon={faRegistered}
                    size='2x'
                    onClick={handleGetChange}
                />
                <div {...bem('info')}>Press the 'R' button for rest.</div>
            </div>
            <Error error={error} />
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