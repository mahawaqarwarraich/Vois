import React from 'react'
import SkillBar from 'react-skillbars';
import "./Skills.scss";

const Skills = () => {
    const skills = [
        {type: "Communication", level: 85},
        {type: "Writing", level: 90},
        {type: "Management", level: 80},
        {type: "Leading", level: 85},
      ];
    return (
        <div className="skills">
            <h1>Skills</h1>
            <div style={{width:"70vw"}}>
                <SkillBar skills={skills}/>
            </div>
        </div>
    )
}

export default Skills
