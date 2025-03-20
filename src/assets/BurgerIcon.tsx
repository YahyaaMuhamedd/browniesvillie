

interface BurgerIconProps {
    isOpen: boolean;
    toggle: () => void;
}

const BurgerIcon: React.FC<BurgerIconProps> = ({ isOpen, toggle }) => {
    return (
        <button
            onClick={toggle}
            className="relative w-8 h-8 flex flex-col justify-between items-center"
        >
            <span
                className={`block w-8 h-1 bg-mainColor rounded transition-all duration-300 ${isOpen ? "rotate-45 translate-y-[17.5px]" : ""
                    }`}
            ></span>
            <span
                className={`block w-8 h-1 bg-mainColor rounded transition-opacity duration-300 ${isOpen ? "opacity-0" : "opacity-100"
                    }`}
            ></span>
            <span
                className={`block w-8 h-1 bg-mainColor rounded transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2.5" : ""
                    }`}
            ></span>
        </button>
    );
};

export default BurgerIcon;
