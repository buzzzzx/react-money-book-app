import React from "react";
import { Link } from "@reach/router";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";

const CreateBtn = () => (
  <Link to="create">
    <button type="button" className="btn btn-primary btn-lg btn-block my-4">
      <Ionicon
        className="rounded-circle mr-2"
        fontSize="30px"
        color="#fff"
        icon="ios-add-circle-outline"
      />
      创建一条新的记账记录
    </button>
  </Link>
);
CreateBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CreateBtn;
