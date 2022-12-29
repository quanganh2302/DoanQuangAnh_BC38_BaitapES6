export let hideLongString = (string, length) => {
  if (string.length > length) {
    return string.slice(0, length) + "...";
  } else {
    return string;
  }
};
export let numberWithCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
export let enterToActive = (selectorInput, selectorBtn) => {
  document.querySelector(selectorInput).addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      document.querySelector(selectorBtn).click();
    }
  });
};
