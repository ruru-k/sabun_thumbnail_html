let id;
const img_src={}
all.forEach(src => {
  const fileName = src.split('../')[1];
  const key = `${fileName.split('-')[0]}${fileName.split('-')[1]}`;
  if(key!==id) {
    id=key;
    img_src[id]=[];
  }
  img_src[id].push(src);
})