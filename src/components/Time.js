import React from 'react'

function Time({}, ref){
    return(
        <div id = 'time'>
            <h1 ref = {ref}></h1>
        </div>
    )
}
const forwardTime = React.forwardRef(Time)
export default forwardTime