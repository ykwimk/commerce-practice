import React from 'react';
import './ListView.css';
import FilterView from './FilterView';
import CardView from './CardView';

const ListView = ({ filter, list, onClickFilter, onClickAddCart }) => {
  return (
    <div className="wrapper">
      <FilterView
        filter={filter}
        onClickFilter={onClickFilter}
      />
      <div className="list">
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