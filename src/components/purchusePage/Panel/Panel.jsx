import React, { Component } from 'react';
import ItemControls from './ItemsControls/ItemControls';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import store from '../../../Redux/store'
import axios from '../../../axios-instance'

import './Panel.css'
import {  updateItem  } from '../../../Redux/index'
import {EXTRA_CHEESE_PRICE , EXTRA_CHICKEN_PRICE , EXTRA_ONIONS_PRICE} from '../../../components/purchusePage/Panel/ItemsControls/extraSingleItemPrice'


class Panel extends Component {
   
     constructor(props) {
          super(props)

          this.handlePurchaseDetails = this.handlePurchaseDetails.bind(this);
     }

     handlePurchaseDetails = () => {
          let transaction = {
               title : this.props.title ,
               date  : new Date().toLocaleString() ,
               countCheese : store.getState().counter.countCheese ,
               countChicken :store.getState().counter.countChicken ,
               countOnions : store.getState().counter.countOnions ,
               total : this.props.total
          }

          axios.post('/transaction.json' ,transaction)
               .then((res) => console.log("[ yes ]" + res))
               .catch((err) => console.log("[ NO ]" +err))
     }

     render() {
          return (

                    <div className={"Panel mt-0"}>
                         <h5 className={"Panel__title"}>{this.props.title}</h5>
                         <h6 className={"Panel__title text-danger"}>Extra</h6>
                         <hr />
     {/* **************add item control here ************ */}
                         <ItemControls />
     {/* **************add item control here ************ */}
                         <h5 className={"Panel__price m-3 "}>Total :  <span className={"text-dark"}>{this.props.total}.00</span> </h5>
                         <div className={"Panel__btnGroup"}>
                         
                              <Link to="/">
                                   <button className={"btn btn-danger"}> CANCEL </button>
                              </Link>

                              <Link to="/transactions">
                                   <button onClick={this.handlePurchaseDetails} className={"btn btn-success m-3 Panel__button "}>PURCHASE </button>
                              </Link>
                         
                         </div>
                    </div>
          );
  }
}


// ===================================

const mapStateToProps = (state) => {
     return {
          id : state.itemObject.id,
          price : state.itemObject.price,
          title : state.itemObject.title,
          total : state.itemObject.price + ( 
                    (store.getState().counter.countCheese * EXTRA_CHEESE_PRICE) +
                    (store.getState().counter.countChicken * EXTRA_CHICKEN_PRICE) +
                    (store.getState().counter.countOnions * EXTRA_ONIONS_PRICE) 
                  ) 
     }
}

const mapDetachToProps = (dispatch) => {
     return {
          updateItemHandler : (obj) => dispatch( updateItem(
               {
                    id : obj.id,
                    price : obj.price,
                    title : obj.title
               }
          ) )    

     }
}



export default connect(mapStateToProps, mapDetachToProps)(Panel)