module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "indent": [0],
        "react/jsx-indent": [0],
        "react/no-string-refs": [1],
        "react/no-render-return-value": [1],
        "jsx-a11y/no-noninteractive-element-interactions": [1],
        "react/no-unused-prop-types": [1],

        "no-case-declarations": [0],
        "arrow-body-style": [0],
        "generator-star-spacing": [0],
        "global-require": [1],
        "import/extensions": [0],
        "import/no-extraneous-dependencies": [0],
        "import/no-unresolved": [0],
        "import/prefer-default-export": [0],
        "jsx-a11y/no-static-element-interactions": [0],
        "no-bitwise": [0],
        "no-cond-assign": [0],
        "no-else-return": [0],
        "no-nested-ternary": [0],
        "no-restricted-syntax": [0],
        "no-use-before-define": [0],
        "react/forbid-prop-types": [0],
        "react/jsx-filename-extension": [1, {
            "extensions": [".js"]
        }],
        "react/jsx-no-bind": [0],
        "react/prefer-stateless-function": [0],
        "react/prop-types": [0],
        "require-yield": [1],
        "jsx-a11y/anchor-is-valid": [0],
        "no-underscore-dangle": [0],
        "object-curly-newline": [0],
        "func-names": [0],
        "react/no-array-index-key": [0],
        "jsx-a11y/click-events-have-key-events": [0],
        "no-plusplus": [0],
        "linebreak-style": [
            0,
            "error",
            "windows"
        ],
        // 正确的使用const 在this.props解构的时候, 为了简便使用了let
        "prefer-const": [0],
        // 不允给参数重新赋值 
        "no-param-reassign": [0],
        // 函数未被调用 对应这种表达式cb && cb()会报错
        "no-unused-expressions": [0],
        // 必须指定defaultProps, 但是对于很多组件,不传props很也是一种状态
        "react/require-default-props": [0],
        "jsx-a11y/label-has-for": [0],
        // 多个操作符需要加括号, 明确指定先后顺序
        "no-mixed-operators": [0],
        "react/no-find-dom-node": [0],
        "max-len": [0],
        // 箭头函数不返回赋值语句
        "no-return-assign": [0],
        // tabIndex属性不能加在 不是focusable元素上
        "jsx-a11y/no-noninteractive-tab": [0],
        "jsx-a11y/no-noninteractive-tabindex": [0],

        // react class 函数书写顺序
        "react/sort-comp": ["error", {
            "order": [
                "static-methods",
                "lifecycle",
                "/^handle.+$/",
                "getters",
                "setters",
                "/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/",
                "everything-else",
                "/^render.+$/",
                "render"
            ]
        }]
    },
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true
        }
    }
};