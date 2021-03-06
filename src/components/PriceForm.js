import React, { Component, createRef } from "react";
import PropTypes from "prop-types";

class PriceForm extends Component {
  static defaultProps = {
    item: {},
  };

  state = {
    validationPassed: true,
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
          validationPassed: false,
          errorMessage: "金额必须大于零",
        });
      } else {
        this.setState({
          validationPassed: true,
          errorMessage: "",
        });

        canSubmit = true;
      }
    } else {
      this.setState({
        validationPassed: false,
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
    const { validationPassed, errorMessage } = this.state;
    const { onCancelSubmit } = this.props;

    return (
      <form onSubmit={(event) => this.submitForm(event)} noValidate>
        <div className="form-group">
          <label htmlFor="title">标题*:</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="请输入标题"
            defaultValue={title}
            ref={this.titleInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">金额*:</label>
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
        <div className="form-group">
          <label htmlFor="date">日期*:</label>
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
        <button type="submit" className="btn btn-primary mr-4">
          提交
        </button>
        <button className="btn btn-secondary" onClick={onCancelSubmit}>
          取消
        </button>
        {!validationPassed && (
          <div className="alert alert-danger mt-5" role="alert">
            {errorMessage}
          </div>
        )}
      </form>
    );
  }
}

PriceForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  onCancelSubmit: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

export default PriceForm;
