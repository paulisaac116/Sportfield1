import React from 'react'

import '../styles/InstructionCard.css'

export const InstructionCard = ({instruction}) => {
        
    return (
        <div>
            <p className="card">
                {instruction}
            </p>
        </div>
    )
}
