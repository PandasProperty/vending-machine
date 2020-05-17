import React from 'react';
import PropTypes from 'prop-types';
import { map, noop } from 'lodash';
import bemHelper from 'react-bem-helper';

require('./keypad.scss');

const bem = bemHelper('keypad');

const Keypad = ({ handleOnPressKey, handleOnPressEnter, handleOnPressCancel }) => {
    const handleOnPress = (handleFunction, value) => () => handleFunction(value);

    return (
        <div {...bem()}>
            {
                map([0, 1, 2], row => (
                    <div {...bem('row')} key={`keypad-row-${row}`}>
                        {
                            map([1, 2, 3], column => {
                                const value = row * 3 + column;
                                return (
                                    <div
                                        key={`keypad-column-${column}`}
                                        {...bem('key')}
                                        onClick={handleOnPress(handleOnPressKey, value)}
                                    >
                                        {value}
                                    </div>
                                );
                            })
                        }
                    </div>
                ))
            }
            <div {...bem('row')}>
                <div {...bem('key', 'enter')} onClick={handleOnPress(handleOnPressEnter)}>Enter</div>
                <div {...bem('key')} onClick={handleOnPress(handleOnPressKey, 0)}>0</div>
                <div {...bem('key', 'cancel')} onClick={handleOnPress(handleOnPressCancel)}>Cancel</div>
            </div>
        </div>
    );
};

Keypad.propTypes = {
    handleOnPressKey: PropTypes.func,
    handleOnPressEnter: PropTypes.func,
    handleOnPressCancel: PropTypes.func,
};

Keypad.defaultProps = {
    handleOnPressKey: noop,
    handleOnPressEnter: noop,
    handleOnPressCancel: noop,
};

export default Keypad;