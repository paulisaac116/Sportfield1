import React, {useState, useEffect} from 'react'
import { BlackButton } from './BlackButton'

import '../styles/FieldsTable.css'
import { FieldCardsData } from './FieldCardsData'

export const FieldsTable = () => {

    const [menuItem, setMenuItem] = useState([])
    const [fieldCardTable, setFieldCard] = useState([])

    const {sectorInferior: sectorInferiorArray, sectorMedio: sectorMedioArray} = FieldCardsData     

    useEffect(() => {
        const changeColor = (array, arrayElement) => {
            const newArray = []

            const arrayFilter = () => {
                for(let item in array) {
                    if(array[item] !== arrayElement) {
                        newArray.push(array[item])
                    }
            }}
            arrayFilter()
            setFieldCard(<div className={`table table__${arrayElement.locationClassname}`}>
                            <div className={`table__card ${arrayElement.className}`}>{arrayElement.code}</div>
                            {newArray.map((item, key) => (
                                <div onClick={() => {changeColor(array, item)}} style={{backgroundColor: '#636262'}} key={key} className={`table__card ${item.className}`}>
                                    {item.code}
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

        const sectorMedioMenu = () => {
            setMenuItem(<BlackButton button_name="SECTOR MEDIO" button_func={medioMenu} button_value="middle"/>);
            setFieldCard(<div className="table table__middle">
                            {Object.keys(sectorMedioArray).map((item, key) => (
                                <div onClick={() => {changeColor(sectorMedioArray, sectorMedioArray[item])}} key={key} className={`table__card ${sectorMedioArray[item].className}`}>
                                    {sectorMedioArray[item].code}
                                </div>
                            ))}
                        </div>);
        }

        const sectorInferiorMenu = () => {
            setMenuItem(<BlackButton button_name="SECTOR INFERIOR" button_func={inferiorMenu} button_value="inferior"/>)
            setFieldCard( <div className="table table__inferior">
                            {Object.keys(sectorInferiorArray).map((item, key) => (
                                <div onClick={() => {changeColor(sectorInferiorArray, sectorInferiorArray[item])}} key={key} className={`table__card ${sectorInferiorArray[item].className}`}>
                                    {sectorInferiorArray[item].code}
                                </div>
                            ))}
                        </div>)
        }

        setMenuItem(<BlackButton button_name="SECTOR MEDIO" button_func={medioMenu} button_value="middle"/>)
        setFieldCard(<div className="table table__middle">
                        {Object.keys(sectorMedioArray).map((item, key) => (
                            <div onClick={() => {changeColor(sectorMedioArray, sectorMedioArray[item])}} key={key} className={`table__card ${sectorMedioArray[item].className}`}>
                                {sectorMedioArray[item].code}
                            </div>
                        ))}
                    </div>)
    }, [sectorInferiorArray, sectorMedioArray])

    return (
       <div className="menu-and-table">
           <div className="menu-container">
            {menuItem}
           </div>
           {fieldCardTable}
       </div>
    )
}
