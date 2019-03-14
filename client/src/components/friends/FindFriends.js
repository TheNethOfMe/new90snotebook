import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { searchForUser, searchForEmail } from "../../actions/profileActions";
import TextFieldGroup from "../common/TextFieldGroup";
import Spinner from "../common/Spinner";
import FoundProfile from "./FoundProfile";

export class FindFriends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      nickName: "",
      errors: {}
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmitEmail = e => {
    e.preventDefault();
    this.props.searchForEmail(this.state.email);
  };
  onSubmitName = e => {
    e.preventDefault();
    const query = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      nickName: this.state.nickName
    };
    this.props.searchForUser(query);
  };
  render() {
    const { errors } = this.state;
    const { loading, profiles } = this.props.profile;
    let resultsContent;
    if (loading) {
      resultsContent = <Spinner />;
    } else if (!profiles.length) {
      resultsContent = <p>No Profiles to Display</p>;
    } else {
      resultsContent = profiles.map((profile, idx) => {
        return <FoundProfile key={idx} profile={profile} />;
      });
    }
    return (
      <div>
        <form onSubmit={this.onSubmitEmail}>
          <h4>Search By Email</h4>
          <TextFieldGroup
            name="email"
            type="email"
            placeholder="email"
            value={this.state.email}
            label="Email"
            error={errors.email}
            onChange={this.onChange}
          />
          <button>Find Friend</button>
        </form>
        <form onSubmit={this.onSubmitName}>
          <h4>Search By Name</h4>
          <TextFieldGroup
            name="firstName"
            placeholder="firstName"
            value={this.state.firstName}
            label="First Name"
            error={errors.firstName}
            onChange={this.onChange}
          />
          <TextFieldGroup
            name="lastName"
            placeholder="lastName"
            value={this.state.lastName}
            label="Last Name"
            error={errors.lastName}
            onChange={this.onChange}
          />
          <TextFieldGroup
            name="nickName"
            placeholder="nickName"
            value={this.state.nickName}
            label="Nick Name"
            error={errors.nickName}
            onChange={this.onChange}
          />
          <button>Find Friend</button>
        </form>
        <div className="results-container">{resultsContent}</div>
      </div>
    );
  }
}

FindFriends.propTyes = {
  profile: PropTypes.object.isRequired,
  searchForUser: PropTypes.func.isRequired,
  searchForEmail: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { searchForUser, searchForEmail }
)(FindFriends);
