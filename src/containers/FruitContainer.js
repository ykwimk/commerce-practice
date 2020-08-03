import React from 'react';
import _ from 'lodash';
//import { fruits } from '../api/fruits';
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
    axios.get('http://localhost:3001/api')
    .then((response) => {
      const fruits = response.data.fruits
      this.setState(prevState => {
        if (filter === 0) {
          return {
            list: _.sortBy(fruits, (o) => [!o.isNew, o.id])
          }
        } else if (filter === 1) {
          return {
            list: fruits.filter(v => !v.isNew)
          }
        } else {
          return {
            list: fruits.filter(v => v.isNew)
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

  onClickAddCart = (id) => {
    const { list } = this.state
    const item = _.find(list, (v) => v.id === id)

    this.setState(prevState => {
      let cartArray = prevState.cartList
      cartArray.concat({ id, quantity: 0 })

      return {
        cartList: cartArray
      }
    })
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
            />
          : <CartView list={list} />
        }
      </>
    )
  }
}

export default FruitContainer;