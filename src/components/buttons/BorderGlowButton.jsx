const BorderGlowButton = ({ text = "Button" }) => {
    return (
        <button
            className="
        group relative inline-flex cursor-pointer
        justify-center overflow-hidden
        rounded-lg
        px-8 py-4
        text-center font-barlow
        text-base uppercase text-white
        transition-transform duration-300 ease-in-out
        outline-offset-4
        focus:outline focus:outline-2 focus:outline-white focus:outline-offset-4
      "
        >
            <span className="relative z-20">{text}</span>

            {/* Shining hover effect */}
            <span
                className="
          absolute left-[-75%] top-0 z-10
          h-full w-[50%]
          rotate-12 bg-white/20 blur-lg
          transition-all duration-1000 ease-in-out
          group-hover:left-[125%]
        "
            />

            {/* Top left border */}
            <span
                className="
          absolute left-0 top-0 block
          h-[20%] w-1/2
          rounded-tl-lg
          border-l-2 border-t-2 border-[#D4EDF9]
          transition-all duration-300
          drop-shadow-3xl
        "
            />

            {/* Top right border */}
            <span
                className="
          absolute right-0 top-0 block
          h-[60%] w-1/2
          rounded-tr-lg
          border-r-2 border-t-2 border-[#D4EDF9]
          transition-all duration-300
          drop-shadow-3xl
          group-hover:h-[90%]
        "
            />

            {/* Bottom left border */}
            <span
                className="
          absolute bottom-0 left-0 block
          h-[60%] w-1/2
          rounded-bl-lg
          border-l-2 border-b-2 border-[#D4EDF9]
          transition-all duration-300
          drop-shadow-3xl
          group-hover:h-[90%]
        "
            />

            {/* Bottom right border */}
            <span
                className="
          absolute bottom-0 right-0 block
          h-[20%] w-1/2
          rounded-br-lg
          border-r-2 border-b-2 border-[#D4EDF9]
          transition-all duration-300
          drop-shadow-3xl
        "
            />
        </button>
    );
};

export default BorderGlowButton;