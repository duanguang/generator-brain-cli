import { download } from './download-git-repo';
const ora  = require("ora");



export  async function downloadAndGenerate(template, templateDir) {
    const spinner = ora('正在初始化项目').start();
    await download(template, templateDir,{},async function (err) {
        await  spinner.stop();
        if (err) {
            console.log('Failed to download repo ' + template + ': ' + err.message.trim());
        }
        // generate
      })
  }