import React from 'react'

function Search({placeholder,onChange,onClick}, ref){
    return(
        <div id = 'form'>
            <input onChange = {onChange} ref = {ref} type = 'text' placeholder = {placeholder}/>
            <button id = 'searchBtn' onClick = {onClick}>Search</button>
        </div>
    )
}
const forwardSearch = React.forwardRef(Search)
export default forwardSearch