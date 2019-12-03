import React, { Component } from 'react';
import './receipt.css'
import formateDate from '../../common/extentions/date';
class Receipt extends Component {
  render() {
    const styleSheet = {
      container: {
        boxShadow: '0 0 1in -0.25in rgba(0, 0, 0, 0.5)',
        padding: '2mm',
        margin: '0 auto',
        width: '44mm',
        background: '#FFF',
      },
      h2: {
        fontSize: '.9em',
      },
      info: {
        display: 'block',
        marginLeft: '0'
      },
      logo: {
        "height": "60px", "width": "60px",
        "background": "url(http://michaeltruong.ca/images/logo1.png) no-repeat",
        "backgroundSize": "60px 60px"
      },

      "legalcopy": { "marginTop": "5mm" },
      "tabletitle": { "fontSize": ".5em" },
      "table": {
        "width": "100%",
        "borderCollapse": "collapse",
        borderBottom: '1px solid',
        marginBottom: '1em',
      },
      item: { "borderBottom": "1px solid black" },
      detail: { fontSize: '.6em' },
      total: { fontSize: '.9em', margingTop: '5mm' }
    }
    return (
      <div id="invoice-POS" style={styleSheet.container}>
        <center id="top">
          <div style={styleSheet.logo}></div>
          <div style={styleSheet.info}>
            <h2 style={styleSheet.h2}>S T R I N G</h2>
            <p style={styleSheet.detail}>Mobile : 01008261016</p>
          </div>
        </center>
        <div>
          <h2 style={styleSheet.detail}>{formateDate(this.props.data.orderDate)}</h2>
          <h2 style={styleSheet.detail}>{this.props.data.orderNumber}</h2>
        </div>
        <div id="bot">
          <div>
            <table style={styleSheet.table}>
              <thead style={styleSheet.tabletitle}>
                <tr>
                  <th style={styleSheet.item}><h2>Item</h2></th>
                  <th style={styleSheet.item}><h2>Price</h2></th>
                  <th style={styleSheet.item}><h2>Qty</h2></th>
                  <th style={styleSheet.item}><h2>Sub Total</h2></th>
                </tr>
              </thead>
              <tbody>
                {this.props.data.orderDetails.map((d, i) => {
                  return (<tr key={i}>
                    <td>{d.product.label}</td>
                    <td>{d.unitPrice}</td>
                    <td>{d.quantity}</td>
                    <td>{d.total}</td>
                  </tr>)
                })}

              </tbody>


            </table>
          </div>
          <div style={styleSheet.total}>
            Total:{this.props.data.overallTotal}
          </div>
          <div style={styleSheet.legalcopy}>
            <p style={styleSheet.detail}><strong>Thank for dealing with us!</strong>
            </p>
          </div>

        </div>
      </div>
    );
  }
}
export default Receipt;

