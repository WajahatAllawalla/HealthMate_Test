export const generateAvatar = (username) => {    
    if(!username) return '';
    let splitName = username.split('')
    return (splitName[0].charAt()).toUpperCase();
}

export const dateFormat = (date) => {
    const formated = new Date(date).toLocaleString("en-US", {
        dateStyle: "medium",
    })
    
    return formated;
}