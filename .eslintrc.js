module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true,
        "jquery": true,
        "shared-node-browser": true,
    },
    "globals": {
        FB: true,
        shaka: true,
    },
    "extends" : [
      "airbnb"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "no-plusplus": 0,
        "react/jsx-filename-extension": [1, { "extensions": [".jsx"] }],
        "indent": [
            "error",
            4,
            { "SwitchCase": 1 }
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "react/jsx-indent": [
            "error",
            4
        ],
        "react/jsx-indent-props": [
            "error",
            4
        ],
        "react/require-default-props": 0,
        "jsx-a11y/no-static-element-interactions": [0],
        "jsx-a11y/anchor-has-content": [0],
        "class-methods-use-this": [0],
        "no-useless-escape": 0,
        "no-case-declarations": 0,
        "no-underscore-dangle": 0,
    }
};
