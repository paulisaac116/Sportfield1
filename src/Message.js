import React, { useEffect, useState } from 'react';
import 'animate.css';
import './message.css';


export const Message = ( { isMessageVisible } ) => {


    const [messageState, setMessageState] = useState( 'hidden' );

    // console.log( 'is message', isMessageVisible );

    useEffect( () => {

        setMessageState('animate__fadeInUp')
        setTimeout(() => {
            setMessageState('animate__fadeOutDown')
        }, 3000)

    }, []);





    return (
        <div className={`message animate__animated`}>
            This is a message ♥
        </div>
    );
};
