import React from 'react';
import { Provider } from 'react-redux';
import UserChange from '.';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('Vending Machine', () => {
    const store = mockStore({
        vendingMachine: {
            userChange: {
                split: [
                    {
                        id: '0',
                        label: '50 bani',
                        quantity: 10,
                        value: 0.5
                    },
                    {
                        id: '1',
                        label: '1 leu',
                        quantity: 0,
                        value: 0.5
                    }
                ],
                success: 10,
                value: 5
            }
        },
    });
    
    it('User-change componet', () => {
        const component = renderer.create(
            <Provider store={store}>
                <UserChange />
            </Provider>
        );
        
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
