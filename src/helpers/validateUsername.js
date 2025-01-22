export const validateUsername = (string) => {
    const regex = /^[a-zA-Z0-9_-]{3,15}$/;
    if(!regex.test(string)) {
        return false;
    }
    return true;
};