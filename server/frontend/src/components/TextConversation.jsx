import copy from "copy-to-clipboard";
import moment from "moment";

const TextConversation = ({ data }) => {
  return (
      <div title="click to copy"
        onClick={() => copy(data.message)}
        className="px-8 py-4 rounded hover:border hover:cursor-pointer"
      >
        <p className="leading-relaxed mb-1">
         {data.message}
        </p>
        <p className="flex justify-end self-end text-gray-400">{moment(data.createdOn).format("LT")}</p>
      </div>
  );
};

export default TextConversation;
