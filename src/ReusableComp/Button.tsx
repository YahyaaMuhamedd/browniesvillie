
type handleclick = {
  buttonName: string,
  handleclick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  cssClasses?: string,
  type?: "button" | "submit" | "reset" | undefined
};


export default function Button({ handleclick, buttonName, cssClasses, type }: handleclick) {
  return (
    <>
      <button onClick={handleclick}
        type={type}
        className={`rounded-lg bg-mainColor text-secondColor ${cssClasses}`}
      >{buttonName}
      </button>
    </>
  )
}
