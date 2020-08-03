import React from 'react';
import './CardView.css';

const CardView = ({ isList, item, onClickAddCart }) => {
  const { id, name, image, stock, price, isNew } = item
  return (
    <div className="card">
      {isNew && <i className="new">new</i>}
      <div className="content">
        <div className="image">{image}</div>
        <div className="text">
          <div className="title">{name}</div>
          <div className="price">{`${price.toLocaleString()}원`}</div>
          <ul>
            {isList &&
              <li>
                <span className="subject">잔량</span>
                <span className="count">{stock}</span>
              </li>
            }
            <li>
              <span className="subject">수량</span>
              <span className="count">5</span>
            </li>
            {!isList &&
              <li className="productPrice">
                <span className="subject">상품금액</span>
                <span className="count">25,000원</span>
              </li>
            }
          </ul>
        </div>
      </div>
      <div className="buttonWrap">
        {isList
          ? <>
              <button
                type="button"
                className="subtract"
              >빼기</button>
              <button
                type="button"
                className="add"
                onClick={() => onClickAddCart(id)}
              >담기</button>
            </>
          : <button
              type="button"
              className="subtract"
            >취소</button>
        }
      </div>
    </div>
  )
}

export default CardView;