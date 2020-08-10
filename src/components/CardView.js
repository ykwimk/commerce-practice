import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import style from './CardView.scss';

const cx = classNames.bind(style)

const CardView = ({ isList, item, onClickAddCart, onClickRemoveCart, onClickCancelCart }) => {
  const { name, image, stock, price, isNew } = item
  return (
    <li className={cx('card')}>
      {isNew && <i className={cx('new')}>new</i>}
      <div className={cx('content')}>
        <div className={cx('image')}>{image}</div>
        <div className={cx("text")}>
          <div className={cx("title")}>{name}</div>
          <div className={cx("price")}>{`${price.toLocaleString()}원`}</div>
          <ul>
            {isList &&
              <li>
                <span className={cx("subject")}>잔량</span>
                <span className={cx("count")}>{stock}</span>
              </li>
            }
            <li>
              <span className={cx("subject")}>수량</span>
              <span className={cx("count")}>
                {_.has(item, 'quantity') ? item.quantity : 0}
              </span>
            </li>
            {!isList &&
              <li className={cx("productPrice")}>
                <span className={cx("subject")}>상품금액</span>
                <span className={cx("count")}>
                  {`${(item.quantity * price).toLocaleString()}원`}
                </span>
              </li>
            }
          </ul>
        </div>
      </div>
      <div className={cx("buttonWrap")}>
        {isList
          ? <>
              <button
                type="button"
                className={cx("subtract")}
                disabled={!_.has(item, 'quantity') || item.quantity <= 0 ? true : false}
                onClick={(e) => onClickRemoveCart(e, item)}
              >빼기</button>
              <button
                type="button"
                className={cx("add")}
                disabled={item.stock <= 0 ? true : false}
                onClick={(e) => onClickAddCart(e, item)}
              >담기</button>
            </>
          : <button
              type="button"
              className={cx("subtract")}
              onClick={(e) => onClickCancelCart(e, item)}
            >취소</button>
        }
      </div>
    </li>
  )
}

export default CardView;