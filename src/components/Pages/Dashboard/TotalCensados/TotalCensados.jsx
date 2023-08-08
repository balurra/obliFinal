import { useDispatch, useSelector } from "react-redux";
import { fillCensados } from "../../../../app/slices/censadosSlice";
import { getPersonas } from "../../../../services/censoAPI";
import { useEffect } from "react";


const TotalCensados = () => {
  const dispatch = useDispatch()
  const censados = useSelector((state) => state.censados.censados);
  const userLogged = useSelector((state) => state.user.userLogged);

  const _getMontevideanos = () => {
    return censados.filter((option) => option.departamento === 3218).length;
  };
  

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

  return (
    <div className="container totalCensados">
      <div className="row">
        <div className="col-sm">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                Total de Personas Censadas por el usuario:
              </h5>
              <p className="card-text">
                <span className="badge bg-secondary">{censados.length}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                Total de Personas Censadas en Montevideo:
              </h5>
              <p className="card-text">
                <span className="badge bg-secondary">
                  {_getMontevideanos()}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                Total de Personas Censadas en el resto del País:
              </h5>
              <p className="card-text">
                <span className="badge bg-secondary">
                  {censados.length - _getMontevideanos()}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalCensados;