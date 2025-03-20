type TitleProps = {
    title: string,
    cssClasses?: string

}
const Title = ({ title, cssClasses }: TitleProps) => {
    return (
        <h1 className={`text-4xl contain mx-auto font-bold my-5 ${cssClasses}`}>{title}</h1>
    );
}

export default Title;