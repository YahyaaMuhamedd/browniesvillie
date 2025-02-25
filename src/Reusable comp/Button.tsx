
type handleclick = {
  handleclick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
};


export default function Button({ handleclick }: handleclick) {
  return (
    <>
      <button onClick={handleclick}>Button</button>
    </>
  )
}
