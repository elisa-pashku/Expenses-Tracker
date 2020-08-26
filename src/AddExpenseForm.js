import React, { Component } from "react";

class AddExpenseForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div>
          <input
            type="text"
            name="item"
            value={this.props.item}
            onChange={this.props.handleChange}
            placeholder="Add description"
          />
        </div>
        <div>
          <input
            type="text"
            name="quantity"
            value={this.props.quantity}
            onChange={this.props.handleChange}
            placeholder="Quanity in kg"
          />
        </div>
        <div></div>
        <div>
          <input
            type="text"
            name="pricePerUnit"
            value={this.props.pricePerUnit}
            onChange={this.props.handleChange}
            placeholder="Price per unit"
          />
        </div>
        <div></div>
        <div>
          <button type="submit" onClick={this.props.handleSubmit}>
            Add item
          </button>
        </div>
      </form>
    );
  }
}

export default AddExpenseForm;
