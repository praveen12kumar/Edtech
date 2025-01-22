
export const validatePassword = (string)=>{
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d@$!%*?&#^]{8,}$/;
    if(!regex.test(string)) {
        return false;
    }
    return true;
}
