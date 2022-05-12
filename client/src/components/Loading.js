import React from "react";

const Loading = ({loading, small}) => {
    if(small){
        return(
            <div className="loading-small">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        ) 
    }
   
    if(loading.isLoading){        
        return(
        <div className="loading-big">
            <div className="loading-big-bg">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
        );
   }

   return;
}

export default Loading;