import React from 'react';
import PropTypes from 'prop-types';
import bemHelper from 'react-bem-helper';

require('./error.scss');

const bem = bemHelper('error');

const Error = ({ error }) => (
    <div {...bem('container')}>
        {
            error && <div {...bem('text')}>{error}</div>
        }
    </div>
);

Error.propTypes = {
    error: PropTypes.string
};

Error.defaultProps = {
    error: ''
};

export default Error;