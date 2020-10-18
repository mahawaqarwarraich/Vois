import React, {createContext} from "react";

const themes = {
    red: {
        hex: '#ED4739'
    },
    blue: {
        hex: '#458BFF',
    },
    yellow: {
        hex: '#FFD459',
    },
    green: {
        hex: '#19C270',
    },
};

const ThemeContext = createContext(themes);

export default ThemeContext;