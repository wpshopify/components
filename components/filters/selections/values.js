import React from 'react';
import { IconRemove } from "../../../common/icons/icon-remove.jsx";

function FilterSelectionsValue({ val }) {

   function removeValue(val) {
      console.log('valvalvalval', val);
   }

   return (
      <span className="wps-filter-selection-value" onClick={e => removeValue(val)}> {val} <IconRemove /> </span>
   )

}

function FilterSelectionsValues({ vals }) {
   return vals.map(val => <FilterSelectionsValue key={val} val={val} />);
}

export {
   FilterSelectionsValues
}