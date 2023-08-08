import { useSelector } from 'react-redux'
import Alert from '../../../../UI/Alert'
import CensadoItemRow from './CensadoItemRow'
import { useState } from 'react'

const CensadosTable = () => {
  const censados = useSelector(state => state.censados.censados)


  
  

  return (
    <table className='table table-hover'>
      <thead>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>Nombre</th>
          <th scope='col'>Delete</th>
        </tr>
      </thead>
      <tbody>
        {censados.length > 0 ? (
          censados.map(({ id, nombre }) => (
            <CensadoItemRow id={id} nombre={nombre}/>
          ))
        ) : (
          <Alert
            classColor={'primart'}
            message={'Aún no tienes personas censadas...'}
          />
        )}
      </tbody>
    </table>
  )
}

export default CensadosTable