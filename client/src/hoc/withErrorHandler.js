import React, {Component} from "react";

import InfoMessage from "../components/Messages/InfoMessage";

const withErrorHandler = (WrappedComponent) => {
    return class extends Component{
        state= {
            hasError: null,
            error: null
        };

        static getDerivedStateFromError(error){
            return{
                hasError: true,
                error: error
            }
        };

        render(){
            if(this.state.hasError){
                return <InfoMessage>{`Oops, something went wrong: ${this.state.error}`}</InfoMessage>
            };

            return <WrappedComponent {...this.props}/>
        };
    }
};

export default withErrorHandler;