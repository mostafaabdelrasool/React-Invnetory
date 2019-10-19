import React, { Component } from "react";
import {  Modal } from "react-bootstrap";
export default class ModalComponent extends Component {
  state = {
    show: true
  };
  componentWillUnmount() {
    this.setState({ show: false });
  }
  handleClose = () => this.props.close.apply(null);
  render() {
    return (
      <div>
        <Modal show={this.state.show} onHide={this.handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.props.children}</Modal.Body>
        </Modal>
      </div>
    );
  }
}
