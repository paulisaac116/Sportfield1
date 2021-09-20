import React from 'react'
//import  {db} from '../firebase/index'

import '../styles/Profile.css'
import profile_photo from '../images/dragonball.png'
//import { UserContext } from './UserContext'

export const Profile = () => {

    //const documentId = useContext(UserContext)
    //const [documentData, setDocumentData] = useState(null)

//     useEffect (() => {
//         const docRef = db.collection("Users").doc(documentId);
//         docRef.get().then((doc) => {
//          if (doc.exists) {
//           setDocumentData(doc.data())
//           console.log('Datos del documento desde el perfil: ', documentData)

//         } else {
//           console.log("No such document!");
//         }
//         }).catch((error) => {
//             console.log("Error getting document:", error);
//   });
//     }, [documentData, documentId])

    //console.log(documentData.name)


    return (
        <div className="profile">
            <div className="profile__photo">
                <img src={profile_photo} alt="profile logo"/>
            </div>
            <div className="profile__data">
                <p><strong>Nombre: </strong>Eduardo Perez</p>
                <p><strong>Usuario: </strong>eduperez</p>
                <p><strong>Correo: </strong>eduardo@gmai.com</p>
                <p><strong>Lote: </strong>111</p>

            </div>
        </div>
    )
}
