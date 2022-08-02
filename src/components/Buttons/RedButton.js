import React  from 'react';

import '../../styles/Buttons.css';

export const RedButton = ( { button_name, button_func } ) => {

    return (
        <button
            className='rounded-button red-button'
            onClick={button_func}
        >
            {button_name}
        </button>
    );
};
