import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorPicker: false
    };
  }
  toggleColorPicker = () => {
    const colorPicker = !this.state.colorPicker;
    this.setState({ colorPicker });
  };
  returnColorClass = () => {
    return `post__current-color post__${this.props.color}-chip`;
  };
  render() {
    const colorPicker = this.state.colorPicker ? (
      <div className="post__color-select">
        <div
          className={this.returnColorClass()}
          onClick={this.toggleColorPicker}
        />
        <div
          className="post__color-option post__grey-chip"
          onClick={() => this.props.handlePickColor("grey")}
        />
        <div
          className="post__color-option post__black-chip"
          onClick={() => this.props.handlePickColor("black")}
        />
        <div
          className="post__color-option post__white-chip"
          onClick={() => this.props.handlePickColor("white")}
        />
        <div
          className="post__color-option post__red-chip"
          onClick={() => this.props.handlePickColor("red")}
        />
        <div
          className="post__color-option post__blue-chip"
          onClick={() => this.props.handlePickColor("blue")}
        />
        <div
          className="post__color-option post__purple-chip"
          onClick={() => this.props.handlePickColor("purple")}
        />
      </div>
    ) : (
      <div className="post__color-select">
        <div
          className={this.returnColorClass()}
          onClick={this.toggleColorPicker}
        />
      </div>
    );
    return <div>{colorPicker}</div>;
  }
}

ColorPicker.propTypes = {
  color: PropTypes.string.isRequired,
  handlePickColor: PropTypes.func.isRequired
};

export default connect(null)(ColorPicker);
