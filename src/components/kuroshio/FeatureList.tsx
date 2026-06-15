import { KuroshioIcon } from "@/components/kuroshio/IconMap";

export interface FeatureListProps {
  readonly items: ReadonlyArray<string>;
  readonly columns?: "one" | "two";
}

export function FeatureList({ items, columns = "two" }: Readonly<FeatureListProps>) {
  return (
    <ul className={columns === "two" ? "grid gap-4 pt-4 md:grid-cols-2" : "grid gap-3 pt-4"}>
      {items.map((item) => (
        <li className="flex items-start gap-2 text-on-surface" key={item}>
          <KuroshioIcon className="mt-0.5 size-5 shrink-0 text-secondary" name="check" />
          <span className="text-base leading-6">{item}</span>
        </li>
      ))}
    </ul>
  );
}
