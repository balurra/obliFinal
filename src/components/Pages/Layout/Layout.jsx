import AgregarPersona from "../Dashboard/AgregarPersona/AgregarPersona"
import { getDepartamentos, getPersonas } from "../../../services/censoAPI"
import { useSelector } from "react-redux/es/hooks/useSelector"
import Header from "../Dashboard/Header"
import { Outlet } from "react-router-dom"

const Layout = () => {
    const apiKey = useSelector(state => state.user.userLogged.apiKey)
    const id = useSelector(state => state.user.userLogged.id)
    const userLogged = useSelector(state => state.user.userLogged)
    
    return (
        <div>
            {console.log(userLogged)}
            {console.log(getDepartamentos(apiKey, id), getPersonas(apiKey, id))}
            <Header/>
            <Outlet/>
            
        </div>
    )
}
export default Layout