import React from 'react';
import PropTypes from 'prop-types';
import bemHelper from 'react-bem-helper';

require('./display.scss');

const bem = bemHelper('display');

const Display = ({ label, value }) => (
    <div {...bem()}>
        <div {...bem('label')}>{label}</div>
        <div {...bem('value')}>{value}</div>
    </div>
);

Display.propTypes = {
    label: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

Display.defaultProps = {
    label: '',
    value: ''
};

export default Display;