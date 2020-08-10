import React from 'react';
import classNames from 'classnames';
import style from './ListView.scss';
import FilterView from './FilterView';
import CardView from './CardView';

const cx = classNames.bind(style)

const ListView = ({
  filter, list, normalFruits, newFruits,
  onClickFilter, onClickAddCart, onClickRemoveCart
}) => {
  let fruitsList
  if (filter === 0) {
    fruitsList = list
  } else if (filter === 1) {
    fruitsList = normalFruits
  } else {
    fruitsList = newFruits
  }

  return (
    <div className={cx("wrapper")}>
      <FilterView
        filter={filter}
        onClickFilter={onClickFilter}
      />
      <div className={cx("listWrap")}>
        <ul className="list">
          {fruitsList.map((item, idx) => (
            <CardView
              isList
              key={idx}
              item={item}
              onClickAddCart={onClickAddCart}
              onClickRemoveCart={onClickRemoveCart}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ListView;