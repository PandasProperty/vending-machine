import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import bemHelper from 'react-bem-helper';

require('./item.scss');

const bem = bemHelper('item');

const Item = ({ item: { id, name, icon, price, quantity, color }, onClick, disabled }) => (
    <div {...bem(null, disabled && 'disabled')} onClick={onClick}>
        <div {...bem('key')}>{id} - {name}</div>
        <div {...bem('icon')}>
            <FontAwesomeIcon icon={icon} size='2x' color={color} />
        </div>
        <div {...bem('tags')}>
            <div {...bem('info')}>
                <div {...bem('label')}>Price</div>
                <div {...bem('value')}>{price}</div>
            </div>
            <div {...bem('info')}>
                <div {...bem('label')}>Available</div>
                <div {...bem('value')}>{quantity}</div>
            </div>
        </div>
    </div>
);

Item.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        icon: PropTypes.object,
        price: PropTypes.number,
        color: PropTypes.string,
        quantity: PropTypes.number
    }).isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool
};

Item.defaultProps = {
    size: 1,
    onClick: noop,
    disabled: false
};

export default Item;