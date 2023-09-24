import { useState } from "react";

const CreateEmployee = () => {
    const [lastName, setLastName] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [jobTitle, setJobTitle] = useState(null);
    const [departmentName, setDepartmentName] = useState(null);

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            let res = await fetch('https://localhost:7209/api/employee/createemployee', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    lastName: lastName,
                    firstName: firstName,
                    jobTitle: jobTitle,
                    departmentName: departmentName,
                }),
            });
            await res.json();
            if (res.status === 200) {
                setLastName("");
                setFirstName("");
                setJobTitle("");
                setDepartmentName("");
                alert("Added employee.")
            } else {
                alert("Some error occured.");
            }
        } catch (err) {
            console.log(err);
        }
    };
  
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <fieldset>
                <p>Last Name</p>
                <input className = 'input-smecher' value={lastName} onChange={(event) => setLastName(event.target.value)}/> 
                <p>First Name</p>
                <input className = 'input-smecher' value={firstName} onChange={(event) => setFirstName(event.target.value)}/>
                <p>Job Title</p>
                <input className = 'input-smecher' value={jobTitle} onChange={(event) => setJobTitle(event.target.value)}/>
                <p>Department Name</p>
                <input className = 'input-smecher' value={departmentName} onChange={(event) => setDepartmentName(event.target.value)}/>
                </fieldset>
                <button type = "submit">Submit</button>
            </form>
        </div>
    )
  }
  
  export default CreateEmployee;