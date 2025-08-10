import React from 'react';
import { SECTIONS } from '../constants';

const NavigationDots = ({ active }) => (
  <div className="app__navigation" aria-label="Section navigation">
    {SECTIONS.map((item, index) => (
      <a
        href={`#${item}`}
        key={item + index}
        className="app__navigation-dot"
        aria-label={`Go to ${item} section`}
        style={active === item ? { backgroundColor: '#313BAC' } : {}}
      />
    ))}
  </div>
);

export default NavigationDots;