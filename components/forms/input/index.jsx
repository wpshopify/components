/** @jsx jsx */
import { jsx, css } from '@emotion/react';

function Input({
  label,
  name,
  isRequired,
  type,
  value,
  onChange,
  placeholder,
  cssWrapper,
  cssInput,
  isSubmitting,
}) {
  return (
    <div className='wpshopify-input-wrapper' css={cssWrapper}>
      {label && <label htmlFor={`wpshopify-input-${name}`}>{label}</label>}

      <input
        required={isRequired}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`wpshopify-input wpshopify-input-${name}`}
        id={`wpshopify-input-${name}`}
        css={cssInput}
        disabled={isSubmitting}
      />
    </div>
  );
}

export { Input };
