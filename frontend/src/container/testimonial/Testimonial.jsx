import React, { useState, useEffect, useRef } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Testimonial.scss';

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [brands, setBrands] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false); // Track if toggle is needed
  const feedbackRef = useRef(null);

  const handleClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    setExpanded(false); // Reset expanded when testimonial changes
  }, [currentIndex]);

  useEffect(() => {
    if (feedbackRef.current) {
      // Temporarily remove expanded class to measure collapsed height
      feedbackRef.current.classList.remove('expanded');
      const isOverflowing = feedbackRef.current.scrollHeight > feedbackRef.current.clientHeight + 1; // +1 for rounding
      setShowToggle(isOverflowing);
      if (expanded) {
        feedbackRef.current.classList.add('expanded');
      }
    }
  }, [testimonials, currentIndex, expanded]);

  useEffect(() => {
    const query = '*[_type == "testimonials"]';
    const brandsQuery = '*[_type == "brands"]';

    client.fetch(query).then((data) => {
      setTestimonials(data);
    });

    client.fetch(brandsQuery).then((data) => {
      setBrands(data);
    });
  }, []);

  return (
    <>
      {testimonials.length > 0 && testimonials[currentIndex] && (
        <div className="app__testimonial-wrapper">
          <motion.div
            key={currentIndex}
            className="app__testimonial-item"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <img src={urlFor(testimonials[currentIndex].imageurl).url()} alt={testimonials[currentIndex].name} />
            <div className="app__testimonial-content">
              <p
                ref={feedbackRef}
                className={`p-text testimonial-feedback${expanded ? ' expanded' : ''}`}
              >
                {testimonials[currentIndex].feedback}
              </p>
              {showToggle && testimonials[currentIndex].feedback && (
                <button
                  className="testimonial-toggle"
                  onClick={() => setExpanded((prev) => !prev)}
                  type="button"
                >
                  {expanded ? 'Show less' : 'Read more'}
                </button>
              )}
              <div>
                <h4 className="bold-text">{testimonials[currentIndex].name}</h4>
                <h5 className="p-text">{testimonials[currentIndex].company}</h5>
              </div>
            </div>
          </motion.div>
          <div className="app__testimonial-btns app__flex">
            <div className="app__flex" onClick={() => handleClick(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)}>
              <HiChevronLeft />
            </div>
            <div className="app__flex" onClick={() => handleClick(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)}>
              <HiChevronRight />
            </div>
          </div>
        </div>
      )}

      <div className="app__testimonial-brands app__flex">
        {brands.map((brand) => (
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, type: 'tween' }}
            key={brand._id}
          >
            <img src={urlFor(brand.imgUrl).url()} alt={brand.name} />
          </motion.div>
        ))}
        <p className="testimonial-disclaimer" style={{ fontSize: '0.8rem', color: '#888', marginTop: '1rem', textAlign: 'center', width: '100%' }}>
    All trademarks and logos are property of their respective owners and are used here for informational and portfolio purposes only.
  </p>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Testimonial, 'app__testimonial'),
  'testimonial',
  'app__primarybg',
);