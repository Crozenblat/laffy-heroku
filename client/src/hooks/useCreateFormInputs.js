import React from "react";
import FormInput from "../components/UI/Inputs/FormInput";

const useCreateFormInputs = (controls, setControls, inputChangedHandler) => {
    let inputConfigurations = [];

    for(let key in controls){
        inputConfigurations.push({
            id: key,
            config: controls[key]
        });
    };
    
    let inputs = inputConfigurations.map(formInput => {
        return(
            <FormInput
                id={formInput.id}
                key={formInput.id}
                value={formInput.config.value}
                type={formInput.config.type}
                touched={formInput.config.touched}
                isValid={formInput.config.isValid}
                errMsg={formInput.config.errMsg}
                onchange={(event) => inputChangedHandler(event, formInput.id, controls, setControls)}>
                    {formInput.config.label}
                </FormInput>
        );
        
    });

    return inputs
};

export default useCreateFormInputs;