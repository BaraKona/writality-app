export const convertDate = (timestamp: any): string => {
  const time = new Date(timestamp);
  const mm = time.getMonth();
  const dd = time.getDate();
  const yyyy = time.getFullYear();
  return `${dd}/${mm}/${yyyy} ${time.getHours()}:${time.getMinutes()}`;
};
