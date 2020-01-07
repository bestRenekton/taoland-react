const { createAction } = require('../actions')
const { moduleName } = require('../prompts')
const { moduleBasePath, templateBasePath } = require('../config')

const genModule = () => ({
  description: '新增 model',
  prompts: [moduleName],
  actions: [
    createAction({
      type: 'add',
      path: `${moduleBasePath}/{{moduleName}}/action.ts`,
      templateFile: `${templateBasePath}/module.action.ts.hbs`,
    }),
    createAction({
      type: 'add',
      path: `${moduleBasePath}/{{moduleName}}/reducer.ts`,
      templateFile: `${templateBasePath}/module.reducer.ts.hbs`,
    }),
    createAction({
      type: 'add',
      path: `${moduleBasePath}/{{moduleName}}/saga.ts`,
      templateFile: `${templateBasePath}/module.saga.ts.hbs`,
    }),
    createAction({
      type: 'add',
      path: `${moduleBasePath}/{{moduleName}}/server.ts`,
      templateFile: `${templateBasePath}/module.server.ts.hbs`,
    }),
  ],
})

module.exports = genModule
