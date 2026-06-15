import {
  Activity,
  ArrowRight,
  Ban,
  BookOpen,
  Building2,
  CheckCircle2,
  Clock3,
  Cloud,
  Cpu,
  Database,
  Download,
  Factory,
  FlaskConical,
  Gauge,
  Globe2,
  Leaf,
  Mail,
  MapPin,
  Network,
  RadioTower,
  Settings,
  ShieldCheck,
  Waves,
  Wrench,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { IconKey } from "@/data/mockData";

export const iconMap: Readonly<Record<IconKey, LucideIcon>> = {
  activity: Activity,
  arrowRight: ArrowRight,
  ban: Ban,
  book: BookOpen,
  building: Building2,
  check: CheckCircle2,
  clock: Clock3,
  cloud: Cloud,
  cpu: Cpu,
  database: Database,
  download: Download,
  factory: Factory,
  flask: FlaskConical,
  gauge: Gauge,
  globe: Globe2,
  leaf: Leaf,
  mail: Mail,
  mapPin: MapPin,
  network: Network,
  radio: RadioTower,
  settings: Settings,
  shield: ShieldCheck,
  waves: Waves,
  wrench: Wrench,
  zap: Zap,
};

export interface KuroshioIconProps {
  readonly name: IconKey;
  readonly className?: string;
  readonly strokeWidth?: number;
}

export function KuroshioIcon({
  name,
  className = "size-5",
  strokeWidth = 2,
}: Readonly<KuroshioIconProps>) {
  const Icon = iconMap[name];
  return <Icon aria-hidden="true" className={className} strokeWidth={strokeWidth} />;
}
