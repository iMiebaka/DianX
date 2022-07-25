import TextConversation from "./TextConversation";

const LeftConversation = ({ data }) => {
  return (
    <div className="self-start md:w-4/5 w-full">
      {data.type == "text" && <TextConversation data={data} />}
    </div>
  );
};

export default LeftConversation;
