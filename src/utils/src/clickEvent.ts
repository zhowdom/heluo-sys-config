export function initClickOutsideToClose(
  dialog,
  onClose: () => void
): () => void {
  console.log(dialog, 'dialog')
  const dialogElement = typeof dialog === 'string' 
    ? document.querySelector(dialog) 
    : dialog;
  
  if (!dialogElement) {
    console.warn('Dialog element not found');
    return () => {};
  }
  const handleClickOutside = (event: MouseEvent) => {
    // 检查点击是否在弹窗内部
    const isClickInside = dialogElement.contains(event.target as Node);
    // 如果点击在弹窗外部且弹窗是可见的
    if (!isClickInside && (dialogElement.style.display === '' || dialogElement.style.display === 'block')) {
      dialogElement.style.display = 'none';
      if (typeof onClose === 'function') {
        onClose();
      }
    }
  };
  document.addEventListener('click', handleClickOutside);

  return () => {
    document.removeEventListener('click', handleClickOutside);
  };
}