import React from 'react';
import './CartView.css';
import CardView from './CardView';

const CartView = ({ list }) => {
  return (
    <div className="wrapper">
      <div className="cart">
        {list.map((item, idx) => (
          <CardView
            isCart
            key={idx}
            item={item}
          />
        ))}
      </div>
      <div className="priceWrap">
        <div className="content">
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
              <tr className="total">
                <th>총 상품금액</th>
                <td>93,500원</td>
              </tr>
            </tbody>
          </table>
          <button
            type="button"
            className="payment"
          >
            결제하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartView;