import React from "react";
import { DatePicker } from "antd";
import moment from 'moment';

class YearPicker extends React.Component {
  state = {
    value: null,
    open: false
  };

  setOpenState = () => {
    this.setState({
      open: !this.state.open
    });
  };

  changeValue = v => {
    this.props.changeValue(v)
    this.setState({
      value: v
    });
  };

  changeRender = v => {
    this.props.changeRender(v)
    this.setState({
      value: v,
      open: false
    });
  };

  test = () => {
    console.log("test");
  };

  render() {
    const { open } = this.state;
    // console.log('times',this.props.times)
    if (!open)
      return (
        <DatePicker
          style={this.props.style?this.props.style:''}
          mode="year"
          format="YYYY"
          value={this.state.value?this.state.value:(this.props.times?moment(this.props.times, 'YYYY'):null)}
          onChange={this.changeValue}
          onPanelChange={this.changeRender}
          onOpenChange={this.setOpenState}
          open={open}
          placeholder={this.props.placeholder}
          disabled={this.props.disabled?this.props.disabled:false}
        />
      );
    else {
      return (
        <DatePicker
          style={this.props.style?this.props.style:''}
          mode="year"
          format="YYYY"
          value={this.state.value}
          onChange={this.changeValue}
          onPanelChange={this.changeRender}
          open={open}
          placeholder={this.props.placeholder}
        />
      );
    }
  }
}

export default YearPicker;