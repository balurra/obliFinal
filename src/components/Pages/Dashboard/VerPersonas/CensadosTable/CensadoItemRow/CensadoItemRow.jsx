import { useSelector, useDispatch } from "react-redux"
import { deleteRegister } from "../../../../../../services/censoAPI"
import { deleteCensado } from "../../../../../../app/slices/censadosSlice"
import Button from "../../../../../UI/Button"
import { useEffect, useState } from "react"

const CensadoItemRow = ({id, nombre}) => {
  const dispatch = useDispatch()
  const userLogged = useSelector(state => state.user.userLogged)
  const ocupaciones = useSelector(state => state.select.ocupaciones)
  let ocupacionesClaves={}

  useEffect(() => {
    ocupacionesClaves = ocupaciones.map(o=>{
      ocupacionesClaves[o.id] = o.ocupacion
    })
    console.log(ocupacionesClaves);

  }, [])
  

  const _onDelete = () => {
    console.log(id);
    deleteRegister(id, userLogged.apiKey, userLogged.id).then((r) => {
      console.log(r);
      dispatch(deleteCensado(Number.parseInt(id)))
    })
  }

  return (
    <tr>
      <th scope='row'>{id}</th>
      <td>{nombre}</td>
      <td>
        <Button
          cta={'Delete'}
          classColor='btn-danger'
          onHandleClick={_onDelete}
        />
      </td>
    </tr>
  )
}

export default CensadoItemRow