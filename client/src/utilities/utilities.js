export const throttle = (fn, wait) => {
    let enableCall = true;

    return function(){

        if(!enableCall) return;

        enableCall = false;

        fn();
        setTimeout(() => enableCall = true, wait);
    }
};

export const checkValidity = (value, rules, valueSet) => {
    let isValid = true;
    let errType = null;

    if(rules.required && isValid){
        isValid = value.trim() !== "" && isValid;
        if(!isValid) {errType = "required"};
    };

    if(rules.minLength && isValid){
        isValid = value.length >= rules.minLength && isValid;
        if(!isValid) {errType = "minLength"};
    };

    if(rules.isUnique && isValid){
        if(!valueSet){throw new Error("No value set provided for 'isUnique' validation")}
        isValid = !valueSet.includes(value) && isValid;
        if(!isValid) {errType = "isUnique"};
    };

    return {isValid, errType};
};