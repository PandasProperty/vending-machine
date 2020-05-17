import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { map } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import bemHelper from 'react-bem-helper';
import { collectAction } from '../../redux/vending-machine';
import { VENDING_MACHINE_CURRENCY } from'../../utils/constants';

require('./user-change.scss');

const bem = bemHelper('user-change');

const UserChange = () => {
    const dispatch = useDispatch();
    const userChange = useSelector(state => state.vendingMachine.userChange);
    
    return (
        <div {...bem()} onClick={() => dispatch(collectAction())}>
            <div {...bem('container')}>
                {
                    userChange.success ? (
                        <>
                            <div {...bem('label')}>
                                {`Your change: ${userChange.value} ${VENDING_MACHINE_CURRENCY}`}
                            </div>
                            <div {...bem('description')}>
                                <FontAwesomeIcon {...bem('icon')} icon={faCoins} size='2x' />
                                <div {...bem('split')}>
                                    {
                                        map(userChange.split, coin => (
                                            <div key={`coin-${coin.id}`} {...bem('coin')}>
                                                    {coin.quantity} of {coin.label}
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </>
                    ) : (
                        <div {...bem('label')}>There is not enough money in the vending machine.</div>
                    )
                }
            </div>
        </div>
    );
};

export default UserChange;