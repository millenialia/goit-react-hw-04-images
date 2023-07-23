import css from "./Button.module.css"
import PropTypes from "prop-types";

export const Button = ({onLoadMore}) => {
    return (
      <button type="button" className={css.button} onClick={onLoadMore}>Load more</button>
    )
}


Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
}
