import toTitleCase from "../../utils/titlecase";

export default function SectionTitle({ name }: { name: string }) {
  return (
    <h2 id={`${name}-title`} className="text-lg font-bold tracking-tight">
      {toTitleCase(name)}
    </h2>
  );
}
