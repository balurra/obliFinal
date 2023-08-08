const BASE_URL = 'https://censo.develotion.com';


const fetchLogin = async (username, password) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      usuario: username,
      password: password
    })
  };

  try {
    const response = await fetch(`${BASE_URL}/login.php`, requestOptions);
    if (response.status === 200) {
      return response.json().then((data) => {
        const { apiKey, id } = data;
        return Promise.resolve({
          apiKey,
          id
        });
      });
    }

    return Promise.reject({
      code: response.status,
      message: 'Ha ocurrido un error',
    });
  } catch (error) {
    return Promise.reject({
      message: error,
    });
  }
};


const fetchSignUp = async (username, password) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      usuario: username,
      password: password,
    }),
  };

  try {
    const response = await fetch(`${BASE_URL}/usuarios.php`, requestOptions);
    if (response.status === 200) {
      return response.json().then((data) => {
        const { apiKey, id } = data;
        return Promise.resolve({
          apiKey,
          id,
        });
      });
    }

    return Promise.reject({
      code: response.status,
      message: 'Ya existe un usuario registrado con ese nombre',
    });
  } catch (error) {
    return Promise.reject({
      message: error,
    });
  }
};


//Tiene que ir el user id y la apikey?//////////////////////////////////////???????????????????????????//////////////



const getDepartamentos = async (apiKey, id) => {
  
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'apikey': String(apiKey),
      'iduser': id,
    },
  };

  try {
    const reponse = await fetch(`${BASE_URL}/departamentos.php`, requestOptions);
    return reponse.json();
  } catch (e) {
    return Promise.reject({
      message: 'Ha ocurrido un error',
    });
  }
};

const getCiudades = async (apiKey, id) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'apikey': String(apiKey),
      'iduser': id,
    },
  };
  try {
    const reponse = await fetch(`${BASE_URL}/ciudades.php`, requestOptions);
    return reponse.json();
  } catch (e) {
    return Promise.reject({
      message: 'Ha ocurrido un error',
    });
  }
};

const getPersonas = async (apiKey, id) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'apikey': String(apiKey),
      'iduser': id,
    },
  };
  try {
    const reponse = await fetch(`${BASE_URL}/personas.php?idUsuario=${id}`, requestOptions);
    return reponse.json();
  } catch (e) {
    return Promise.reject({
      message: 'Ha ocurrido un error',
    });
  }
};

//obj param
const fetchRegister = async (apiKey, id, persona) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': String(apiKey),
      'iduser': id,
    },
    body: JSON.stringify({
      idUsuario: id,
      nombre: persona.nombre,
      departamento: persona.departamento,
      ciudad: persona.ciudad,
      fechaNacimiento: persona.fechaNacimiento,
      ocupacion: persona.ocupacion 
    }),
  };

  try {
    const response = await fetch(`${BASE_URL}/personas.php`, requestOptions);
    if (response.status === 200) {
      return response.json()
      // return response.json().then((data) => {
      //   const { idUsuario } = data;
      //   return Promise.resolve({
      //     idUsuario,
      //   });
      // });
    }

    return Promise.reject({
      code: response.status,
      message: 'Ha ocurrido un error',
    });
  } catch (error) {
    return Promise.reject({
      message: error,
    });
  }
}

const deleteRegister = async (idCenso, apiKey, id) => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'apikey': String(apiKey),
      'iduser': id,
    },
  };
  try {
    const reponse = await fetch(`${BASE_URL}/personas.php?idCenso=${idCenso}`,requestOptions);
    return reponse.json();
  } catch (e) {
    return Promise.reject({
      message: 'Ha ocurrido un error',
    });
  }
};


const getOcupaciones = async (apiKey, id) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'apikey': String(apiKey),
      'iduser': id,
    },
  };
  try {
    const reponse = await fetch(`${BASE_URL}/ocupaciones.php`, requestOptions);
    return reponse.json();
  } catch (e) {
    return Promise.reject({
      message: 'Ha ocurrido un error',
    });
  }
};

const getTotalCensados = async (apiKey, id) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'apikey': String(apiKey),
      'iduser': id,
    },
  };
  try {
    const reponse = await fetch(`${BASE_URL}/totalCensados.php`, requestOptions);
    return reponse.json();
  } catch (e) {
    return Promise.reject({
      message: 'Ha ocurrido un error',
    });
  }
};



export { fetchLogin, fetchSignUp, getDepartamentos, getCiudades, getPersonas, fetchRegister, deleteRegister, getOcupaciones, getTotalCensados };
