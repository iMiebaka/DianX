import copy from "copy-to-clipboard";
import IMAGE from "../assets/images";
import TextConversation from "./TextConversation";

const LeftConversation = ({ data }) => {
  return (
    <div className="self-start md:w-4/5 w-full">
      {true && <TextConversation data={data} />}
    </div>
  );
};

export default LeftConversation;
