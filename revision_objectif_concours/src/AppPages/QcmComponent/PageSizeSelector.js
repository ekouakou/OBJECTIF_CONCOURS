import React from 'react';
import { SelectPicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

const PageSizeSelector = ({ value, onChange, disabled }) => {
  const options = [
    { label: '5 questions par page', value: 5 },
    { label: '10 questions par page', value: 10 },
    { label: '20 questions par page', value: 20 },
    { label: 'Tout afficher', value: 999 }
  ];

  return (
    <div className="page-size-selector">
      <label htmlFor="page-size-select">Afficher: </label>
      <SelectPicker
        id="page-size-select"
        data={options}
        value={value}
        onChange={onChange}
        cleanable={false}
        searchable={false}
        disabled={disabled}
        size="md"
        style={{ width: 180 }}
      />
    </div>
  );
};

export default PageSizeSelector;