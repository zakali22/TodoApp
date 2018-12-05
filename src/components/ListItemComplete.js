import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ListItemComplete = ({ todo, onDeleteComplete }) => {
  return (
    <Fragment>
      <li className="list__created--item">
        <h4>{todo.title}</h4>
        <span
          className="list__created--item_delete"
          onClick={() => {
            onDeleteComplete();
          }}
        >
          &#10005;
        </span>
      </li>
    </Fragment>
  );
};

ListItemComplete.propTypes = {
  id: PropTypes.number.isRequired,
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired
  }).isRequired,
  onDeleteComplete: PropTypes.func.isRequired
};

export default ListItemComplete;
