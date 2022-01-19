import React from 'react';
import { Link,useLocation  } from "react-router-dom";

function ResumeformScreen(props) {

    const {state} = useLocation();
    const { resumeid,resumename } = state;
    // const { resumeid,resumename } = useLocation();
    console.log("resume id is "+resumeid);
    console.log("resume id is "+resumename);

    return (
        <div>
            <p>Forms</p>
        </div>
    );
}

export default ResumeformScreen;