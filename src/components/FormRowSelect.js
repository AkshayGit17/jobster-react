const FormRowSelect = ({ name, id, value, onChange, labelText, options }) => {
  return (
    <div className="form-row">
      <label htmlFor={id} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        className="form-select"
      >
        {options.map((option, index) => {
          return (
            <option key={index} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
