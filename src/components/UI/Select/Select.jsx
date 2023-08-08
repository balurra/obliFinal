const Select = ({ options }, func) => {

  return (
    <select className="form-control" onChange={func} >
      <option selected value="0">
        Seleccione una opción
      </option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.nombre}
        </option>
      ))}
    </select>
  );
};

Select.defaultProps = {
  options: [],
};

export default Select;
