import './Button.css'

function Button({content, anotherAddedClasses ,clickFunc}) {

    const btnClassName = "button" + anotherAddedClasses
    //console.log(btnClassName)
    return (
        <button 
            className={btnClassName}
            onClick={clickFunc}>
                {content}
        </button>
    )
}

export default Button