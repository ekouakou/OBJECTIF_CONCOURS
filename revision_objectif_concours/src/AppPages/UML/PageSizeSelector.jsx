// PageSizeSelector.js
import React from 'react';
import { SelectPicker } from 'rsuite';

const PageSizeSelector = ({ value, onChange }) => {
  const options = [
    { label: '5 par page', value: 5 },
    { label: '10 par page', value: 10 },
    { label: '15 par page', value: 15 },
    { label: '20 par page', value: 20 },
    { label: 'Tout afficher', value: 999 }
  ];

  return (
    <div className="page-size-selector">
      <span>Afficher : </span>
      <SelectPicker 
        data={options}
        value={value}
        onChange={onChange}
        cleanable={false}
        searchable={false}
        style={{ width: 140 }}
      />
    </div>
  );
};

export default PageSizeSelector;