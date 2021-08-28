import React, { Component } from 'react'
import { connect } from 'react-redux';
// import classnames from 'classnames';
import PropTypes from 'prop-types';
import { registerUser } from '../../actions/authActions';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit(e){
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };


    this.props.registerUser(newUser, this.props.history);

  }


  componentWillReceiveProps(nextProps){
    if (nextProps.errors){
      this.setState({errors: nextProps.errors});
    }
  }

  render() {
    const {errors} = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p id="Header" className="lead text-center">Create your Instagram-Team4 account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup 
                name='name'
                type='text' error={errors.name}
                placeholder='Name' onChange={this.onChange}
                value={this.state.name}
                />
                <TextFieldGroup 
                name='email'
                type='email' error={errors.email}
                placeholder='Email Address' onChange={this.onChange}
                value={this.state.email}
                info='This site uses Gravatar so if you want a profile image, use
                a Gravatar email'
                />
                <TextFieldGroup 
                name='password'
                type='password' error={errors.password}
                placeholder='Password' onChange={this.onChange}
                value={this.state.password}
                />
                <TextFieldGroup 
                name='password2'
                type='password' error={errors.password2}
                placeholder='Confirm Password' onChange={this.onChange}
                value={this.state.password2}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
      </div>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, {registerUser})(withRouter(Register));