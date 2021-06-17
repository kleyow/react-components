import React from "react";
import classnames from "classnames";
import Row, { RowProps as RawRowProps } from "../../Flexbox/Row";
import Column, { ColumnProps as RawColumnProps } from "../../Flexbox/Column";
import type { FormFieldProps } from "../shared";

interface RowProps extends RawRowProps {
  direction: "row";
}

interface ColumnProps extends RawColumnProps {
  direction: "column";
}

type WhichProps = RowProps | ColumnProps;

type FormFieldsProps = WhichProps & {
  outerDirection?: "row" | "column";
  className?: string;
  style?: React.CSSProperties;
  children: (
    | React.ReactElement<FormFieldProps>
    | React.ReactElement<FormFieldsProps>
  )[];
};

function isRow(props: WhichProps): props is RowProps {
  return props.direction === "row";
}

function FormFields({
  outerDirection,
  className,
  style,
  ...props
}: FormFieldsProps) {
  const childrenArray = React.Children.toArray(
    props.children
  ) as React.ReactElement<FormFieldProps>[];

  const rowColClassName = classnames([
    `rc-formfields--${props.direction}`,
    outerDirection && `rc-formfields--${outerDirection}`,
    className,
  ]);

  const content = childrenArray.map((child) =>
    React.cloneElement(child, {
      ...child.props,
      outerDirection: props.direction,
    })
  );

  if (isRow(props)) {
    return (
      <Row
        className={rowColClassName}
        style={style}
        align={props.align || "bottom left"}
      >
        {content}
      </Row>
    );
  }

  return (
    <Column
      className={rowColClassName}
      style={style}
      align={props.align || "top left"}
    >
      {content}
    </Column>
  );
}

export default FormFields;
