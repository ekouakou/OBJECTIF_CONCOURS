import React from 'react';
import { InputGroup, Input } from 'rsuite';
import { Search, Close } from '@rsuite/icons'; // You'll need to install @rsuite/icons

const SearchBar = ({ value, onChange, onClear }) => {
  return (
    <div className="search-container">
      <InputGroup inside className="search-input-group">
        <Input 
          placeholder="Rechercher des questions..."
          value={value}
          onChange={onChange}
        />
        {value ? (
          <InputGroup.Button 
            onClick={onClear}
            className="clear-search-btn"
          >
            <Close />
          </InputGroup.Button>
        ) : (
          <InputGroup.Addon>
            <Search />
          </InputGroup.Addon>
        )}
      </InputGroup>
    </div>
  );
};

export default SearchBar;