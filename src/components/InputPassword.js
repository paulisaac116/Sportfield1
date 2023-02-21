import React, { useState } from 'react';

import '../styles/InputPassword.css';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const InputPassword = ( { extraClass, inputValue, onChangeInput } ) => {

    const [inputType, setInputType] = useState( 'password' );

    const handleChangeInputType = () => {
        if ( inputType === 'password' ) setInputType( 'text' );
        else if ( inputType === 'text' ) setInputType( 'password' );
    };

    return (
        <div className={`input-password ${extraClass}`}>
            <input
                id='password'
                type={inputType}
                name='password'
                placeholder='Contraseña'
                value={inputValue}
                onChange={onChangeInput}
            />
            {

                inputType === 'password'
                    ? <FontAwesomeIcon
                        className={`fa-lg ${inputValue?.length === 0 ? 'hidden' : 'black cursor-pointer'} ${inputType === 'text' ? 'hidden' : ''}`}
                        icon={faEye}
                        onClick={handleChangeInputType}
                    />
                    : <FontAwesomeIcon
                        className={`fa-lg ${inputType === 'password' || inputValue.length === 0 ? 'hidden' : 'black cursor-pointer'}`}
                        icon={faEyeSlash}
                        onClick={handleChangeInputType}
                    />
            }


        </div>
    );
};
