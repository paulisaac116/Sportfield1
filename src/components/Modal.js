import React from 'react';

export const Modal = () => {

    

    return (
        <div className={`modal ${isModalVisible ? 'flex slide-in-fwd-center' : 'hidden'}`}>
            <div className='modal__content'>
            </div>
        </div>
    );
};
