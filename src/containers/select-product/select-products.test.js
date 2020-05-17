import React from 'react';
import { Provider } from 'react-redux';
import { faMugHot } from '@fortawesome/free-solid-svg-icons';
import { map } from 'lodash';
import SelectProducts from '.';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { VENDING_MACHINE_STATES, VENDING_MACHINE_CONFIG } from '../../utils/constants';

const mockStore = configureStore([]);

describe('Vending Machine', () => {
    const store = mockStore({
        vendingMachine: {
            products: map(
                Array(VENDING_MACHINE_CONFIG.ROWS * VENDING_MACHINE_CONFIG.COLUMNS), (item, index) => ({
                    color: 'orange',
                    icon: faMugHot,
                    id: index,
                    name: 'Cheese',
                    price: 15,
                    quantity: 7,
                })
            ),
            inputProduct: 1,
            mode: VENDING_MACHINE_STATES.PAYMENT,
            errorMessage: null,
        },
    });
    
    it('Select-products componet', () => {
        const component = renderer.create(
            <Provider store={store}>
                <SelectProducts />
            </Provider>
        );
        
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
