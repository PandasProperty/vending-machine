import { processReducer } from './calculator';
import { ROLES, EQUALS } from '../utils/constants';

describe('Redux for basic calculator', () => {
    
    let state;

    beforeEach(() => {
        state = {
            input: '0',
            role: ROLES.OPERAND,
            value: null
        };
    });

    it('When inputing a series of operands', () => {
        state = processReducer(state, {
            payload: {
                role: ROLES.OPERAND,
                value: '1'
            }
        });
        state = processReducer(state, {
            payload: {
                role: ROLES.OPERAND,
                value: '3'
            }
        });
        expect(state.input).toEqual('13');
    });

    it('When inputing a series of operands and operators', () => {
        state = longExpression(state);
        expect(state.input).toEqual('1 + 3 / 6');
    });

    it('Computing after inputing a series of operands and operators', () => {
        state = longExpression(state);
        state = processReducer(state, {
            payload: {
                role: ROLES.OPERATOR,
                value: EQUALS
            }
        });
        expect(state.input).toEqual('1.5');
    });
});

const longExpression = (state) => {
    state = processReducer(state, {
        payload: {
            role: ROLES.OPERAND,
            value: '1'
        }
    });
    state = processReducer(state, {
        payload: {
            role: ROLES.OPERATOR,
            value: '+'
        }
    });
    state = processReducer(state, {
        payload: {
            role: ROLES.OPERAND,
            value: '3'
        }
    });
    state = processReducer(state, {
        payload: {
            role: ROLES.OPERATOR,
            value: '/'
        }
    });
    state = processReducer(state, {
        payload: {
            role: ROLES.OPERAND,
            value: '6'
        }
    });
    return state;
}