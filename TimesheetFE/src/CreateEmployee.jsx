import { useEffect } from "react";

const CreateEmployee = () => {
    const handleSubmit = event => {
        event.preventDefault();
        alert('Employee created.')
    }

useEffect(() => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ })
    }
})
  
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <fieldset>
                <p>Last Name</p>
                <input className = 'input-smecher' /> 
                <p>First Name</p>
                <input className = 'input-smecher' />
                <p>Job Title</p>
                <input className = 'input-smecher' />
                <p>Department Name</p>
                <input className = 'input-smecher' />
                </fieldset>
                <button type = "submit">Submit</button>
            </form>
        </div>
    )
  }
  
  export default CreateEmployee;