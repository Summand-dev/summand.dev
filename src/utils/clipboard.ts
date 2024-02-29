export async function copyToClipboard(link: string) {
  try {
    // New api for clipboard copy
    await navigator.clipboard.writeText(link);
  } catch {
    // Old api for clipboard copy
    const el = document.createElement('textarea');
    el.value = link;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
}
