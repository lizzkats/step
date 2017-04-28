/* global __HOST__ */

import React from 'react'
import axios from 'axios'
import GlobalStateComponent from '../../reusable/ParentClasses/GlobalStateComponent'
import componentErrorHandler from '../../utilities/componentErrorHandler'
import globalState from '../../utilities/globalState'
import IconList from './IconList'

export default class IconListContainer extends GlobalStateComponent {
  componentDidMount() {
    axios.get( `${__HOST__}/user/${this.props.icons}/projects` )
      .then( ({ data: icons }) => {
        const iconsObject = icons.reduce( ( accumulator, { id, text }) =>
        Object.assign( accumulator, { [id]: { id, text } })
        , {})
        globalState.set({ icons: iconsObject })
      })
      .catch( componentErrorHandler( 'IconListContainer' ) )
  }


  render() {
    return <IconList />
  }
}
