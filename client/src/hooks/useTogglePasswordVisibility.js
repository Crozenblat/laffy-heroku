const useTogglePasswordVisibility = (controls, setControls) => {
    for(let controlName in controls){
        if(controlName.match(/password/gi)){
            setControls(prev => ({
                ...prev,
                [controlName]:{
                    ...prev[controlName],
                    type: prev[controlName].type === "password" ? "text" : "password"
                }
            }));
        }
    };
};

export default useTogglePasswordVisibility;