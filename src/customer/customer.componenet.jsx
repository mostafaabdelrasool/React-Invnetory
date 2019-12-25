import React, { Component } from 'react'
import StTableComponent from "../common/table/table.list.component";

export default class CustomerComponent extends Component {
    render() {
        const setting = {
          header: [{ name: "Name" }, { name: "Address" }, { name: "City" }, { name: "Phone" }],
          body: [
            { type: "txt", model: "companyName" },
            { type: "txt", model: "address" },
            { type: "txt", model: "city" },
            { type: "txt", model: "phone" },
          ]
        };
        const fields = [
          { model: "companyName", type: "txt",label:"Name" },
          { model: "address", type: "txt",label:"Address" },
          { model: "city", type: "txt",label:"City" },
          { model: "phone", type: "txt",label:"Phone" },
        ];
        return (
          <div>
            <StTableComponent
              setting={setting}
              fields={fields}
              api="Order/Customer"
            ></StTableComponent>
          </div>
        );
      }
}
