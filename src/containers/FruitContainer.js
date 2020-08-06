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
    cartList: [],
  }

  componentDidMount() {
    this.getFruitsList(0)
  }

  getFruitsList = (filter) => {
    axios.get('http://localhost:3001/fruits')
    .then((response) => {
      const fruits = response.data
      this.setState(prevState => {
        if (filter === 0) {
          return {
            list: [..._.sortBy(fruits, (o) => [!o.isNew, o.id])]
          }
        } else if (filter === 1) {
          return {
            list: [...fruits.filter(v => !v.isNew)]
          }
        } else {
          return {
            list: [...fruits.filter(v => v.isNew)]
          }
        }
      })
    })
    .catch(err => console.log(err))
  }

  onClickTab = (page) => {
    this.setState({ page })
  }

  onClickFilter = (filter) => {
    this.setState({ filter, }, () => {
      this.getFruitsList(filter)
    })
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
    const checkCart = cartList.some(i => i.id === item.id)
    if (checkCart) {
      const cartItemIdx = cartList.findIndex(i => i.id === item.id)
      cartList[cartItemIdx].stock += 1
      cartList[cartItemIdx].quantity -= 1
      this.setState({
        cartList: [...cartList]
      })
    } else {
      cartRemoveArray.push(item)
      const cartItemIdx = cartRemoveArray.findIndex(i => i.id === item.id)
      cartList[cartItemIdx].stock += 1
      cartRemoveArray[cartItemIdx].quantity = 0
      this.setState({
        cartList: [...cartRemoveArray],
      })
    }
  }

  render() {
    const { page, filter, list, cartList } = this.state
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
              onClickFilter={this.onClickFilter}
              onClickAddCart={this.onClickAddCart}
              onClickRemoveCart={this.onClickRemoveCart}
            />
          : <CartView list={list} />
        }
      </>
    )
  }
}

export default FruitContainer;