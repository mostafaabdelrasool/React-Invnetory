import React, { Component } from 'react';
import './receipt.css'
class Receipt extends Component {
  render() {
    return (
      <div id="invoice-POS">

        <center id="top">
          <div className="logo"></div>
          <div className="info">
            <h2>SBISTechs Inc</h2>
          </div>
        </center>

        <div id="mid">
          <div className="info">
            <h2>Contact Info</h2>
            <p>
            </p>
          </div>
        </div>

        <div id="bot">

          <div id="table">
            <table>
              <thead>
                <tr>
                  <th className="item"><h2>Item</h2></th>
                  <th className="Hours"><h2>Qty</h2></th>
                  <th className="Rate"><h2>Sub Total</h2></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ss</td>
                </tr>
              </tbody>
            

            </table>
          </div>

          <div id="legalcopy">
            <p className="legal"><strong>Thank you for your business!</strong>  Payment is expected within 31 days; please process this invoice within that time. There will be a 5% interest charge per month on late invoices.
						</p>
          </div>

        </div>
      </div>
    );
  }
}
export default Receipt;

