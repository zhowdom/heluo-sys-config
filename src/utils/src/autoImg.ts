export function autoImg(cardname:string, subpath:string) {
  let imgsMap: Record<string, { default: string }> = {}
  switch(subpath) {
    case 'seat':
      imgsMap = import.meta.glob('@assets/usedimg/seat/*.png', { 
        eager: true 
      })
        break;
    case 'device':
      imgsMap = import.meta.glob('@assets/usedimg/device/*.png', { 
        eager: true 
      })
        break;
    default:
      console.log('not matched')
  }
  const _path = `/src/assets/usedimg/${subpath}/`
  return imgsMap[_path + cardname + '.png']['default']
}