const FormRow = ({ type, name, id, value, onChange, labelText }) => {
  return (
    <div className="form-row">
      <label htmlFor={id} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        className="form-input"
      />
    </div>
  );
};

export default FormRow;
