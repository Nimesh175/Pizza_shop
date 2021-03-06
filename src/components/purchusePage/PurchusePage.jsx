import React, { Component } from 'react'

import './PurchusePage.css'
import imgPizza from '../../assests/P__pizza.png'
import Panel from './Panel/Panel'
import store from '../../Redux/store'
import {countReset } from '../../Redux/index'


 class PurchusePage extends Component {

     render() {
          return (
               <div className={"PurshusePage"}>
                    <h3 className={"PurshusePage__title"}>Purchase page</h3>
                    <hr className={"hr"} />
                    <div className={"container"}>
                          <img className={"PurshusePage__main-img"} src={imgPizza}  alt={"..."} />
                    </div>
                    <Panel />
                    <br/>

               </div>
          )
     }

     componentWillUnmount(){
          store.dispatch(countReset())
     }
}


export default PurchusePage
