import classnames from "classnames";
import Icon from "components/Icon";
import Arrow from "../../../resources/icons/arrow.svg";
import { isActivePath, MenuContext } from "../shared";
import { MenuItemProps } from "../types";
import "./MenuItem.scss";

export default function MenuItem({
  label,
  icon,
  fill,
  size = 14,
  to,
  path,
  disabled,
  hidden,
  active,
  back,
  partial,
}: MenuItemProps) {
  if (hidden) {
    return null;
  }
  let backIcon: React.ReactChild | null = null;
  if (back) {
    backIcon = (
      <Icon
        className="rc-menu-item__back-icon"
        icon={<Arrow />}
        size={10}
        fill="#999"
      />
    );
  }
  let itemIcon: React.ReactChild | null = null;

  if (icon) {
    itemIcon = (
      <div className="rc-menu-item__item-icon">
        <Icon
          className="rc-menu-item__icon"
          icon={icon}
          size={size}
          fill={fill}
        />
      </div>
    );
  }

  return (
    <MenuContext.Consumer>
      {({ pathname, onClick }) => {
        function doOnClick() {
          if (!disabled) {
            onClick((to || path) as string);
          }
        }

        const isActive =
          active || (isActivePath(pathname, path, partial) && !back);
        const className = classnames([
          "rc-menu-item",
          isActive && "rc-menu-item--active",
          disabled && "rc-menu-item--disabled",
          back && "rc-menu-item--back",
          icon && "rc-menu-item--with-icon",
        ]);
        return (
          <div className={className} onClick={doOnClick} role="presentation">
            {backIcon}
            {itemIcon}
            {label}
          </div>
        );
      }}
    </MenuContext.Consumer>
  );
}
