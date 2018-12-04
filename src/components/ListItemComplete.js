import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ListItemComplete = ({ id, todo, onDeleteComplete }) => {
  return (
    <Fragment>
      <li className="list__created--item" key={id}>
        <h4>{todo.title}</h4>
        <span
          className="list__created--item_delete"
          onClick={() => {
            onDeleteComplete(id);
          }}
        >
          &#10005;
        </span>
      </li>
    </Fragment>
  );
};

export default ListItemComplete;
