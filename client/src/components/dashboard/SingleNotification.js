import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteNotification } from "../../actions/notificationActions";

export class SingleNotification extends Component {
  handleDelete = e => {
    this.props.deleteNotification(this.props.id);
  };
  render() {
    return (
      <div className="notification__panel">
        <div> {this.props.message}</div>
        {this.props.closable && (
          <button onClick={this.handleDelete}>dismiss</button>
        )}
      </div>
    );
  }
}

SingleNotification.propTypes = {
  message: PropTypes.string.isRequired,
  closable: PropTypes.bool.isRequired,
  deleteNotification: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteNotification }
)(SingleNotification);
