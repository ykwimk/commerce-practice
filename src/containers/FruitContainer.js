import React from 'react';
import _ from 'lodash';
import axios from 'axios';
import ListView from '../components/ListView';
import CartView from '../components/CartView';
import HeaderView from '../components/HeaderView';

class FruitContainer extends React.Component {
  state = {
    page: 'list',
    filter: 0,
    list: [],
    normalFruits: [],
    newFruits: [],
    cartList: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    axios.get('http://localhost:3001/fruits')
    .then((response) => {
      const fruits = response.data
      this.setState({
        list: [..._.sortBy(fruits, (o) => [!o.isNew, o.id])],
        normalFruits: [...fruits.filter(v => !v.isNew)],
        newFruits: [...fruits.filter(v => v.isNew)]
      })
    })
    .catch(err => console.log(err))
  }

  onClickTab = (page) => {
    this.setState({ page })
  }

  onClickFilter = (filter) => {
    this.setState({ filter, })
  }

  onClickAddCart = (e, item) => {
    e.preventDefault()
    e.stopPropagation()

    const { cartList } = this.state
    let cartAddArray = cartList
    const checkCart = cartList.some(i => i.id === item.id)
    if (checkCart) {
      const cartItemIdx = cartList.findIndex(i => i.id === item.id)
      cartList[cartItemIdx].stock -= 1
      cartList[cartItemIdx].quantity += 1
      this.setState({
        cartList: [...cartList]
      })
    } else {
      cartAddArray.push(item)
      const cartItemIdx = cartAddArray.findIndex(i => i.id === item.id)
      cartList[cartItemIdx].stock -= 1
      cartAddArray[cartItemIdx].quantity = 1
      this.setState({
        cartList: [...cartAddArray],
      })
    }
  }

  onClickRemoveCart = (e, item) => {
    e.preventDefault()
    e.stopPropagation()

    const { cartList } = this.state
    let cartRemoveArray = cartList
    const cartItemIdx = cartList.findIndex(i => i.id === item.id)
    cartList[cartItemIdx].stock += 1
    cartList[cartItemIdx].quantity -= 1
    if (item.quantity < 1) {
      cartRemoveArray.splice(cartItemIdx, 1)
      this.setState({
        cartList: cartRemoveArray
      })
    } else {
      this.setState({
        cartList: [...cartList]
      })
    }
  }

  onClickCancelCart = (e, item) => {
    e.preventDefault()
    e.stopPropagation()

    const { cartList } = this.state
    let cartCancelArray = cartList
    const cartItemIdx = cartList.findIndex(i => i.id === item.id)
    cartCancelArray.splice(cartItemIdx, 1)
    this.setState({
      cartList: cartCancelArray
    })
  }

  render() {
    const { page, filter, list, normalFruits, newFruits, cartList } = this.state
    if (_.isEmpty(list)) return null

    return (
      <>
        <HeaderView
          page={page}
          cartList={cartList}
          onClickTab={this.onClickTab}
        />
        {page === 'list'
          ? <ListView
              filter={filter}
              list={list}
              normalFruits={normalFruits}
              newFruits={newFruits}
              onClickFilter={this.onClickFilter}
              onClickAddCart={this.onClickAddCart}
              onClickRemoveCart={this.onClickRemoveCart}
            />
          : <CartView
              cartList={cartList}
              onClickCancelCart={this.onClickCancelCart}
            />
        }
      </>
    )
  }
}

export default FruitContainer;