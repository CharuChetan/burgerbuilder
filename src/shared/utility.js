export const checkValidation = (value, rules) => {
    let isvalid = true;
    if (rules.required) {
        isvalid = value.trim() !== '' && isvalid;
    }
    if (rules.minLength) {
        isvalid = value.length >= rules.minLength && isvalid;
    }
    if (rules.maxLength) {
        isvalid = value.length <= rules.maxLength && isvalid;
    }
    if (rules.isEmail) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        isvalid = re.test(String(value).toLowerCase());
    }

    return isvalid;
}
