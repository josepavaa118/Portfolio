import React from 'react'
import {NavigationDots, SocialMedia} from '../components'
import { SECTIONS } from '../constants'

const AppWrap = (Component, idName, classNames) => function HOC() {
  const index = SECTIONS.indexOf(idName);
  const flipSides = index !== -1 && index % 2 === 1; // alternate sides by section index

  return (
    <div id={idName} className={`app__container ${classNames}`}>
        {flipSides ? <NavigationDots active={idName} /> : <SocialMedia />}
        <div className="app__wrapper">
            <Component />
        </div>
        {flipSides ? <SocialMedia /> : <NavigationDots active={idName} />}
    </div>
  )
}

export default AppWrap