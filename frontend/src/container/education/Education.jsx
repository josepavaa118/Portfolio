import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import { AppWrap, MotionWrap } from '../../wrapper';
import { client, urlFor } from '../../client';
import './Education.scss';

const Education = () => {
  const [educationItems, setEducationItems] = useState([]);

  useEffect(() => {
    const query = '*[_type == "education"] | order(order asc, startDate desc)';
    client.fetch(query).then((data) => setEducationItems(data || []));
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <>
      <h2 className="head-text">Education</h2>

      <div className="app__education-list">
        {educationItems.map((edu, index) => {
          const tooltipId = `${edu._id || 'edu'}-${index}`;
          return (
          <motion.div
            whileInView={{ opacity: [0, 1], y: [20, 0] }}
            transition={{ duration: 0.4 }}
            className="app__education-item"
            key={tooltipId}
            data-tip
            data-for={tooltipId}
            data-tooltip-id={tooltipId}
            data-tooltip-content={edu.description || ''}
          >
            {edu.logo ? (
              <div className="app__education-logo app__flex">
                <img src={urlFor(edu.logo).url()} alt={edu.institution || 'institution-logo'} />
              </div>
            ) : null}

            <div className="app__education-content">
              {edu.institution ? <h4 className="bold-text">{edu.institution}</h4> : null}
              {edu.degree ? <p className="p-text app__education-institution">{edu.degree}</p> : null}
              {(edu.startDate || edu.endDate) ? (
                <p className="p-text app__education-dates">
                  {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                </p>
              ) : null}
              {/* description shown via tooltip on hover */}
            </div>
            {edu.description ? (
              <ReactTooltip
                id={tooltipId}
                effect="solid"
                arrowColor="#fff"
                className="skills-tooltip"
              >
                {edu.description}
              </ReactTooltip>
            ) : null}
          </motion.div>
        )})}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Education, 'app__education'),
  'education',
  'app__whitebg',
);


