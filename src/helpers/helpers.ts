import { IWorkDay } from "../interfaces/interfaces";

export const convertName = (name: string) => {
  const words = name.split(" ");
  return words.length > 1 ? `${words[0]} ${words[1][0]}.` : name;
};

export const convertPrice = (price: number | undefined) => {
  return price ? `$${price}` : "Free";
};

export const convertDate = (date: string | null) => {
  return date ? date.replace(/-/g, ".") : "Unknown";
};

export const formatDate = (isoDate: string): string => {
  return new Date(isoDate).toLocaleDateString("uk-UA").replace(/\./g, "/");
};

export const truncateText = (text: string, wordLimit: number = 15): string => {
  const words = text.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;
};

export const formatWorkDays = (
  workDays: Partial<IWorkDay>[] | Partial<IWorkDay> | null
): string => {
  const daysArray = Array.isArray(workDays) ? workDays : [workDays];
  const openDay = daysArray.find((day) => day?.isOpen && day.from && day.to);
  return openDay ? `${openDay.from}-${openDay.to}` : "Day and night";
};
