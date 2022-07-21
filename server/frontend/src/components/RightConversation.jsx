import TextConversation from "./TextConversation";

const RightConversation = ({ data }) => {
  return (
    <div className="self-end md:w-4/5 w-full">
      {true && <TextConversation data={data} />}
    </div>
  );
};

export default RightConversation;
