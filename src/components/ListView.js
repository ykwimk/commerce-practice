import React from 'react';
import classNames from 'classnames';
import style from './ListView.scss';
import FilterView from './FilterView';
import CardView from './CardView';

const cx = classNames.bind(style)

const ListView = ({ filter, list, onClickFilter, onClickAddCart }) => {
  return (
    <div className={cx("wrapper")}>
      <FilterView
        filter={filter}
        onClickFilter={onClickFilter}
      />
      <div className={cx("list")}>
        {list.map((item, idx) => (
          <CardView
            isList
            key={idx}
            item={item}
            onClickAddCart={onClickAddCart}
          />
        ))}
      </div>
    </div>
  )
}

export default ListView;