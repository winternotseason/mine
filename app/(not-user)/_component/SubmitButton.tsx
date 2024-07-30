import { ClipLoader } from "react-spinners";

interface Props {
  text: string;
  pending: boolean;
}

const SubmitButton = ({ text, pending }: Props) => {
  return (
    <button className={`text-sm cursor-pointer mt-3 text-white ${pending ?'bg-black/50 ' :'bg-black '} w-full p-3 rounded-lg shadow-md hover:bg-black/80 transition duration-200`}>
      {pending ? text + "중..": text}
    </button>
  );
};

export default SubmitButton;
