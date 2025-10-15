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
    const isClickInside = dialogElement.contains(event.target as Node);
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