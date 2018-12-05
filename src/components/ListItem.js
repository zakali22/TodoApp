import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ListItem = ({ id, todo, onEdit, onDelete, addToComplete }) => {
  return (
    <Fragment>
      <li className="list__created--item">
        <h4>{todo.title}</h4>
        <i
          className="far fa-edit list__created--item_edit"
          onClick={() => {
            onEdit();
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
            onDelete();
          }}
        >
          &#10005;
        </span>
      </li>
    </Fragment>
  );
};

ListItem.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  addToComplete: PropTypes.func.isRequired
};

export default ListItem;
