import React, {useState, useEffect} from 'react'
import { BlackButton } from './BlackButton'

import '../styles/TurnsPage.css'

export const FieldCardsMenu = () => {

    const [menuItem, setMenuItem] = useState(null)

    useEffect(() => {
        setMenuItem(<BlackButton button_name="SECTOR MEDIO" button_func={medioMenu} button_value="middle"/>)
        // setMenuItem(sectorMedioButton)
    }, [])

    const sectorMedioMenu = () => {
        setMenuItem(<BlackButton button_name="SECTOR MEDIO" button_func={medioMenu} button_value="middle"/>)
        // setMenuItem(sectorMedioButton)
    }
    
    const sectorInferiorMenu = () => {
        setMenuItem(<BlackButton button_name="SECTOR INFERIOR" button_func={inferiorMenu} button_value="inferior"/>)
        // setMenuItem(sectorInferiorButton)
    }

    const medioMenu = () => {
        setMenuItem (
            <div className="field-menu">
                <BlackButton button_name="SECTOR MEDIO" button_func={sectorMedioMenu} button_value="middle"/>
                <BlackButton button_name="SECTOR INFERIOR" button_func={sectorInferiorMenu} button_value="inferior"/>
            </div>
        )
    }
    
    const inferiorMenu = () => {
        setMenuItem (
            <div className="field-menu">
                <BlackButton button_name="SECTOR INFERIOR" button_func={sectorInferiorMenu} button_value="inferior"/>
                <BlackButton button_name="SECTOR MEDIO" button_func={sectorMedioMenu} button_value="middle"/>
            </div>
        )
    }
    


    return ( 
    <div>
        {menuItem}
    </div>
    )
}
