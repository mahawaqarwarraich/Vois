import React, { useEffect, useState, useCallback, 
    
 } from "react";
import axios from "axios";
import './style.scss';
import { AppContext } from '../../context/AppContext';
import { useHistory } from 'react-router-dom';
import authHeader from "../../services/auth-header";


function Sidebar(props) {
    const history = useHistory();
    const [profilePicture,setProfilePicture] = useState(null);
    const [user, setUser] = useState(null);

    
    const [commands, setCommands] = useState([]);

    const setCommandsState = useCallback(cmds => {
        if (cmds !== null) {
            setCommands(cmds); // Update with the new commands
        }
    }, []);

    useEffect(()=>{
        axios
            .get("http://localhost:8000/get-profile/" + user?.userId, {
              headers: authHeader(),
            })
            .then((response) => {
              console.log(response.data.userProfile);
    
              setProfilePicture(response.data.userProfile.ProfilePhotoSecureId);
    
            })
            .catch((error) => {
              console.log(error);
            });
    
      }, [user]);

    useEffect(() => {
        props.setsetStateFunc(setCommandsState);
    }, [props, props.setsetStateFunc, setCommandsState]); // Explicit dependencies

    const renderProfileView = () => {
        if (user) {
            history.push(`/profile/${user?.userId}`);
        }
      };

      useEffect(()=> {
        const usr = JSON.parse(localStorage.getItem("user"));
        setUser(usr);

      }, [user])

    return (
        <React.Fragment>
            <div className="sidebar">
                {
                   window.location.pathname !== "/signup" && window.location.pathname !== "/facial-login" ? (
                    <div id='profile-section' className="profile-section">
                        <div
                            className="profile-pic"
                            style={{ backgroundImage: `url(${profilePicture})` }}
                        >
                        </div>
                        <h2 style={{marginBottom: '15px'}}>{user?.username}</h2>
                        <button onClick={renderProfileView} className="profile-btn">View profile</button>
                    </div>
                ) : ""
                }
               <div id='commands-section'>
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
                
            </div>
        </React.Fragment>
    );
}

export default Sidebar;