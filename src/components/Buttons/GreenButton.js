import { React } from 'react';
import PropTypes from 'prop-types';

import '../../styles/Buttons.css';

export const GreenButton = ( { button_name, button_func, extraClass, name } ) => {

    return (
        <button
            id={name}
            name={name}
            className={`rounded-button green-button ${extraClass ? extraClass : ''}`}
            onClick={button_func}
        >
            {button_name}
        </button>
    );
};
GreenButton.propTypes = {

    button_name: PropTypes.string,
    button_func: PropTypes.func,
    extraClass: PropTypes.string
};