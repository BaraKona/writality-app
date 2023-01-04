export const convertDate = (timestamp: any): string => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const time = new Date(timestamp);
  const mm = time.getMonth();
  const dd = time.getDate();
  const yyyy = time.getFullYear();
  const yy = yyyy.toString().slice(-2);
  return `${dd}-${months[mm]}-${yy} ${time.getHours()}:${time.getMinutes()}`;
};
