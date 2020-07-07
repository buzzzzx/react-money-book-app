import React, { Component, createRef } from "react";

class PriceForm extends Component {
  static defaultProps = {
    item: {},
  };

  state = {
    validatePass: true,
    errorMessage: "",
  };

  titleInput = createRef();
  priceInput = createRef();
  dateInput = createRef();

  validateValue = (title, price, date) => {
    let canSubmit = false;
    if (title && price && date) {
      if (price < 0) {
        this.setState({
          validatePass: false,
          errorMessage: "金额必须大于零",
        });
      } else {
        this.setState({
          validatePass: true,
          errorMessage: "",
        });

        canSubmit = true;
      }
    } else {
      this.setState({
        validatePass: false,
        errorMessage: "请输入所有必选项",
      });
    }
    return canSubmit;
  };

  submitForm = (event) => {
    event.preventDefault();
    const { item, onFormSubmit } = this.props;
    const editMode = !!item.title;
    const title = this.titleInput.current.value.trim();
    const price = +this.priceInput.current.value.trim();
    const date = this.dateInput.current.value.trim();

    const canSubmit = this.validateValue(title, price, date);

    if (canSubmit) {
      if (editMode) {
        onFormSubmit({ ...item, title, price, date }, editMode);
      } else {
        onFormSubmit({ title, price, date }, editMode);
      }
    }
  };

  render() {
    const { title, price, date } = this.props.item;
    const { validatePass, errorMessage } = this.state;
    const { onCancelSubmit } = this.props;

    return (
      <form
        onSubmit={(event) => this.submitForm(event)}
        className="ml-4"
        noValidate
      >
        <div className="form-group row">
          <label className="col-md-2 col-form-label" htmlFor="title">
            标题*:
          </label>
          <div className="col-md-7">
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="请输入标题"
              defaultValue={title}
              ref={this.titleInput}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-md-2 col-form-label" htmlFor="price">
            金额*:
          </label>
          <div className="col-md-7">
            <input
              type="number"
              className="form-control"
              name="price"
              id="price"
              placeholder="请输入金额"
              defaultValue={price}
              ref={this.priceInput}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-md-2 col-form-label" htmlFor="date">
            日期*:
          </label>
          <div className="col-md-7">
            <input
              type="date"
              className="form-control"
              name="date"
              id="date"
              placeholder="请输入日期"
              defaultValue={date}
              ref={this.dateInput}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary mr-4">
          提交
        </button>
        <button className="btn btn-secondary" onClick={onCancelSubmit}>
          取消
        </button>
        {!validatePass && (
          <div className="alert alert-danger mt-5" role="alert">
            {errorMessage}
          </div>
        )}
      </form>
    );
  }
}

export default PriceForm;
