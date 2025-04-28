import React, {useEffect, useState} from 'react';

import {Paper, Typography, TextField} from '@material-ui/core';

import './style.scss';
import Selector from '../Selector';
import ArticleCoverImageSelector from '../Blog/ArticleCoverImageSelector';
import {useSpeechRecognition} from "react-speech-recognition";
import axios from "axios";
import authHeader from "../../services/auth-header";

const BMHPortfolioBuilder = (props) => {

    const [showHeader, setShowHeader] = useState(false);
    const [showFileName, setShowFileName] = useState(false);
    const [showAbout, setShowAbout] = useState(false);
    const [showSkills, setShowSkills] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [headername, setHeadername] = useState('');
    const [filename, setFilename ] = useState('');
    const [headerheadline, setHeaderheadline] = useState('');
    const [aboutParagraph, setAboutParagraph] = useState('');
    const [skillField, setSkillField] = useState('');
    const [skills, setSkills] = useState([]);
    const [email, setEmail] = useState('');
    const [skillLevel, setSkillLevel] = useState(0);

    const commandsAndDesc = [];

    const [active, setActive] = useState('');

    const commands = [
        {
            command: 'Add header section.',
            callback: cmd => {
                setActive('header');
                setTimeout(() => {
                    setShowHeader(true);
                }, 310)
                resetTranscript();
            },
            description: 'Adds a header section'
        },
        {
            command: 'Add file name.',
            callback: cmd => {
                setActive('header');
                setTimeout(() => {
                    setShowFileName(true);
                }, 310)
                resetTranscript();
            },
            description: 'Adds a header section'
        },
        {
            command: 'Add about section.',
            callback: cmd => {
                setActive('about');
                setTimeout(() => {
                    setShowAbout(true);
                }, 310)
                resetTranscript();
            },
            description: 'Adds an about section'
        },
        {
            command: 'Add skill section.',
            callback: cmd => {
                setActive('skills');
                setTimeout(() => {
                    setShowSkills(true);
                }, 310)
                resetTranscript();
            },
            description: 'Adds a skills section',
        },
        {
            command: 'Add detail section.',
            callback: cmd => {
                setActive('details');
                setTimeout(() => {
                    setShowDetails(true);
                }, 310)
                resetTranscript();
            },
            description: 'Adds a skills section',
        },
        {
            command: 'Set header name *.',
            callback: (val) => {
                setHeadername(val);
                resetTranscript();
            },
            description: 'Sets the name of the header',
        },
        {
            command: 'Set file name *.',
            callback: (val) => {
                setFilename(val);
                resetTranscript();
            },
            description: 'Sets the name of the file',
        },
        {
            command: 'Set about *.',
            callback: (val) => {
                setAboutParagraph((prevState => prevState + ` ${val}`));
                resetTranscript();
            },
            description: 'Sets the about paragraph value',
        },
        {
            command: 'Skill value *.',
            callback: (val) => {
                setSkillField(val);
                resetTranscript();
            },
            description: 'Sets the name of the skill',
        },
        {
            command: 'Level :num.',
            callback: (num) => {
                setSkillLevel(num);
                resetTranscript();
            },
            description: 'Sets the level of the skill',
        },
        {
            command: 'Enter value in list.',
            callback: (val) => {
                let v = [...skills]
                v.push({
                    type: skillField,
                    level: skillLevel,
                });
                setSkills([...v]);
                setSkillField('');
                setSkillLevel(0);
                resetTranscript();
            },
            description: 'Adds the skill to skills list',
        },
        {
            command: 'View my portfolios.',
            callback: () => {
                props.history.push('/my-portfolio');
            },
            description: 'Opens the page that lists your created portfolios.',
        },
        {
            command: 'Set email *.',
            callback: (email) => {
                setEmail(email);
                resetTranscript();
            },
            description: 'Sets the email.',
        },
        {
            command: 'Close.',
            callback: () => {
                setShowHeader(false);
                setShowFileName(false);
                setShowAbout(false);
                setShowDetails(false);
                setShowSkills(false);
                setActive('');
                resetTranscript();
            },
            description: 'Closes any opened modal',
        },
        {
            command: 'Submit.',
            callback: () => {
                axios.post('http://localhost:8000/add-portfolio', {
                    data: {
                        filename,
                        headername: headername,
                        aboutParagraph: aboutParagraph,
                        skills: skills,
                        email: email,
                    },
                    userId: JSON.parse(localStorage.getItem("user")).userId,
                    username: JSON.parse(localStorage.getItem("user")).username,
                },{
                    headers: authHeader(),
                }).then(res => {
                    console.log(res);
                    props.history.push({
                        pathname: `/portfolio/${res.data.portfolio._id}`,
                        state: { portfolioData: res.data.portfolio }
                    });
                }).catch(err => {
                    console.log(err);
                })
                resetTranscript();
            }
        }, {

        }
    ];
    


    const {transcript, resetTranscript} = useSpeechRecognition({commands});
    console.log(transcript);

    let wordCount = transcript.trim().split(/\s+/).length;

    commands.forEach(cmd => {
        commandsAndDesc.push({command: cmd.command, description: cmd.description})
    })

    const executeCallback = (callback) => {
        setTimeout(() => {
            callback();
        }, 3100)
    }


    //Handling incorrect commands
  const handleIncorrectCommand = () => {
    if (wordCount >=3 && wordCount <= 6) {
        resetTranscript();
    }
  };



//   useEffect(() => {
//     wordCount = transcript.trim().split(/\s+/).length;
//     if (wordCount >=3 && wordCount <= 6) {
//         resetTranscript();
//     }
//   }, [commands, resetTranscript, transcript]);



    useEffect(() => {
        if (props.setCommands)
            props.setCommands(commandsAndDesc);

    }, [commandsAndDesc, props])

    return (
        <>
            {/*<ArticleCoverImageSelector*/}
            {/*    // setCoverImage={setCoverImage}*/}
            {/*    // hide={() => {setShowImageSelector(false); updateSidebar()}}*/}
            {/*    // setCommands={props.setCommands}*/}
            {/*    // handleCoverImageChange={handleCoverImageChange}*/}
            {/*    {...props}*/}
            {/*/>*/}
            <div className={'portfolio-builder-container'}>
            {
                    showFileName  &&

                    (
                        <Selector commands={commands} {...props}>
                            <div className={'pad-20'}>
                                <TextField label={'Set file name'} variant={'outlined'} name={'filename'}
                                           value={filename} onChange={e => setFilename(e.target.value)} fullWidth/>
                            </div>
                        </Selector>
                    )
                }
                {
                    showHeader &&

                    (
                        <Selector commands={commands} {...props}>
                            <div className={'pad-20'}>
                                <TextField label={'Name to show in the header'} variant={'outlined'} name={'headername'}
                                           value={headername} onChange={e => setHeadername(e.target.value)} fullWidth/>
                            </div>
                        </Selector>
                    )
                }
                {
                    showAbout &&
                    (
                        <Selector commands={commands} {...props}>
                            <div className={'pad-20'}>
                                <TextField multiline={true} label={'About paragraph to be displayed in the portfolio'}
                                           variant={'outlined'} name={'aboutparagraph'} value={aboutParagraph}
                                           onChange={e => setAboutParagraph(e.target.value)} fullWidth/>
                            </div>
                        </Selector>
                    )
                }
                {
                    showSkills &&
                    (
                        <Selector commands={commands} {...props}>
                            <div className={'pad-20'}>
                                <TextField style={{marginBottom: '25px'}} label={'Add name of the skill'}
                                           variant={'outlined'} name={'skillfield'} value={skillField}
                                           onChange={e => setSkillField(e.target.value)} fullWidth/>
                                <TextField style={{marginBottom: '25px'}}
                                           label={'Add level of the skill in the range of 0 to 100'}
                                           variant={'outlined'} name={'skilllevel'} value={skillLevel}
                                           onChange={e => setSkillLevel(e.target.value)} fullWidth/>
                                {skills.map(skill => {
                                    return (
                                        <div key={skill.name} style={{
                                            borderLeft: '2.5px solid #4285f4',
                                            paddingLeft: '15px',
                                            marginBottom: '7.5px'
                                        }}>
                                            <Typography>{skill.type}</Typography>
                                            <Typography>{skill.level}</Typography>
                                        </div>
                                    )
                                })}
                            </div>
                        </Selector>
                    )
                }
                {
                    showDetails &&
                    (
                        <Selector commands={commands} {...props}>
                            <div className={'pad-20'}>
                                <TextField label={'Add email for people to contact you'} variant={'outlined'}
                                           name={'email'} value={email} onChange={e => setEmail(e.target.value)}
                                           fullWidth/>
                            </div>
                        </Selector>
                    )
                }

<div className={'portfolio-form-element'}>
                    <Paper style={{padding: '30px'}} variant={'outlined'} square>
                        <div
                            className={`${"paper-line paper-line-blue paper-line-left"}${" "}${active === 'header' ? 'paper-line-active' : ''}`}></div>
                        <Typography variant={'button'}>Add File Name</Typography>
                        <div
                            className={`${"paper-line paper-line-blue paper-line-right"}${" "}${active === 'header' ? 'paper-line-active' : ''}`}></div>
                    </Paper>
                </div>
                <div className={'portfolio-form-element'}>
                    <Paper style={{padding: '30px'}} variant={'outlined'} square>
                        <div
                            className={`${"paper-line paper-line-blue paper-line-left"}${" "}${active === 'header' ? 'paper-line-active' : ''}`}></div>
                        <Typography variant={'button'}>Add Header Section</Typography>
                        <div
                            className={`${"paper-line paper-line-blue paper-line-right"}${" "}${active === 'header' ? 'paper-line-active' : ''}`}></div>
                    </Paper>
                </div>
                <div className={'portfolio-form-element'}>
                    <Paper style={{padding: '30px'}} variant={'outlined'} square>
                        <div
                            className={`${"paper-line paper-line-red paper-line-left"}${" "}${active === 'about' ? 'paper-line-active' : ''}`}></div>
                        <Typography variant={'button'}>Add About Section</Typography>
                        <div
                            className={`${"paper-line paper-line-red paper-line-right"}${" "}${active === 'about' ? 'paper-line-active' : ''}`}></div>
                    </Paper>
                </div>
                <div className={'portfolio-form-element'}>
                    <Paper style={{padding: '30px'}} variant={'outlined'} square>
                        <div
                            className={`${"paper-line paper-line-green paper-line-left"}${" "}${active === 'skills' ? 'paper-line-active' : ''}`}></div>
                        <Typography variant={'button'}>Add Skill section</Typography>
                        <div
                            className={`${"paper-line paper-line-green paper-line-right"}${" "}${active === 'skills' ? 'paper-line-active' : ''}`}></div>
                    </Paper>
                </div>
                <div className={'portfolio-form-element'}>
                    <Paper style={{padding: '30px'}} variant={'outlined'} square>
                        <div
                            className={`${"paper-line paper-line-yellow paper-line-left"}${" "}${active === 'details' ? 'paper-line-active' : ''}`}></div>
                        <Typography variant={'button'}>Add Details Section</Typography>
                        <div
                            className={`${"paper-line paper-line-yellow paper-line-right"}${" "}${active === 'details' ? 'paper-line-active' : ''}`}></div>
                    </Paper>
                </div>

            </div>
        </>
    )

};


export default BMHPortfolioBuilder;
