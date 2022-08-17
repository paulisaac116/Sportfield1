import { React } from 'react';

import '../../styles/Buttons.css';

export const GreenButton = ( { button_name, button_func, extraClass} ) => {

    return (
        <button
            className={`rounded-button green-button ${extraClass}`}
            onClick={button_func}
        >
            {button_name}
        </button>
    );
};
