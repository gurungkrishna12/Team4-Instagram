import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {loginUser} from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends Component {
  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit(e){
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(newUser, this.props.history);

  }

  componentDidMount(){
    if (this.props.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    }
  }
  
  componentWillReceiveProps(nextProps){
    if (nextProps.errors){
      this.setState({errors: nextProps.errors});
    }
    if (nextProps.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    }
  }
  
  render() {
    const {errors} = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p id="Header" className="lead text-center">Sign in to your DevConnector account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup 
                 type='email' value={this.state.email} 
                 name='email' 
                 placeholder='Email Address'
                 error={errors.email} onChange={this.onChange}
                 info='This site uses Gravatar so if you want a profile image, use
                  a Gravatar email'
                />

                <TextFieldGroup 
                 type='password' value={this.state.password} 
                 name='password' 
                 placeholder='Your Password'
                 error={errors.password} onChange={this.onChange}
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


Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth:state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, {loginUser})(withRouter(Login));
