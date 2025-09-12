import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tooltip as ReactTooltip } from 'react-tooltip'

import { AppWrap, MotionWrap } from '../../wrapper';
import { TerminalWindow, TerminalPrompt } from '../../components';
import { urlFor, client } from '../../client';
import './Skills.scss';
import '../education/Education.scss';

const Skills = () => {
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const [educationItems, setEducationItems] = useState([]);

  useEffect(() => {
    const query = '*[_type == "experiences"]';
    const skillsQuery = '*[_type == "skills"]';
    const educationQuery = '*[_type == "education"] | order(order asc, startDate desc)';

    client.fetch(query).then((data) => {
      setExperiences(data);
    });

    client.fetch(skillsQuery).then((data) => {
      setSkills(data);
    });

    client.fetch(educationQuery).then((data) => {
      setEducationItems(data || []);
    });
  }, []);

  return (
    <>
       <h2 className="head-text">Skills & Experiences</h2>

      {/* Terminal Skills Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="skills-terminal-section"
      >
        <TerminalWindow 
          title="skills --list" 
          variant="skills"
          className="skills-terminal"
        >
          <TerminalPrompt command="skills --list" delay={0.5}>
            <div className="skills-output">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="skill-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                >
                  <span className="checkmark">✔️</span>
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-level">
                    {skill.bgColor ? 'Expert' : 'Proficient'}
                  </span>
                </motion.div>
              ))}
            </div>
          </TerminalPrompt>
        </TerminalWindow>
      </motion.div>

      <div className="app__skills-container">
        <motion.div className="app__skills-list">
          {skills.map((skill, index) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item"
              key={`${skill.name}-${index}`}
            >
              <div
                className="app__skills-icon"
                style={{ backgroundColor: skill.bgColor }}
              >
              <img src={urlFor(skill.icon).width(90).auto('format').quality(80).url()} alt={skill.name} loading="lazy" />
              </div>
              <p className="p-text">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>
           <div className="app__skills-exp">
          {experiences.map((experience, expIndex) => (
            <motion.div
              className="app__skills-exp-item"
              key={`${experience.year}-${expIndex}`}
            >
            <div className="app__skills-exp-year">
                <p className="bold-text">{experience.year}</p>
              </div>
              <motion.div className="app__skills-exp-works">
                {experience.works.map((work, workIndex) => (
                  <React.Fragment key={`${work.name}-${workIndex}`}>
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className="app__skills-exp-work"
                      data-tip
                      data-for={work.name}
                      data-tooltip-id={work.name}
                      data-tooltip-content={work.desc}
                    >
                      <h4 className="bold-text">{work.name}</h4>
                      <p className="p-text">{work.company}</p>
                    </motion.div>
                    <ReactTooltip
                      id={work.name}
                      effect="solid"
                      arrowColor="#fff"
                      className="skills-tooltip"
                    >
                      {work.desc}
                    </ReactTooltip>
                  </React.Fragment>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
      {educationItems.length > 0 && (
        <>
          <h2 className="head-text" style={{ marginTop: '3rem' }}>Education</h2>
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
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Skills, 'app__skills'),
  'skills',
  'app__whitebg',
);