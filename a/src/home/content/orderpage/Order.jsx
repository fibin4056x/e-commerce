import React, { useContext } from 'react';
import { OrderContext } from './ordercontext';
import './order.css';
import { Context } from '../../../registrationpage/loginpages/Logincontext';

export default function Order() {
  const { user } = useContext(Context);
  const { Order, cancelOrderById, cancelAllOrders } = useContext(OrderContext);
 
  return (
    <div className="orders-wrapper">
      {user ? (
        Order && Order.length > 0 ? (
          <>
            <button className="cancel-all-btn" onClick={cancelAllOrders}>
              Cancel All Orders
            </button>

            {Order.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <h2 className="order-id">Order ID: {order.id}</h2>
                  <button
                    className="cancel-order-btn"
                    onClick={() => cancelOrderById(order.id)}
                  >
                    Cancel Order
                  </button>
                </div>

                <div className="customer-info">
                  <p className="customer-name">
                    {order.firstname} {order.lastname}
                  </p>
                  <p className="customer-contact">Contact: {order.contact}</p>
                  <p className="customer-address">
                    {order.address}, {order.city} - {order.postalcode}
                  </p>
                </div>

                {order.items && order.items.length > 0 ? (
                  <ul className="order-items-list">
                    {order.items.map((item) => (
                      <li key={item.id} className="order-item">
                        <img
                          src={item.images?.[0] || '/placeholder.png'}
                          alt={item.name || 'Product'}
                          className="order-item-img"
                        />
                        <div className="order-item-info">
                          <h3 className="item-name">{item.name}</h3>
                          <p className="item-price">Price: ${item.price}</p>
                          <p className="item-quantity">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-items">No items in this order</p>
                )}

                <h3 className="order-total">Total: ${order.total}</h3>
              </div>
            ))}
          </>
        ) : (
          <p className="no-orders">No orders found</p>
        )
      ) : (
        <h2>Please login to see your orders</h2>
      )}
    </div>
  );
}
