import React from "react";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";

const CreateBtn = ({ onClick }) => (
  <button
    type="button"
    className="btn btn-primary btn-lg btn-block my-4"
    onClick={(event) => onClick()}
  >
    <Ionicon
      className="rounded-circle mr-2"
      fontSize="30px"
      color="#fff"
      icon="ios-add-circle-outline"
    />
    创建一条新的记账记录
  </button>
);
CreateBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CreateBtn;
