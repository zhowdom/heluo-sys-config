export function autoImg(cardname:string, subpath:string) {
  let imgsMap: Record<string, { default: string }> = {}
  switch(subpath) {
    case 'seat2':
      imgsMap = import.meta.glob('@assets/usedimg/seat2/*.png', { 
        eager: true 
      })
        break;
    case 'device':
      imgsMap = import.meta.glob('@assets/usedimg/device/*.svg', { 
        eager: true 
      })
        break;
    case 'seat':
      imgsMap = import.meta.glob('@assets/usedimg/seat/*.png', { 
        eager: true 
      })
        break;
    default:
      console.log('not matched')
  }
  const _path = `/src/assets/usedimg/${subpath}/`
  return subpath === 'device' ? imgsMap[_path + cardname + '.svg']['default'] : imgsMap[_path + cardname + '.png']['default']
}