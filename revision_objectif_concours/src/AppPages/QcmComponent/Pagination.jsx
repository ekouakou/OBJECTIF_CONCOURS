// Pagination.js
import React from 'react';
import { Pagination as RSuitePagination } from 'rsuite';
import '../styles.css';

const Pagination = ({ activePage, totalPages, onSelect }) => {
  return (
    <div className="pagination-container">
      <RSuitePagination
        prev
        last
        next
        first
        size="md"
        total={totalPages * 10}
        limit={10}
        maxButtons={5}
        activePage={activePage}
        onChangePage={onSelect}
      />
      <div className="page-info">
        Page {activePage} sur {totalPages}
      </div>
    </div>
  );
};

export default Pagination;