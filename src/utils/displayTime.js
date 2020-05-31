var displayTime = (time) => {
  let m = Math.floor(time/60);
  let s = Math.round(time%60);
  let min = '';
  let sek = '';
  m < 0 && (m = 0);
  s < 0 && (s = 0);
  m < 10 ? min = '0'+m : min = m;
  s < 10 ? sek = '0'+s : sek = s;
  return (min + ":" + sek);
}

export default displayTime
