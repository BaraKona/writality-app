export const convertDate = (timestamp: any): string => {
  const date = timestamp.toDate();
  const mm = date.getMonth();
  const dd = date.getDate();
  const yyyy = date.getFullYear();
  return `${mm}/${dd}/${yyyy} ${date.getHours()}:${date.getMinutes()}`;
};
