import React, { Component } from "react";
class SingleExpense extends Component {
  state = {
    isEditable: false,
    object: this.props.object,
  };

  handleEditable = () => {
    this.setState({
      isEditable: true,
    });
  };

  handleChangeEdit = (event) => {
    event.stopPropagation();
    const name = event.target.name;
    const newObject = this.state.object;
    newObject[name] = event.target.value;
    newObject["pricePerItem"] =
      newObject["quantity"] * newObject["pricePerUnit"];
    this.setState({
      object: newObject,
    });
  };

  handleCancel = (event) => {
    this.setState({
      isEditable: false,
      item: this.props.object.item,

      quantity: this.props.object.quantity,
      pricePerUnit: this.props.object.pricePerUnit,
    });
  };

  handleEditSubmit = () => {
    this.props.handleEdit(this.state.object, this.props.object);
    this.setState({ isEditable: false });
  };

  render() {
    if (this.state.isEditable) {
      return (
        <tr>
          <td>
            <input
              type="text"
              value={this.state.object.item}
              onChange={this.handleChangeEdit}
              name="item"
              props={this.props.item}
            />
          </td>
          <td>
            <input
              type="text"
              value={this.state.object.quantity}
              onChange={this.handleChangeEdit}
              name="quantity"
            />
          </td>
          <td>
            <input
              type="text"
              value={this.state.object.pricePerUnit}
              onChange={this.handleChangeEdit}
              name="pricePerUnit"
            />
          </td>
          <td>{this.props.object.pricePerItem}</td>
          <td>
            <button onClick={this.handleEditSubmit}>Submit</button>
            <button onClick={this.handleCancel}>Cancel</button>
          </td>
        </tr>
      );
    }

    return (
      <tr>
        <td>{this.props.object.item}</td>
        <td>{this.props.object.quantity}</td>
        <td>{this.props.object.pricePerUnit}</td>
        <td>{this.props.object.pricePerItem}</td>
        <td>
          <button onClick={this.handleEditable}>Edit</button>
          <button onClick={this.props.handleDelete}>Delete</button>
        </td>
      </tr>
    );
  }
}

export default SingleExpense;
