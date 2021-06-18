import classnames from "classnames";
import Icon from "components/Icon";
import { getSmallerIconSizeByComponentSize } from "utils/size";
import InfoSmall from "../../../resources/icons/info-small.svg";
import { Size } from "../../../types";

export interface LabelProps {
  size?: `${Size}`;
  label?: string;
  required?: boolean;
  complete?: boolean;
}

export default function Label({
  size = "large",
  label,
  required,
  complete,
}: LabelProps) {
  if (!label) {
    return null;
  }

  const className = classnames([
    "rc-formfield__label",
    `rc-formfield__label--${size}`,
  ]);
  return (
    <label className={className}>
      {required && (
        <Icon
          className="rc-formfield__label__icon"
          size={getSmallerIconSizeByComponentSize(size)}
          icon={<InfoSmall />}
          fill={complete ? "#39f" : "#f93"}
        />
      )}
      <span className={`rc-formfield__label__text--${size}`}>{label}</span>
    </label>
  );
}
