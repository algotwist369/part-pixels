

const PrimaryButton = ({ text = "Button Text" }) => {
    return (
        <button
            className="
        relative overflow-hidden cursor-pointer
        px-6 py-2.5
        text-[18px] font-semibold
        text-[#c1a362]
        border-2 border-[#c1a362]
        rounded-[34px]
        bg-transparent
        transition-all duration-300
        ease-[cubic-bezier(0.23,1,0.32,1)]
        z-[1]
        before:content-['']
        before:absolute
        before:inset-0
        before:m-auto
        before:w-[50px]
        before:h-[50px]
        before:rounded-[inherit]
        before:bg-[#c1a362]
        before:scale-0
        before:-z-[1]
        before:transition-all
        before:duration-700
        before:ease-[cubic-bezier(0.23,1,0.32,1)]
        hover:before:scale-[3]
        hover:text-[#212121]
        hover:scale-110
        hover:shadow-[0_0_20px_rgba(193,163,98,0.4)]
        active:scale-100
      "
        >
            {text}
        </button>
    );
};

export default PrimaryButton;