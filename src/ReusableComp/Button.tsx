
type handleclick = {
  buttonName: string,
  handleclick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  cssClasses?: string,
  type?: "button" | "submit" | "reset" | undefined,
  disabled?: boolean,
};


export default function Button({ handleclick, buttonName, cssClasses, type, disabled }: handleclick) {
  return (
    <>
      <button
        onClick={handleclick}
        type={type}
        disabled={disabled}
        aria-label={buttonName}
        className={`rounded-lg bg-mainColor text-secondColor py-2 hover:bg-hoverColor px-4 duration-300 transition-all ${cssClasses}`}
      >{buttonName}
      </button>
    </>
  )
}
