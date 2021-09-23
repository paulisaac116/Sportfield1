import React, {useState, useEffect} from 'react'
import { BlackButton } from './BlackButton'
import { FieldCardsData } from './FieldCardsData'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import '../styles/FieldsTable.css'

export const FieldsTable = ({confirmField, wichField, wichSector, wichColor, wichCode}) => {

    const [menuItem, setMenuItem] = useState([])
    const [fieldCardTable, setFieldCard] = useState([])

    const {sectorInferior: sectorInferiorArray, sectorMedio: sectorMedioArray} = FieldCardsData     

    useEffect(() => {
        const changeColor = (array, arrayElement) => {
            console.log("cancha seleccionada: ", arrayElement.fieldType)
            const newArray = []
            confirmField(true)
            wichField(arrayElement.fielType)
            wichSector(arrayElement.location)
            wichColor(arrayElement.cardBackground)
            wichCode(arrayElement.code)
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
                    <BlackButton button_name="SECTOR MEDIO" button_func={sectorMedioMenu} button_value="middle" button_logo={<FontAwesomeIcon size="lg" icon={faCaretDown} />} />
                    <BlackButton button_name="SECTOR INFERIOR" button_func={sectorInferiorMenu} button_value="inferior"/>
                </div>
            )
        }

        const inferiorMenu = () => {
            setMenuItem (
                <div className="field-menu">
                    <BlackButton button_name="SECTOR INFERIOR" button_func={sectorInferiorMenu} button_value="inferior" button_logo={<FontAwesomeIcon size="lg" icon={faCaretDown} />}/>
                    <BlackButton button_name="SECTOR MEDIO" button_func={sectorMedioMenu} button_value="middle"/>
                </div>
            )
        }

        const sectorMedioMenu = () => {
            confirmField(false)
            setMenuItem(<BlackButton button_name="SECTOR MEDIO" button_func={medioMenu} button_value="middle" button_logo={<FontAwesomeIcon size="lg" icon={faCaretDown} />}/>);
            setFieldCard(<div className="table table__middle">
                            {Object.keys(sectorMedioArray).map((item, key) => (
                                <div onClick={() => {changeColor(sectorMedioArray, sectorMedioArray[item])}} key={key} className={`table__card ${sectorMedioArray[item].className}`}>
                                    {sectorMedioArray[item].code}
                                </div>
                            ))}
                        </div>);
        }

        const sectorInferiorMenu = () => {
            confirmField(false)
            setMenuItem(<BlackButton button_name="SECTOR INFERIOR" button_func={inferiorMenu} button_value="inferior" button_logo={<FontAwesomeIcon size="lg" icon={faCaretDown} />}/>)
            setFieldCard( <div className="table table__inferior">
                            {Object.keys(sectorInferiorArray).map((item, key) => (
                                <div onClick={() => {changeColor(sectorInferiorArray, sectorInferiorArray[item])}} key={key} className={`table__card ${sectorInferiorArray[item].className}`}>
                                    {sectorInferiorArray[item].code}
                                </div>
                            ))}
                        </div>)
        }

        setMenuItem(<BlackButton button_name="SECTOR MEDIO" button_func={medioMenu} button_value="middle" button_logo={<FontAwesomeIcon size="lg" icon={faCaretDown} />}/>)
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
