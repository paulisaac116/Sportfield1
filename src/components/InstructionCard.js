import React from 'react'

import '../styles/InstructionCard.css'

export const InstructionCard = ({instruction}) => {
        
    return (
        <div>
            <p className="instruction__card">
                {instruction}
            </p>
        </div>
    )
}
