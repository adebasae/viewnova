import React from 'react';

// import classes from './Input.css';

const input = (props: any) => {
  let inputEl: any = null;
  const inputClasses: any = ['InputElement'];
  const {
    invalid,
    shouldValidate,
    touched,
    elementType,
    elementConfig,
    value,
    changed,
    label,
    classN,
    blur,
    keyDown,
    errores,
    idLabel,
  } = props;

  inputClasses.push(classN);
  inputClasses.push('form-control');
  if (invalid && shouldValidate && touched) {
    inputClasses.push('Invalid');
  }

  function error() {
    if (errores === undefined || errores.length === 0) return null;
    const erroresShow = errores.map((err: any) => {
      return (
        <>
          <span className="span-error">{err}</span>
          <br />
        </>
      );
    });
    return <div>{erroresShow}</div>;
  }

  switch (elementType) {
    case 'input':
      inputEl = (
        <input
          id={idLabel}
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={changed}
          onBlur={blur}
          onKeyDown={keyDown}
        />
      );
      break;
    case 'number':
      inputEl = (
        <input
          id={idLabel}
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={changed}
          onBlur={blur}
          onKeyDown={keyDown}
          type="number"
        />
      );
      break;
    case 'checkbox':
      inputEl = (
        <input
          id={idLabel}
          className={inputClasses.join(' ')}
          {...elementConfig}
          onClick={changed}
          onBlur={blur}
          onKeyDown={keyDown}
          checked={value}
        />
      );
      break;
    case 'textarea':
      inputEl = (
        <textarea
          id={idLabel}
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
      break;
    case 'select':
      inputEl = (
        <select
          id={idLabel}
          className={inputClasses.join(' ')}
          value={value}
          onChange={changed}
        >
          {elementConfig.options.map((option: any) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputEl = (
        <input
          id={idLabel}
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={changed}
          onBlur={blur}
        />
      );
  }

  return (
    <>
      {/* <div className="Input"> */}
      {label ? (
        <>
          <label
            htmlFor={idLabel}
            className={
              elementType !== 'checkbox' ? 'control-label' : 'checkgroup'
            }
          >
            {label}

            {elementType === 'checkbox' && (
              <>
                {inputEl} <span className="checkmark" />
              </>
            )}
          </label>
          {elementType !== 'checkbox' && (
            <div className="form-control-block">{inputEl}</div>
          )}
        </>
      ) : (
        <div className="form-control-block">{inputEl}</div>
      )}
      {error()}
      {/* </div> */}
    </>
  );
};

export default input;
