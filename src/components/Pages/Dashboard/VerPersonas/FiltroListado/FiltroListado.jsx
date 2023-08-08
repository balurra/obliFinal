import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fillOcupaciones } from "../../../../../app/slices/selectSlice"
import { getOcupaciones, getPersonas } from "../../../../../services/censoAPI"
import Button from "../../../../UI/Button"
import { fillCensados, filterCensados } from "../../../../../app/slices/censadosSlice"
import { Link } from "react-router-dom"
import './filtroListado.css'

const FiltroListado = () => {
  const dispatch = useDispatch()
  const userLogged = useSelector(state => state.user.userLogged)
  const censados = useSelector(state=> state.censados.censados)
  const ocupaciones = useSelector(state=> state.select.ocupaciones)
  const ocupacion = useRef()
  const [ocupacionSeleccionada, setOcupacionSeleccionada] = useState(null)
  const [claseLink, setclaseLink] = useState('disabled-link')
  const [claseSelect, setclaseSelect] = useState('sel-habilitado')


  useEffect(() => {
    if(ocupacionSeleccionada!==null){
    dispatch(filterCensados(Number.parseInt(ocupacion.current.value)))
    setclaseLink('enabled-link')
    setclaseSelect('sel-deshabilitado')
  }
    //habilitar link
  }, [ocupacionSeleccionada])

  const filtroChange = (event) =>{
    setOcupacionSeleccionada(Number.parseInt(event.target.value))
  }

  





  const disparar = () =>{

    getPersonas(userLogged.apiKey, userLogged.id)
    .then(data=>{
      dispatch(fillCensados(data.personas))
      console.log(censados)
      setOcupacionSeleccionada(null)
      setclaseLink('disabled-link')
      setclaseSelect('sel-habilitado')
    }).catch(e=>{
      console.error(e.message)})

  }




  return (
    <div>
      <li><Link to={'/dashboard/listado-personas'} onClick={disparar} className={claseLink}>Volver</Link></li>
        <div className='col'>
    <select  className={claseSelect} id='ocupacionSelect' ref={ocupacion} onChange={filtroChange}>
    <option selected value="0">
    Filtrar por ocupacion
      </option>
      {ocupaciones.map((option) =>(
        <option key={option.id} value={option.id}>
          {option.ocupacion}
        </option> 
        ))}
    </select>
</div>
      {/* <div className='col-auto'>
         <Button cta={'Filtrar'} onHandleClick={_onFiltrar}></Button>
      </div> */}
    </div>
    
  )
}

export default FiltroListado