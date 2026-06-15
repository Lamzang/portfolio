export default function SectionTitle({
  name,
  id,
}: {
  name: string;
  id?: string;
}) {
  return (
    <h2 id={id} className="text-lg font-semibold tracking-tight">
      {name}
    </h2>
  );
}
