import LeftConversation from "./LeftConversation";
import RightConversation from "./RightConversation";

const Conversation = ({ data, user }) => {
  return (
    <div
      className=" bg-gray-100 rounded-t-lg py-2 lg:flex flex-col md:ml-auto w-full md:mt-0 overflow-y-scroll 
    "
      style={{ maxHeight: "75vh" }}
    >
      {/* <div className="self-end mb-8 h-1/2 md:w-4/5 w-2/4">
        <img
          className="px-8 py-4 rounded"
          src={IMAGE.imageOne}
          alt=""
          srcSet=""
          />
        </div> */}
      {data.map((item) => {
        // item.userId == user.deviceId ?  (
        // console.log(item.userId == user.deviceId)

        return <LeftConversation key={item.id} data={item} />;
        // ) :
        // (
        //  console.log(item.userId == user.deviceId)
        // <RightConversation key={item.id} data={item} />
        // );
      })}
    </div>
  );
};

export default Conversation;
