const fs = require('fs');
const regex = new RegExp('^.*\.(jpg|jpeg|png|gif)$');
const delimiter = '-';
fs.readdir('.', function(err, files){
  if (err) throw err;
  const fileList = files.filter(function(file){
      return fs.statSync(file).isFile() && regex.test(file); //絞り込み
  })

  const compare = (a, b) => {
    //作者が違うならスルー
    if (a.split(delimiter)[0] !== b.split(delimiter)[0]) return 0;
    if (a.split(delimiter)[1] === b.split(delimiter)[1]){
      //作品が同じidのとき
      if (a.split(delimiter)[3] & b.split(delimiter)[3]) {
        return a.split(delimiter)[3] - b.split(delimiter)[3];
      } else {
        return 0;
      }
    } else {
      //作品が違うidのとき
      return a.split(delimiter)[1] - b.split(delimiter)[1];
    }
    
  }

  fileList.sort(compare);

  const data = `all = [...all, ${fileList.map(src=>`'${__dirname.replaceAll('\\', '\\\\')}/../${src}'`)}]`;
  //const data = `all = [...all, ${fileList.map(src=>`'${src}'`)}]`;
  fs.writeFile("./js/all_src.js", data, (err) => {
    if (err) throw err;
    console.log('正常に書き込みが完了しました');
  });
});