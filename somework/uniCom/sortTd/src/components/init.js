export function initLayout() {
  let devicePixelRatio = 1;
  if (sessionStorage.getItem('devicePixelRatio') != null) {
    let num =
      window.devicePixelRatio /
      Number(sessionStorage.getItem('devicePixelRatio'));
    devicePixelRatio = num.toFixed(2);
  } else {
    sessionStorage.setItem('devicePixelRatio', window.devicePixelRatio);
  }

  let h = `${document.documentElement.clientHeight * devicePixelRatio}` - 55;
  return h;
}
