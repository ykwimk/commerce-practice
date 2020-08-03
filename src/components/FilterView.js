import React from 'react';
import classNames from 'classnames';
import style from './FilterView.scss';

const cx = classNames.bind(style)

const FilterView = ({ filter, onClickFilter }) => {
  return (
    <div className={cx('filter')}>
      <button
        type="button"
        className={cx(filter === 0 ? 'active' : '')}
        onClick={() => onClickFilter(0)}
      >
        전체
      </button>
      <button
        type="button"
        className={cx(filter === 1 ? 'active' : '')}
        onClick={() => onClickFilter(1)}
      >
        일반 과일
      </button>
      <button
        type="button"
        className={cx(filter === 2 ? 'active' : '')}
        onClick={() => onClickFilter(2)}
      >
        <i>new</i> 과일
      </button>
    </div>
  )
}

export default FilterView;