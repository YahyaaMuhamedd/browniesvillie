
type handleclick = {
  handleclick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  buttonName: string,
  cssClasses?: string
};


export default function Button({ handleclick, buttonName, cssClasses }: handleclick) {
  return (
    <>
      <button onClick={handleclick} className={`rounded-lg bg-mainColor text-secondColor ${cssClasses}`}>{buttonName}</button>
    </>
  )
}
