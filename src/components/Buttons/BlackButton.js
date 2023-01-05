import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/BlackButton.css';

export const BlackButton = ( { button_name, button_func, button_id, button_logo, extraClass } ) => {

    return (
        <button
            className={`black-button ${extraClass ? extraClass : ''}`}
            onClick={button_func}
            value={button_name}
            id={button_id}
        >
            {button_name}{button_logo}
        </button>
    );
};

BlackButton.propTypes = {

    button_name: PropTypes.string,
    button_func: PropTypes.func,
    button_id: PropTypes.string,
    button_logo: PropTypes.func
};