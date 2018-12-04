import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ListItem = ({ id, todo, onEdit, onDelete, addToComplete }) => {
  return (
    <Fragment>
      <li className="list__created--item" key={id}>
        <h4>{todo.title}</h4>
        <i
          class="far fa-edit list__created--item_edit"
          onClick={() => {
            onEdit(id);
          }}
        />
        <input type="radio" id={id} className="radio_input" />
        <label htmlFor={id}>
          <span
            onClick={() => {
              addToComplete();
            }}
          />
        </label>
        <span
          className="list__created--item_delete"
          onClick={() => {
            onDelete(id);
          }}
        >
          &#10005;
        </span>
      </li>
    </Fragment>
  );
};

export default ListItem;
