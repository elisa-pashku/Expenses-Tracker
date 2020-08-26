import React, { Component } from "react";
import AddExpenseForm from "./AddExpenseForm";
import SingleExpense from "./SingleExpense";
import ChangeUnitsComponent from "./ChangeUnitsComponent";
import "./styles.css";

class ExpensesApp extends Component {
  state = {
    item: "",
    quantity: "",
    pricePerUnit: "",
    items: [],
    selectUnit: "kg",
    selectCurrency: "lek",
    convertedCurrencyValue: 1,
    convertedScaleValue: 1,
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    let pricePerItem =
      parseInt(this.state.pricePerUnit) * parseInt(this.state.quantity);

    const itemObject = {
      item: this.state.item,
      quantity: parseInt(this.state.quantity),
      pricePerUnit: this.state.pricePerUnit,
      pricePerItem,
    };

    this.setState({
      item: "",
      quantity: "",
      pricePerUnit: "",
      items: [...this.state.items, itemObject],
    });
  };

  listOfConversion = {
    "lek-euro": 0.0081,
    "euro-lek": 124.19,
    "euro-pound": 0.9,
    "euro-dollar": 1.18,
    "pound-euro": 1.11,
    "lek-pound": 0.0072,
    "pound-lek": 138.31,
    "pound-dollar": 1.32,
    "lek-dollar": 0.0095,
    "dollar-lek": 105.08,
    "dollar-euro": 0.85,
    "dollar-pound": 0.76,
    "kg-lbs": 2.20462,
    "lbs-kg": 0.45359,
  };

  handleCurrencyChange = (event) => {
    const currentCurrencyValue = this.state.selectCurrency;
    const newConvertedCurrencyValue = this.listOfConversion[
      `${currentCurrencyValue}-${event.target.value}`
    ];
    const newItems = [...this.state.items];

    for (let i = 0; i < newItems.length; i++) {
      newItems[i].pricePerUnit *= newConvertedCurrencyValue;
      newItems[i].pricePerItem =
        newItems[i].quantity * newItems[i].pricePerUnit;
    }

    this.setState({
      selectCurrency: event.target.value,
      convertedCurrencyValue: newConvertedCurrencyValue,
      items: newItems,
    });
  };

  handleScaleChange = (event) => {
    const currentScaleValue = this.state.selectUnit;
    const newConvertedScaleValue = this.listOfConversion[
      `${currentScaleValue}-${event.target.value}`
    ];
    const newItems = [...this.state.items];

    for (let i = 0; i < newItems.length; i++) {
      newItems[i].quantity *= newConvertedScaleValue;
      newItems[i].pricePerUnit /= newConvertedScaleValue;
    }

    this.setState({
      selectUnit: event.target.value,
      convertedScaleValue: newConvertedScaleValue,
      items: newItems,
    });
  };

  handleEdit = (editedObject, originalObject) => {
    const editedList = [...this.state.items];
    const newId = editedList.indexOf(originalObject);
    editedList[newId] = editedObject;
    this.setState({
      items: editedList,
    });
  };

  handleDelete = (object) => {
    const newFilteredItems = this.state.items.filter(
      (singleItem) => singleItem !== object
    );

    this.setState({
      items: newFilteredItems,
    });
  };

  getTotalPriceOfAllItems = () => {
    return this.state.items.reduce((acc, item) => acc + item.pricePerItem, 0);
  };

  render() {
    const totalPriceOfAllItems = this.getTotalPriceOfAllItems();
    return (
      <div>
        <ChangeUnitsComponent
          handleCurrencyChange={this.handleCurrencyChange}
          handleScaleChange={this.handleScaleChange}
          selectCurrency={this.state.selectCurrency}
          selectUnit={this.state.selectUnit}
        />
        <br></br>
        <AddExpenseForm
          item={this.state.item}
          quantity={this.state.quantity}
          pricePerUnit={this.state.pricePerUnit}
          totalPricePerItem={this.state.totalPricePerItem}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          selectCurrency={this.state.selectCurrency}
          selectUnit={this.state.selectUnit}
        />
        <br></br>

        <br></br>
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity ({this.state.selectUnit})</th>
              <th>Price per unit ({this.state.selectCurrency})</th>
              <th>Total price per item</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.items.map((single) => (
              <SingleExpense
                key={single.item}
                object={single}
                selectCurrency={this.state.selectCurrency}
                selectUnit={this.state.selectUnit}
                handleEdit={this.handleEdit}
                handleDelete={() => this.handleDelete(single)}
              />
            ))}
          </tbody>
        </table>
        <br></br>
        {totalPriceOfAllItems !== 0 ? (
          <div>
            Total you have expended:
            {totalPriceOfAllItems}
          </div>
        ) : (
          <div>No expenses yet</div>
        )}
      </div>
    );
  }
}

export default ExpensesApp;
