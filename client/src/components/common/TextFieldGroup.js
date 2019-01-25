import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  type,
  error,
  info,
  onChange,
  disabled
}) => {
  return (
    <div className="input">
      <label className="input__label" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        className={classnames("input__field", {
          "input__invalid-input": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <p className="input__info">{info}</p>}
      {error && <p className="input__error">{error}</p>}
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
};

TextFieldGroup.defaultProps = {
  type: "text",
  disabled: false
};

export default TextFieldGroup;
