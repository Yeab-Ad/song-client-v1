export const BoxShadow: string = "0 1px 14px 0px #8a21ff";

export const formatNumber = (
  number: number,
  locale: string = "en-US"
): string => {
  return new Intl.NumberFormat(locale).format(number);
};

export const formatDate = (dateInput: any) => {
  const dateString = dateInput;
  if (dateString) {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().substr(0, 10);
    return formattedDate;
  }
  return 0;
};

export function truncateWords(text: string, wordCount: number) {
  if (!text) return "";
  const actualLetterCount = text.length;
  if (actualLetterCount <= wordCount) {
    return text;
  }
  const truncatedText = text.slice(0, wordCount);
  return truncatedText + "...";
}

export const getObject = (dataArray: any[], textToFind: any) => {
  const object = dataArray?.find((obj) => obj.name === textToFind);
  return object;
};

export const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "rgba(";
  for (let i = 0; i < 3; i++) {
    color += Math.floor(Math.random() * 256);
    if (i < 2) color += ",";
  }
  color += ", 0.4)";
  return color;
};
