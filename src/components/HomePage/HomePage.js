import React, { useEffect, useState } from "react";

import PageCard from "./PageCard";

import './style.scss';

    


function HomePage(props) {
    const [user, setUser] = useState(null);

    // useEffect(()=> {
    //     const userString = localStorage.getItem("user");
    //     const usr = userString ? JSON.parse(userString) : null;
    //     setUser(usr);
    // }, [user])

    return (
        <>
           

            <div className="flex-center">
           
                <div className="bmh-container">
                <div className="logo-container">
                <h1 className="welclome">{`Welcome, Golden!`}</h1>
                <img src='/images/voisLogo.svg' alt='vois logo' className="logo2" />
            </div>
                    {props.config ? props.config.tabs ? props.config.tabs.map(tab =>
                        (<div key={tab.id} className="bmh-container--item"><PageCard config={{ ...tab }} /></div>)
                    ) : 'No Tabs Passed...' : 'No Config Passed...'}
                </div>
            </div>
        </>

    );

};

export default HomePage;