import React from 'react';
import classNames from 'classnames';
import style from './HeaderView.scss';

const cx = classNames.bind(style)

const HeaderView = ({ page, cartList, onClickTab }) => {
  return (
    <header>
      <h1>과일</h1>
      <div className={cx('buttonWrap')}>
        <button
          type="button"
          className={cx(page === 'list' ? 'active' : '')}
          onClick={() => onClickTab('list')}
        >상품목록</button>
        <button
          type="button"
          className={cx(page === 'cart' ? 'active': '')}
          onClick={() => onClickTab('cart')}
        >
          장바구니
          {cartList && cartList.length > 0 &&
            <span className={cx('count')}>{cartList}</span>
          }
        </button>
      </div>
    </header>
  )
}

export default HeaderView;