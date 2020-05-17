import React from 'react';
import { useSelector } from 'react-redux';
import bemHelper from 'react-bem-helper';
import { map, keys, chunk } from 'lodash';
import Item from '../../components/item';
import { VENDING_MACHINE_CONFIG } from '../../utils/constants';

require('./products.scss');

const bem = bemHelper('products');

const Products = () => {
    const products = useSelector(state => state.vendingMachine.products);
    const productKeyRows = chunk(keys(products), VENDING_MACHINE_CONFIG.COLUMNS);

    return (
        <div {...bem()}>
            {
                map(productKeyRows, (keyRow, index) => (
                    <div {...bem('row')} key={`product-row-${index}`}>
                        {
                            map(keyRow, key => {
                                const product = products[key];
                                return (
                                    <Item
                                        key={`product-item-${product.id}`}
                                        item={product}
                                    />
                                );
                            })
                        }
                    </div>
                ))
            }
        </div>
    );
};

export default Products;