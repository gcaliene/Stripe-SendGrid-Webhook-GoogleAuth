// SurveyField contains logic to render a single label and text input

import React from 'react';

//export default props => {
//console.log(props.input);
//or use es6 destructuring and nested destructuring
export default ({ input, label, meta: { error, touched } }) => {
  //console.log(meta);
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: '0px' }} />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  );
};
// {...input} same as onBlur={input.onBlur}
