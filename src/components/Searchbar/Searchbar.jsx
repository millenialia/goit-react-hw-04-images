import { Component } from 'react'
import css  from "./Searchbar.module.css";

export class Searchbar extends Component{


  onSearch = this.props.onSearch
  handleChange = this.props.handleChange

  render() {
    return (
      <header className= {css.searchbar}>
        <form className={css.form} onSubmit={this.onSearch}>
          <button type="submit" className= {css.button} >
            {/* <span className={css.buttonLabel}>Search</span> */}
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
}
