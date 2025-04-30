import React from 'react';
import { InputGroup, Input, Button } from 'rsuite';
import { Search, Close } from '@rsuite/icons';
import 'rsuite/dist/rsuite.min.css';

const SearchBar = ({ value, onChange, onClear, disabled }) => {
  return (
    <div className="search-bar">
      <InputGroup inside>
        <Input
          value={value}
          onChange={onChange}
          placeholder="Rechercher dans les questions..."
          disabled={disabled}
        />
        <InputGroup.Button
          onClick={value ? onClear : null}
          disabled={disabled || !value}
        >
          {value ? <Close /> : <Search />}
        </InputGroup.Button>
      </InputGroup>
    </div>
  );
};

export default SearchBar;