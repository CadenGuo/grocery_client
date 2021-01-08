export const createNewTabWithURL = (url: string) => {
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('target', '_blank');
  document.body.appendChild(link);
  link.click();
  if (!link || !link.parentNode) {
    throw new Error();
  }
  link.parentNode.removeChild(link);
};

const getRootElementFontSize = () => {
  // Returns a number
  return parseFloat(
    // of the computed font-size, so in px
    getComputedStyle(
      // for the root <html> element
      document.documentElement,
    ).fontSize,
  );
};

export const convertRemToPixel = (valueInRem: number) => {
  return valueInRem * getRootElementFontSize();
};
