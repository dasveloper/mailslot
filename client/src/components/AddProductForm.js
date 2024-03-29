import React, { Component } from "react";
import { Field, reduxForm, change } from "redux-form";
import { Button, Card, Input } from "semantic-ui-react";
import validate from "../helpers/validate";
import { SketchPicker } from "react-color";
import { connect } from "react-redux";

import { formValueSelector } from "redux-form"; // ES6
const selector = formValueSelector("createprofile");

const customFileInput = field => {
  delete field.input.value; // <-- just delete the value property
  return (
    <label className="btn btn-default ">
      Upload
      <input className="file-upload" type="file" id="file" {...field.input} />
    </label>
  );
};
class AddProductForm extends Component {
  render() {
    const {
      handleSubmit,
      pristine,
      previousPage,
      submitting,
      error,
 
      productFile,
      cover
    } = this.props;

    return (
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-row">
          <Field
            component="input"
            name="name"
            placeholder="Product Name"
            type="text"
            className="form-input"
          />
        </div>
        <h4 className="form-row-header">Upload your product:</h4>

        <div className="form-row">
          <div className="form-col">
            <div className="form-sub-row">
              <Field
                component={customFileInput}
                name="product"
                placeholder="Product"
                type="text"
                className="form-input"
              />
              {productFile && <span className="file-name">{productFile[0].name}</span>}
            </div>
            <div className="form-sub-row">
              <span className="file-requirements">
                Single image .PNG .JPG, max size 1MB
              </span>
            </div>
          </div>
        </div>
        <h4 className="form-row-header">Add a cover photo:</h4>

        <div className="form-row">
          <div className="form-col">
            <div className="form-sub-row">
              <Field
                component={customFileInput}
                name="cover"
                placeholder="Cover"
                type="text"
                className="form-input"
              />
              {cover && <span className="file-name">{cover[0].name}</span>}
            </div>
            <div className="form-sub-row">
              <span className="file-requirements">
                Single image .PNG .JPG, max size 1MB
              </span>
            </div>
          </div>
        </div>
        <div className="form-row">
          <Field
            component="input"
            name="title"
            placeholder="Product Title"
            type="text"
            className="form-input"
          />
        </div>
        <div className="form-row">
          <Field
            component="textarea"
            name="description"
            rows="4"
            placeholder="Product Description"
            className="form-input"
          />
        </div>

        {error && (
          <div className="card-row">
            <p className="form-error">{error.message}</p>
          </div>
        )}
        <div className="form-row">
          <Button className="btn btn-primary btn-block" type="submit">
            Create Profile
          </Button>
        </div>
      </form>
    );
  }
}
AddProductForm = connect(
  state => ({
    cover: selector(state, "cover"),
    productFile: selector(state, "productFile")
  }),
  { change }
)(AddProductForm);

export default reduxForm({
  form: "addproduct", //                 <------ same form name
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
  initialValues: {
    title: null,
    description: null,
    cover: null,
    productFile: null

  }
})(AddProductForm);
