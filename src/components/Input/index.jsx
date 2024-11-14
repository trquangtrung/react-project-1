import React, { forwardRef, useImperativeHandle, useRef } from "react";

const Input = ({ label, required, error, renderInput, ...rest }, ref) => {
  const interalInputRef = useRef();
  useImperativeHandle(ref, () => {
    return {
      focus: () => interalInputRef?.current?.focus(),
      getValue: () => interalInputRef?.current?.value,
      getName: () => interalInputRef?.current?.name,
      getError: () => error,
    };
  });
  return (
    <div className="form-group">
      <label className="label">
        {label} {required && <span>*</span>}
      </label>
      {renderInput?.({ ...rest, error }) || (
        <input
          {...rest}
          ref={interalInputRef}
          className={`form__input ${error ? "formerror" : ""}`}
        />
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default forwardRef(Input);
