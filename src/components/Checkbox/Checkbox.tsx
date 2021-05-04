import classnames from "classnames";
import React, { ChangeEvent } from "react";
import "./Checkbox.scss";

export interface CheckboxProps {
  style: React.CSSProperties;
  className: string;
  label: string;
  name?: string;
  id?: string;
  checked?: boolean;
  semi?: boolean;
  round?: boolean;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function Checkbox({
  style,
  className,
  label,
  name,
  id,
  checked = false,
  semi = false,
  round = false,
  disabled = false,
  onChange,
}: CheckboxProps) {
  const [isChecked, setChecked] = React.useState(checked);
  React.useEffect(() => {
    setChecked(checked);
  }, [checked]);

  const wrapperClassName = classnames([
    "mb-input",
    "input-checkbox__wrapper",
    className,
  ]);
  const checkboxClassName = classnames([
    "input-checkbox",
    semi && "input-checkbox--semi-checked",
    round && "input-checkbox--round",
    !label && "input-checkbox--no-margin",
  ]);
  const labelClassName = classnames([
    "input-checkbox__label",
    disabled && "input-checkbox__label--disabled",
  ]);
  return (
    <label className={wrapperClassName} style={style}>
      <input
        type="checkbox"
        id={id}
        name={name}
        className={checkboxClassName}
        onChange={(e) => {
          setChecked(!isChecked);
          onChange(e);
        }}
        checked={isChecked && semi !== true}
        disabled={disabled}
      />
      {label && <span className={labelClassName}>{label}</span>}
    </label>
  );
}

export default React.memo(Checkbox);
