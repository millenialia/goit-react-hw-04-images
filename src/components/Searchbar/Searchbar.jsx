import PropTypes from "prop-types";
import css  from "./Searchbar.module.css";

export const Searchbar = ({onSearch}) => {

    return (
      <header className= {css.searchbar}>
        <form className={css.form} onSubmit={onSearch}>
          <button type="submit" className= {css.button} >
            &#128269;
          </button>

          <input
            className={css.input}
            type="text"
            name="keyword"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    )

}

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
}
