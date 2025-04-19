export const SignIn = (props) => {
    const { image } = props
    return (
        <div className="inline-flex justify-center items-center bg-white rounded-lg shadow-md w-full">
            <img src={image} alt="Sign In" className="object-cover w-20 p-4" />
        </div>
    )
}