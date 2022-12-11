import { GENDER_ORIGIN } from "../constant";
import { GenderOriginKey } from "../types";

export const getIsActiveText = (isActive: boolean) => {
  return isActive ? "활성화" : "비활성화";
};

export const getGenderText = (str: GenderOriginKey) => {
  try {
    return GENDER_ORIGIN[str];
  } catch (error: unknown) {
    throw new Error(`unhandled gender origin key : ${error}`);
  }
};

export const getDeIdentifiedName = (name: string) => {
  const { length } = name;
  if (length === 2) return "*".repeat(length - 1) + name[length - 1];
  const newName = name[0] + "*".repeat(length - 1) + name[length - 1];
  return newName;
};
