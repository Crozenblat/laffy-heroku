import {checkValidity} from "../utilities/utilities";

const useFormInputChangedHandler = (event, controlName, controls, setControls) => {
    event.persist();

    let controlsValueSet = [];

    for(let control of Object.keys(controls)){
        controlsValueSet.push(controls[control].value);
    };

    let {isValid, errType} = checkValidity(event.target.value, controls[controlName].validationRules, controlsValueSet);
    
    let errMsg;

    switch(errType){
        case "required":
            errMsg = `*Required: ${controls[controlName].label}`;
        break;
        case "minLength":
            errMsg = `*${controls[controlName].label} must be at least 8 characters long`;
        break;
        case "isUnique":
            errMsg = "*Current Password and New Password must not match";
        break;
        default:
            errMsg = null
    };

    setControls(prev => ({
        ...prev,
        [controlName]:{
            ...prev[controlName],
            value: event.target.value,
            isValid,
            errMsg,
            touched: true
        }
    }));
};

export default useFormInputChangedHandler;