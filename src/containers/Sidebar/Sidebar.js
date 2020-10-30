import React, {useEffect, useState} from "react";

import './style.scss';

function Sidebar(props) {

    const [commands, setCommands] = useState([])

    const setCommandsState = cmds => {
        if (cmds !== null) {
            setCommands(cmd => {
                return cmds;
            })
        }
    }

    useEffect(() => {
        props.setsetStateFunc(setCommandsState);
    }, [])

    return (
        <React.Fragment>
            <div className="sidebar">
                <h6 className="h6">Commands and Descriptions</h6>
                <div className="commands">
                    {commands.length > 0 ? commands.map(cmd => {
                        return (<div className="command" key={cmd.command}>
                            <div className="button">{cmd.command}</div>
                            <div className="caption">{cmd.description}</div>
                        </div>)
                    }) : 'loading commands...'}
                </div>
            </div>
        </React.Fragment>
    )

}

export default Sidebar;