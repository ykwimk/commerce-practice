import React from 'react';
import classNames from 'classnames';
import style from './CartView.scss';
import CardView from './CardView';

const cx = classNames.bind(style)

const CartView = ({ cartList, onClickCancelCart }) => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("cart")}>
        <ul className="list">
          {cartList.map((item, idx) => (
            <CardView
              isCart
              key={idx}
              item={item}
              onClickCancelCart={onClickCancelCart}
            />
          ))}
        </ul>
      </div>
      <div className={cx("priceWrap")}>
        <div className={cx("content")}>
          <table cellPadding="0" cellSpacing="0">
            <tbody>
              <tr>
                <th><i>new</i> 과일</th>
                <td>8,500원</td>
              </tr>
              <tr>
                <th>일반 과일</th>
                <td>8,500원</td>
              </tr>
              <tr className={cx("total")}>
                <th>총 상품금액</th>
                <td>93,500원</td>
              </tr>
            </tbody>
          </table>
          <button
            type="button"
            className={cx("payment")}
          >
            결제하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartView;