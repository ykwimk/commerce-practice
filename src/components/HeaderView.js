import React from 'react';
import './HeaderView.css';

const HeaderView = ({ page, cartList, onClickTab }) => {
  return (
    <header>
      <h1>과일</h1>
      <div className="buttonWrap">
        <button
          type="button"
          className={page === 'list' ? 'active' : ''}
          onClick={() => onClickTab('list')}
        >상품목록</button>
        <button
          type="button"
          className={page === 'cart' ? 'active': ''}
          onClick={() => onClickTab('cart')}
        >
          장바구니
          {cartList && cartList.length > 0 &&
            <span className="count">{cartList}</span>
          }
        </button>
      </div>
    </header>
  )
}

export default HeaderView;