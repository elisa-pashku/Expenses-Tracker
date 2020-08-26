import React, { Component } from "react";

class ChangeUnitsComponent extends Component {
  state = {};
  render() {
    return (
      <div>
        Select the units you want to convert
        <select
          name="selectCurrency"
          value={this.props.selectCurrency}
          onChange={this.props.handleCurrencyChange}
        >
          <option value="lek">lek</option>
          <option value="dollar">dollar</option>
          <option value="euro">euro</option>
          <option value="pound">pound</option>
        </select>
        <select
          name="selectUnit"
          value={this.props.selectUnit}
          onChange={this.props.handleScaleChange}
        >
          <option value="kg">kg</option>
          <option value="lbs">lbs</option>
        </select>
      </div>
    );
  }
}

export default ChangeUnitsComponent;
