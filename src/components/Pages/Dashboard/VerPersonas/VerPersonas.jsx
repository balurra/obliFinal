import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteCensado, fillCensados } from "../../../../app/slices/censadosSlice"
import { getOcupaciones, getPersonas } from "../../../../services/censoAPI"
import Button from '../../../UI/Button'
import CensadosTable from "./CensadosTable"
import FiltroListado from "./FiltroListado"
import { fillOcupaciones } from "../../../../app/slices/selectSlice"


const VerPersonas = () => {
  const dispatch = useDispatch()
  const userLogged = useSelector(state => state.user.userLogged)
  const censados = useSelector(state => state.censados.censados)
  const ocupaciones = useSelector(state => state.select.ocupaciones)
  

  useEffect(() => {
    console.log(userLogged.apiKey, userLogged.id);
    if(censados.length===0)
    {
    getPersonas(userLogged.apiKey, userLogged.id)
    .then(data=>{dispatch(fillCensados(data.personas))
      console.log(censados)
    }).catch(e=>{
      console.error(e.message)})
}    
  }, [])

  useEffect(()=>{
    if(!ocupaciones.length>0)
    {
    getOcupaciones(userLogged.apiKey, userLogged.id)
    .then(data=>{dispatch(fillOcupaciones(data.ocupaciones))
    }).catch(e=>{console.error(e.message)})
}},[])

  // useEffect(() => {
  //   censados.filter(c=>c.idUsuario === userLogged.id)
  // }, [censados])


  const cambioCensados = (id) => {
     //dispatch(deleteCensado(id))
     console.log(id);
  }
  


  return (
    <div>
      <FiltroListado/>
      <CensadosTable/>
      {/* <ul>
        {censados.map(c=> (
        <li key={c.id} value={c.id}>{c.nombre}
          <div className='col-auto'>
            <input type="button" onClick={cambioCensados(c.id)}></input>
          </div>
         </li>
          ))} 


   
      </ul> */}
    </div>
  )
}

export default VerPersonas