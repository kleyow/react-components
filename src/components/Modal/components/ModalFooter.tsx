import classnames from "classnames";
import Button from "components/Button";

export interface ModalFooterProps {
  onSubmit?: () => void;
  isSubmitDisabled?: boolean;
  submitLabel?: string;

  onCancel?: () => void;
  isCancelDisabled?: boolean;
  cancelLabel?: string;

  defaultView?: boolean;
  children?: React.ReactNode;
}
export default function ModalFooter({
  onSubmit,
  isSubmitDisabled,
  submitLabel = "Submit",
  onCancel,
  isCancelDisabled,
  cancelLabel = "Cancel",
  defaultView,
  children,
}: ModalFooterProps) {
  const className = classnames([
    "rc-modal__footer",
    defaultView && `rc-modal__footer--default-view`,
  ]);
  return (
    <div className={className}>
      {children}
      {(onCancel || onSubmit) && (
        <div className="rc-modal__footer__buttons">
          {onCancel && (
            <Button
              className="rc-modal__footer__button"
              disabled={isCancelDisabled}
              label={cancelLabel}
              onClick={onCancel}
              noFill
              kind="danger"
            />
          )}
          {onSubmit && (
            <Button
              className="rc-modal__footer__button"
              disabled={isSubmitDisabled}
              label={submitLabel}
              onClick={onSubmit}
            />
          )}
        </div>
      )}
    </div>
  );
}
