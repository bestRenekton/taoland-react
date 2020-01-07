const { createAction } = require('../actions')
const { componentName, componentType } = require('../prompts')
const { componentBasePath, templateBasePath } = require('../config')

const genComponent = () => ({
  description: '新增组件',
  prompts: [componentName, componentType],
  actions: [
    createAction({//添加tsx
      type: 'add',
      path: `${componentBasePath}/{{componentName}}/{{componentName}}.tsx`,
      templateFile: `${templateBasePath}/component.{{componentType}}.tsx.hbs`,
    }),
    createAction({//添加scss
      type: 'add',
      path: `${componentBasePath}/{{componentName}}/{{componentName}}.less`,
      templateFile: `${templateBasePath}/component.less.hbs`,
    }),
  ],
})

module.exports = genComponent
