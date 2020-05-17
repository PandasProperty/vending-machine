import React from 'react';
import bemHelper from 'react-bem-helper';
import Products from '../products/products';
import SelectProduct from '../select-product';
import Payment from '../payment';
import Output from '../output';

require('./vending-machine.scss');

const bem = bemHelper('vending-machine');

const VendingMachine = () => (
    <div {...bem()}>
        <Products />
        <div {...bem('input-containers')}>
            <SelectProduct />
            <Payment />
            <Output />
        </div> 
    </div>
);

export default VendingMachine;