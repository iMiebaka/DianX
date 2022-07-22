import copy from "copy-to-clipboard";

const TextConversation = ({ data }) => {
  return (
      <div title="click to copy"
        onClick={() => copy("Text to copy sdh")}
        className="px-8 py-4 rounded hover:border hover:cursor-pointer"
      >
        <p className="leading-relaxed mb-1">
          Synth chartreuse iPhone lomo cray raw denim brunch everyday carry
          neutra before they sold out fixie 90's microdosing. Tacos pinterest
          fanny pack venmo, post-ironic heirloom try-hard pabst authentic
          iceland.
        </p>
        <p className="flex justify-end self-end">8:30PM</p>
      </div>
  );
};

export default TextConversation;
