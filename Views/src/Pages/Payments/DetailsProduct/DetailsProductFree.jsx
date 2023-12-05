import React from 'react'
import './DetailsProduct.css'

const DetailsProductFree = () => {
  return (
    <div>
       <div className="paymentContainerTwo">
          <h2>Resumo do Pedido</h2>
          <div>
            <p className='containerTwoSubTitle'>Item do Pedido</p>
            <h3 className='containerTwoProduct'>Plano Basic</h3>
          </div>
          <div>
            <p className='containerTwoSubTitle'>Forma de Pagamento</p>
            <h3 className='containerTwoProduct'>Pagamento online</h3>
          </div>

          <div className='total'>
            <p className='containerTwoSubTitle'>Total a Pagar: <br /><span>Grátis</span></p>
          </div>
        </div>
    </div>
  )
}

export default DetailsProductFree
