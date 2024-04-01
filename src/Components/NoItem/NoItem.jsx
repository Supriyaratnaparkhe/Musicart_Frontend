import React from 'react'
import emptyCart from "../../assets/emptyCart.png"
const NoItem = () => {
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
        <div><img src={emptyCart} alt="empty cart"/></div>
      <div style={{fontFamily: "Roboto",fontSize: "50px",fontWeight: "700"}}>Cart is Empty</div>
    </div>
  )
}

export default NoItem
