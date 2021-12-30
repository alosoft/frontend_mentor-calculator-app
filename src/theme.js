import React, { useState, createContext } from 'react';

export const ThemeContext = createContext();

const ThemeProvider = (props) => {
    let mode = localStorage.getItem('theme');
    const [theme, setTheme] = useState(mode ?? 'dark');
    const themes = {
        "dark": {
            "main-background": "var(--theme1-main-background)",
            "toggle-keyboard-background": "var(--theme1-toggle-keyboard-background)",
            "screen-background": "var(--theme1-screen-background)",
            "keypad-background": "var(--theme1-keypad-background)",
            "keypad-shadow": "var(--theme1-keypad-shadow)",
            "key-equal-toggle": "var(--theme1-key-equal-toggle)",
            "key-equal-shadow": "var(--theme1-key-equal-shadow)",
            "key-background": "var(--theme1-key-background)",
            "key-shadow": "var(--theme1-key-shadow)",
            "text": "var(--theme1-text)",
            "text-2": "var(--theme1-text-2)",
        },
        "light": {
            "main-background": "var(--theme2-main-background)",
            "toggle-keyboard-background": "var(--theme2-toggle-keyboard-background)",
            "screen-background": "var(--theme2-screen-background)",
            "keypad-background": "var(--theme2-keypad-background)",
            "keypad-shadow": "var(--theme2-keypad-shadow)",
            "key-equal-toggle": "var(--theme2-key-equal-toggle)",
            "key-equal-shadow": "var(--theme2-key-equal-shadow)",
            "key-background": "var(--theme2-key-background)",
            "key-shadow": "var(--theme2-key-shadow)",
            "text": "var(--theme2-text)",
            "text-2": "var(--theme2-text-2)",
        },

        "voilet": {
            "main-background": "var(--theme3-main-background)",
            "toggle-keyboard-background": "var(--theme3-toggle-keyboard-background)",
            "screen-background": "var(--theme3-screen-background)",
            "keypad-background": "var(--theme3-keypad-background)",
            "keypad-shadow": "var(--theme3-keypad-shadow)",
            "key-equal-toggle:": "var(--theme3-key-equal-toggle)",
            "key-equal-shadow:": "var(--theme3-key-equal-shadow)",
            "key-background": "var(--theme3-key-background)",
            "key-shadow": "var(--theme3-key-shadow)",
            "text": "var(--theme3-text)",
            "text-2": "var(--theme3-text-2)",
        }
    }
    function getTheme() {
        return themes[theme];
    }
    return <ThemeContext.Provider value={[theme, setTheme, getTheme]}>
        {props.children}
    </ThemeContext.Provider>
}

export default ThemeProvider;
