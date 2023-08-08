
import {
  getTotalCensados,
  getPersonas,
  getOcupaciones,
} from "../../../../services/censoAPI";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Porcentaje from "./Porcentaje/Porcentaje";
import {
  fillCensadosGeneral,
  fillCensados,
} from "../../../../app/slices/censadosSlice";
import { fillOcupaciones } from "../../../../app/slices/selectSlice";
import GraficoDepto from "./GraficoDepto/GraficoDepto";
import GraficoOcupacion from "./GraficoOcupacion/GraficoOcupacion";

const Analisis = () => {
  const dispatch = useDispatch();
  const censados = useSelector((state) => state.censados.censados);
  const userLogged = useSelector((state) => state.user.userLogged);
  const totalCensados = useSelector((state) => state.censados.censadosGeneral);
  const departamentos = useSelector((state) => state.select.departamentos);
  const ocupaciones = useSelector((state) => state.select.ocupaciones);

  const contarTotalesDeptos = () => {
    const totalesDeptos = {};
    const nombresDeptos = nombreDepartamentos();
    console.log(nombresDeptos, censados);
    censados.forEach((option) => {
      const nombreDepto = nombresDeptos[option.departamento];
      if (totalesDeptos[nombreDepto] === undefined) {
        totalesDeptos[nombreDepto] = 1;
      } else {
        totalesDeptos[nombreDepto]++;
      }
    });
    return totalesDeptos;
  };

  const contarTotalesOcupaciones = () => {
    const totalesOcupaciones = {};
    const nombresOcupaciones = nombreOcupaciones();

    censados.forEach((option) => {
      const nombreOcu = nombresOcupaciones[option.ocupacion];
      if (totalesOcupaciones[nombreOcu] === undefined) {
        totalesOcupaciones[nombreOcu] = 1;
      } else {
        totalesOcupaciones[nombreOcu]++;
      }
    });
    return totalesOcupaciones;
  };

  const nombreDepartamentos = () => {
    const nombresDepartamentos = {};
    departamentos.forEach((option) => {
      nombresDepartamentos[option.id] = option.nombre;
    });
    return nombresDepartamentos;
  };

  const nombreOcupaciones = () => {
    const nombreOcupaciones = {};
    ocupaciones.forEach((option) => {
      nombreOcupaciones[option.id] = option.ocupacion;
    });
    return nombreOcupaciones;
  };

  useEffect(() => {
    if (censados.length === 0) {
      getPersonas(userLogged.apiKey, userLogged.id)
        .then((data) => {
          dispatch(fillCensados(data.personas));
        })
        .catch((e) => {
          console.error(e.message);
        });
    }
  }, []);

  useEffect(() => {
    if (totalCensados < 1) {
      getTotalCensados(userLogged.apiKey, userLogged.id)
        .then((data) => {
          dispatch(fillCensadosGeneral(data.total));
        })
        .catch((e) => {
          console.error(e.message);
        });
    }
  });

  useEffect(() => {
    if (ocupaciones.length === 0) {
      getOcupaciones(userLogged.apiKey, userLogged.id)
        .then((data) => {
          dispatch(fillOcupaciones(data.ocupaciones));
        })
        .catch((e) => {
          console.error(e.message);
        });
    }
  });

  return (
    <div className="container Analisis">
      <h5>ANALISIS</h5>
      <div className="row">
        <div className="col-8">
          <div className="card">
            <div className="card-body">
              <Porcentaje
                censados={censados.length}
                totalCensados={totalCensados}
              />
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card">
            <div className="card-body">
              <GraficoDepto totalesDeptos={contarTotalesDeptos()} />
            </div>
          </div>
        </div>
      </div>

      <div className="col-4">
        <div className="card">
          <div className="card-body">
            <GraficoOcupacion totalesOcupaciones={contarTotalesOcupaciones()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analisis;