import React, { Component } from "react";
import StTableComponent from "../common/table/table.list.component";

export default class Category extends Component {
  state = {};

  render() {
    const setting = {
      header: [{ name: "CategoryName" }, { name: "Description" }],
      body: [
        { type: "txt", model: "categoryName" },
        { type: "txt", model: "description" }
      ]
    };
    const fields = [
      { model: "categoryName", type: "txt",label:"Category Name" },
      { model: "description", type: "txt",label:"Description" }
    ];
    return (
      <div>
        <StTableComponent
          setting={setting}
          fields={fields}
          api="Category"
        ></StTableComponent>
      </div>
    );
  }
}
