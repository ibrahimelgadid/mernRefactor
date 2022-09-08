import {
  faCheckCircle,
  faExclamationCircle,
  faHistory,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

export const statusArr = [0, 1, 2, 3];
export const statusName = {
  0: "Pending",
  1: "Processing",
  2: "Cancelled",
  3: "Completed",
};

export const statusClass = {
  0: "text-yellow-300",
  1: "text-sky-600",
  2: "text-red-600",
  3: "text-green-600",
};

export const statusIcon = {
  0: faExclamationCircle,
  1: faCheckCircle,
  2: faTimesCircle,
  3: faHistory,
};
