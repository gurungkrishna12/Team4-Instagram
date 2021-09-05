import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import "./ImageUpload.css";
import { Input, Button } from "@material-ui/core";
import { postImage } from '../../actions/postActions';

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: '',
      image: '',
      errors: {}
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const newImage = {
      caption: this.state.caption,
      image: this.state.image,
    }
    this.props.postImage(newImage, this.props.history);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    // const { image } = this.props.profile;
    // console.log(image);
    return(
    <div className="imageupload">
      {/* <progress className="imageupload__progress" value={progress} max="100" /> */}
      <form onSubmit={this.onSubmit}>
        <Input
          placeholder="Enter a caption"
          name='caption'
          onChange={this.onChange}
        />
        <div>
          <input type="file" name='image' onChange={this.onChange}/>
          <Button type="submit" className="imageupload__button" >
            Upload
          </Button>
        </div>
      </form>
      <br />
    </div>
    )
  }
}

ImageUpload.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth

});

export default connect(mapStateToProps, { postImage })(ImageUpload);


