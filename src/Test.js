import React, { useEffect, useState } from 'react';
import { Message } from './Message';
import './message.css';


const Test = () => {

    const [isMessageVisible, setIsMessageVisible] = useState( false );

    const [messagesArray, setMessagesArray] = useState( [] );



    const handleMessage = () => {

        setMessagesArray( [
            ...messagesArray,
            <Message />
        ] );
    };

    // useEffect( () => {
    //     console.log( messagesArray );
    //     setIsMessageVisible( true );

    //     return () => {
    //         setTimeout( () => {
    //             while ( messagesArray.length !== 0 )
    //                 messagesArray.pop();
    //         }, 3000 );
    //     };

    // }, [messagesArray] );

    useEffect( () => {
        console.log( messagesArray );

        setTimeout(() => {
            while(messagesArray.length !== 0) {
                messagesArray.pop()
            }
        }, 5000)

    }, [messagesArray] );

    return (
        <div>
            <p className=''>This is a test :)</p>
            <button
                className='btn'
                onClick={handleMessage}
            >Press here :3
            </button>
            {/* <Message 
            isMessageVisible={isMessageVisible}
        /> */}
            {
                messagesArray.map( message => (
                    message
                ) )
            }
        </div>
    );
};

export default Test;
