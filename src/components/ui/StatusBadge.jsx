import { STATUS_COLOR_MAP } from "../../utils/constants";
import Badge from "./Badge";

export default function StatusBadge({ status }) {
  return <Badge color={STATUS_COLOR_MAP[status] || "muted"}>{status}</Badge>;
}
