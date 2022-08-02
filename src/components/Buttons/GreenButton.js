import { React } from 'react';

import '../../styles/Buttons.css';

export const GreenButton = ( { button_name, button_func } ) => {

    return (
        <button
            className='rounded-button green-button '
            onClick={button_func}
        >
            {button_name}
        </button>
    );
};
