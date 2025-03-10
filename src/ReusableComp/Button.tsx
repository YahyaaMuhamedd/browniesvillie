
type handleclick = {
  buttonName: string,
  handleclick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  cssClasses?: string,
  type?: "button" | "submit" | "reset" | undefined
};


export default function Button({ handleclick, buttonName, cssClasses, type }: handleclick) {
  return (
    <>
      <button
        onClick={handleclick}
        type={type}
        className={`rounded-lg bg-mainColor text-secondColor py-2 hover:bg-hoverColor px-4 duration-300 transition-all ${cssClasses}`}
      >{buttonName}
      </button>
    </>
  )
}
