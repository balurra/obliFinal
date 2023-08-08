import { useEffect, useRef } from 'react';
import { getDepartamentos, getOcupaciones, getCiudades, fetchRegister } from '../../../../../services/censoAPI';
import { useDispatch, useSelector } from 'react-redux';
import { fillDepartamentos, fillCiudades, fillOcupaciones } from '../../../../../app/slices/selectSlice';
import { useState } from 'react';
//import Button from '../../../../UI/Button/Button';
import Alert from '../../../../UI/Alert';
import { agregarUnCensado } from '../../../../../app/slices/censadosSlice';
import Button from '@mui/material/Button';
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import agregarPersonaForm from "./agregarPersonaForm.css"



const AgregarPersonaForm = () => {
    const dispatch = useDispatch()
    const [message, setMessage] = useState('')
    const [classColor, setClassColor] = useState('')
    const [showAlert, setShowAlert] = useState(false)
    const userLogged = useSelector(state => state.user.userLogged)
    const apikey = useSelector(state => state.user.userLogged.apiKey)
    const id = useSelector(state => state.user.userLogged.id)    
    const departamentos = useSelector(state => state.select.departamentos)
    const ciudades = useSelector(state => state.select.ciudades)
    const ocupaciones = useSelector(state => state.select.ocupaciones)
    const [departamentoValue, setDepartamentoValue] = useState(null)
    const [nacimimentoValue, setNacimientoValue] = useState()
    const [ciudadesFiltradas, setciudadesFiltradas] = useState([])
    const [ocupacionesFiltradas, setOcupacionesFiltradas] = useState([])

    const nombreValue = useRef()
    const depto = useRef(null)
    const ciudadValue = useRef()
    const datebirthValue = useRef()
    const ocupacionValue = useRef()





    useEffect(()=>{
      if(userLogged){
        if(departamentos.length===0)
        {
        getDepartamentos(userLogged.apiKey, userLogged.id)
        .then(data=>{dispatch(fillDepartamentos(data.departamentos))
        console.log(departamentos)

        }).catch(e=>{console.error(e.message)})
        }
      } 
    },[])

    useEffect(()=>{
        if(ciudades.length===0)
        {
        getCiudades(apikey, id)
        .then(data=>{dispatch(fillCiudades(data.ciudades))
          console.log(data)
          console.log(data.ciudades)
        }).catch(e=>{
          console.error(e.message)})
    }},[])

    useEffect(()=>{
        if(!ocupaciones.length>0)
        {
        getOcupaciones(apikey, id)
        .then(data=>{dispatch(fillOcupaciones(data.ocupaciones))
        }).catch(e=>{console.error(e.message)})
    }},[])

    useEffect(()=>{
      setciudadesFiltradas(ciudades.filter((option) => option.idDepartamento === Number.parseInt(depto.current.value)));
      console.log(depto.current.value)
  },[departamentoValue])

  useEffect(()=>{mostrarOcupaciones()},[nacimimentoValue])



    const departamentoValueChange = (event) => {
      console.log(event.target.value)
      setDepartamentoValue(Number.parseInt(event.target.value));
      console.log(departamentoValue)
      console.log(ciudadesFiltradas)
    };

    const nacimientoValueChange = (event) => {
      setNacimientoValue((event.target.value));
      console.log(event.target.value, Date(event.target.value) ) //tipo dato
    }

    const mostrarOcupaciones = () => {
      console.log(Date(datebirthValue.current.value));
      if(calculoEdad((datebirthValue.current.value)) >= 18){
        setOcupacionesFiltradas(ocupaciones);
        console.log(ocupacionesFiltradas)
      }else{
        setOcupacionesFiltradas(ocupaciones.filter(ocu => ocu.id === 5));
        console.log(ocupacionesFiltradas)
      }
    }

    const calculoEdad = fechaNac =>{
      let fechaNacimientoUser = new Date(fechaNac);
      let fechaActual = new Date();
      let edad = fechaActual.getFullYear() - fechaNacimientoUser.getFullYear();

      let mesNac = fechaNacimientoUser.getMonth();
      let diaNac = fechaNacimientoUser.getDate();
      let mesActual = fechaActual.getMonth;
      let diaActual = fechaActual.getDate();

      if(mesActual < mesNac || (mesActual === mesNac && diaActual < diaNac)){
        edad--;
      }
      console.log(fechaNac, fechaActual, fechaNacimientoUser)
      return edad;
    }
    


const _isEmptyForm = () => {
  return (
    nombreValue.current.value.length === 0 ||
    depto.current.value.length === 0||
    ciudadValue.current.value.length===0||
    ocupacionValue.current.value.length===0
  )
}

const _onAgregarPersona = e => {
  e.preventDefault()
  console.log(nombreValue.current.value, nombreValue.current.value.length)
  if (!_isEmptyForm()) {
    setShowAlert(true)

    let persona = {
      "id": userLogged.id,
      "nombre": nombreValue.current.value,
      "departamento": Number.parseInt(depto.current.value),
      "ciudad": Number.parseInt(ciudadValue.current.value),
      "fechaNacimiento": datebirthValue.current.value,
      "ocupacion": Number.parseInt(ocupacionValue.current.value),
      "idUsuario": userLogged.id      
    }

    fetchRegister(apikey, id, persona)
      .then(personaData => {
        setMessage('Registro exitoso')
        setClassColor('success')
        persona.id = personaData.idCenso;        
        dispatch(agregarUnCensado(persona))

        setTimeout(() => {
        }, 2000)
      })
      .catch(e => {
        setShowAlert(true)
        setMessage(e.message)
        setClassColor('danger')
      })
  } else {
    setShowAlert(true)
    setMessage('Por favor complete los campos')
    setClassColor('danger')
  }
}


  return (
<div>
<form className='mb-3'>
{showAlert ? <Alert classColor={classColor} message={message} /> : ''}




<br />
<Box sx={{ minWidth: 120 }}>
<FormControl fullWidth>
<input
    type={'text'}
    className='form-select'
    id='nombreInput'
    placeholder='Nombre...'
    ref={nombreValue}
  /> <br />
</FormControl>
      <FormControl fullWidth>
      
      
        <select className='form-select' id='departamentoSelect' ref={depto} onChange={departamentoValueChange}>
    <option selected value="0">
        Seleccione un Departamento
      </option>
      {departamentos.map((option) => (
        <option key={option.id} value={option.id}>
          {option.nombre}
        </option> 
        ))}
    </select>
        <br />

      </FormControl>
      <FormControl fullWidth>

      <select className='form-select' id='ciudadSelect' ref={ciudadValue}>
      <option selected value="0">
        Seleccione una Ciudad
      </option>
      {ciudadesFiltradas.map((option) =>(
        <option key={option.id} value={option.id}>
          {option.nombre}
        </option> 
        ))}
    </select>
        <br />
      </FormControl>
     

      <FormControl fullWidth>
    <input
      type='date'
      className='form-control'
      id='datebirth'
      ref={datebirthValue}
      onChange={nacimientoValueChange}
    />
      <br />
  </FormControl>



      <FormControl fullWidth>
      
      <select className='form-select' id='ocupacionSelect' ref={ocupacionValue}>
      <option selected value="0">
        Seleccione una ocupacion
      </option>
      {ocupacionesFiltradas.map((option) =>(
        <option key={option.id} value={option.id}>
          {option.ocupacion}
        </option> 
        ))}
    </select>
      <br />
      </FormControl>

      <Button onClick={_onAgregarPersona } variant="outlined" color="success">+ Add</Button>
    </Box>

  



</form>
</div>

  )}

export default AgregarPersonaForm;