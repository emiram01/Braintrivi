type Props = {
  text: string;
}

export default function FormLabel({ text }: Props) {
  return <label className="mt-4 font-normal text-gray-700">{ text }</label>
}