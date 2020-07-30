import React from 'react'

function City({}, ref){
    return(
        <div>
            <h2 ref = {ref}></h2>
        </div>
    )
}
const forwardCity = React.forwardRef(City)
export default forwardCity