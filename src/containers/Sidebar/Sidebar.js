import React, { useEffect, useState, useCallback } from "react";
import './style.scss';

function Sidebar(props) {
    const [commands, setCommands] = useState([]);

    const setCommandsState = useCallback(cmds => {
        if (cmds !== null) {
            setCommands(cmds); // Update with the new commands
        }
    }, []);

    useEffect(() => {
        props.setsetStateFunc(setCommandsState);
    }, [props, props.setsetStateFunc, setCommandsState]); // Explicit dependencies

    return (
        <React.Fragment>
            <div className="sidebar">
                <h6 className="h6">Commands & Descriptions</h6>
                <div className="commands">
                    {commands.length > 0 ? (
                        commands.map(cmd => (
                            <div className="command" key={cmd.command}>
                                <div className="button">{cmd.command}</div>
                                <div className="caption">{cmd.description}</div>
                            </div>
                        ))
                    ) : (
                        <p>Loading commands...</p>
                    )}
                </div>
            </div>
        </React.Fragment>
    );
}

export default Sidebar;