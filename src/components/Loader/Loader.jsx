import { ColorRing } from 'react-loader-spinner'
import css from "./Loader.module.css"


export const Loader = () => {
  return (

<ColorRing
  visible={true}
  height="80"
  width="80"
  wrapperClass = {css.loader}
  ariaLabel="blocks-loading"
  colors={['#3f51b5', '#3f51b5', '#3f51b5', '#3f51b5', '#3f51b5' ]
  }
/>

  )
}
