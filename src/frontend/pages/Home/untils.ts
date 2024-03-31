import { Domain } from "@/types";

export const getErrorMessage = (failedResource: Domain) =>
  `Failed to load ${failedResource} data. Please try again later or a different location.`;
