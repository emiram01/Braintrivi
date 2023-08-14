type Props = {
  text?: string;
}

export default function FormLabel({ text }: Props) {
  return <span className="text-red-500">{ text }</span>
}