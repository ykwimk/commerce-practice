import React from 'react';
import './FilterView.css';

const FilterView = ({ filter, onClickFilter }) => {
  return (
    <div className="filter">
      <button
        type="button"
        className={filter === 0 ? 'active' : ''}
        onClick={() => onClickFilter(0)}
      >
        전체
      </button>
      <button
        type="button"
        className={filter === 1 ? 'active' : ''}
        onClick={() => onClickFilter(1)}
      >
        일반 과일
      </button>
      <button
        type="button"
        className={filter === 2 ? 'active' : ''}
        onClick={() => onClickFilter(2)}
      >
        <i>new</i> 과일
      </button>
    </div>
  )
}

export default FilterView;