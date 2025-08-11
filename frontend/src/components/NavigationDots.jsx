import React from 'react';
import { SECTIONS } from '../constants';

const NavigationDots = ({ active }) => (
  <div className="app__navigation" aria-label="Section navigation">
    {SECTIONS.map((item, index) => (
      <a
        href={`#${item}`}
        key={item + index}
        className={`app__navigation-dot ${active === item ? 'active' : ''}`}
        aria-label={`Go to ${item} section`}
        aria-current={active === item ? 'true' : undefined}
      />
    ))}
  </div>
);

export default NavigationDots;