import React, {useState, useEffect} from 'react'
import { BlackButton } from './BlackButton'

import '../styles/FieldsTable.css'
import { FieldCardsData } from './FieldCardsData'

export const FieldsTable = () => {

    const [menuItem, setMenuItem] = useState(null)
    const [fieldCard, setFieldCard] = useState(null)

    const {sectorInferior: sectorInferiorArray, sectorMedio: sectorMedioArray} = FieldCardsData

    const changeColor = (array, id) => {
        // const newArray = Object.keys(array).filter((item) => {
        //     return array[item].id != id
        // })
        // setFieldCard(<div className="table">
        //                 <div className={`table__card ${element.className}`}>{element.code}</div>
        //                 {Object.keys(newArray).map((item, key) => (
        //                     <div style="background-color: #636262" onClick={changeColor(newArray, newArray[item].id)} key={key} className={`table__card ${newArray[item].className}`}>
        //                         {newArray[item].code}
        //                     </div>
        //                 ))}
        //             </div>
        // )        
            
        setFieldCard(<div className="table">
            {
                Object.keys(array).map((item, key) => {
                if(array[item].id != id) {
                    return (
                        <div style="background-color: #636262" onClick={changeColor(array, array[item].id)} key={key} className={`table__card ${array[item].className}`}>
                            {array[item].code}
                        </div>
                    )
                } else {
                    return (
                        <div onClick={changeColor(array, array[item].id)} key={key} className={`table__card ${array[item].className}`}>
                            {array[item].code}
                        </div>
                    )
                }
            })
        }
            </div>
        )


    }


    useEffect(() => {
        setMenuItem(<BlackButton button_name="SECTOR MEDIO" button_func={medioMenu} button_value="middle"/>)
        setFieldCard(<div className="table table__middle">
                        {Object.keys(sectorMedioArray).map((item, key) => (
                            <div onClick={changeColor(sectorMedioArray, sectorMedioArray[item].id, sectorMedioArray[item])} key={key} className={`table__card ${sectorMedioArray[item].className}`}>
                                {sectorMedioArray[item].code}
                            </div>
                        ))}
                    </div>)
    }, [])

    const sectorMedioMenu = () => {
        setMenuItem(<BlackButton button_name="SECTOR MEDIO" button_func={medioMenu} button_value="middle"/>);
        setFieldCard(<div className="table table__middle">
                        {Object.keys(sectorMedioArray).map((item, key) => (
                            <div onClick={changeColor(sectorMedioArray, sectorMedioArray[item].id, sectorMedioArray[item])} key={key} className={`table__card ${sectorMedioArray[item].className}`}>
                                {sectorMedioArray[item].code}
                            </div>
                        ))}
                    </div>);
    }
    
    const sectorInferiorMenu = () => {
        setMenuItem(<BlackButton button_name="SECTOR INFERIOR" button_func={inferiorMenu} button_value="inferior"/>)
        setFieldCard( <div className="table table__inferior">
                        {Object.keys(sectorInferiorArray).map((item, key) => (
                            <div onClick={changeColor(sectorInferiorArray, sectorInferiorArray[item].id, sectorInferiorArray[item])} key={key} className={`table__card ${sectorInferiorArray[item].className}`}>
                                {sectorInferiorArray[item].code}
                            </div>
                        ))}
                    </div>)
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
       <div className="menu-and-table">
           {menuItem}
           {fieldCard}
       </div>
    )
}
