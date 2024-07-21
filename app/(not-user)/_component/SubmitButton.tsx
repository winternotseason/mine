import { ClipLoader } from "react-spinners";

interface Props {
  text: string;
  pending: boolean;
}

const SubmitButton = ({ text, pending }: Props) => {
  return (
    <button className="text-sm cursor-pointer mt-3 text-white bg-black w-full p-3 rounded-lg shadow-md hover:bg-black/80 transition duration-200 ">
      {pending ? <ClipLoader color="#eeeeee" size={20} /> : text}
    </button>
  );
};

export default SubmitButton;
