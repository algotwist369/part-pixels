import { FaTelegramPlane } from "react-icons/fa";

const SendButton = ({ text = "Send", type = "button", ...buttonProps }) => {
    return (
        <button
            type={type}
            {...buttonProps}
            className="
        group
        flex items-center
        overflow-hidden
        cursor-pointer
        border-none
        rounded-2xl
        bg-[#5bd7ff]
        px-4 py-3
        pl-4
        text-[20px]
        font-inherit
        text-white
        transition-all duration-200
        active:scale-95
      "
        >
            <span
                className="
          flex items-center justify-center
          transition-transform duration-300 ease-in-out
          group-hover:animate-[fly_0.6s_ease-in-out_infinite_alternate]
        "
            >
                <FaTelegramPlane
                    className="
            text-[24px]
            transition-transform duration-300 ease-in-out
            group-hover:translate-x-[1.2em]
            group-hover:rotate-45
            group-hover:scale-110
          "
                />
            </span>

            <span
                className="
          ml-[0.3em]
          block
          transition-transform duration-300 ease-in-out
          group-hover:translate-x-[5em]
        "
            >
                {text}
            </span>
        </button>
    );
};

export default SendButton;
