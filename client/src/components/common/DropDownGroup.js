import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const DropDownGroup = ({
  name,
  label,
  error,
  info,
  onChange,
  disabled,
  selected,
  options
}) => {
  return (
    <div className="input">
      <label className="input__label" htmlFor={name}>
        {label}
      </label>
      <select
        className={classnames("select__field", {
          "input__invalid-input": error
        })}
        name={name}
        onChange={onChange}
        disabled={disabled}
        defaultValue={selected}
      >
        {options.map(opt => {
          return (
            <option key={opt.val} value={opt.val}>
              {opt.display}
            </option>
          );
        })}
      </select>
      {info && <p className="input__info">{info}</p>}
      {error && <p className="input__error">{error}</p>}
    </div>
  );
};

DropDownGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  selected: PropTypes.string,
  options: PropTypes.array.isRequired
};

DropDownGroup.defaultProps = {
  type: "text",
  disabled: false
};

export default DropDownGroup;
