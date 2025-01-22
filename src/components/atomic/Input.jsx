function Input({type,  className, onChange, name, id, accept, placeholder}){
    return(
        <input 
            id={id}
            name={name}
            className={className}
            type={type}
            onChange={onChange}
            accept={accept}
            placeholder={placeholder}
            />
    )
}


export default Input;