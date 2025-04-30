import React from 'react';
import { Pagination as RSuitePagination } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

const Pagination = ({ activePage, totalPages, onSelect }) => {
  return (
    <div className="pagination-wrapper">
      <RSuitePagination
        prev
        next
        first
        last
        ellipsis
        boundaryLinks
        maxButtons={5}
        size="md"
        layout={['total', '-', 'pager', 'skip']}
        total={totalPages}
        limit={1}
        activePage={activePage}
        onChangePage={onSelect}
      />
    </div>
  );
};

export default Pagination;