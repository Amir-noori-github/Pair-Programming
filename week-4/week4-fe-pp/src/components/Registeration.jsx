import { useState } from "react";

function Registration() {
    const onSubmit = e => {
        e.preventDefault();
        const registration = {
            name,
            email,
            password,
            submittedOn: new Date()
        }

        console.log(registration);
        // Reset the form state.
        setName('');;
        setEmail('');;
        setPassword('');;
    }
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className="registration">
            <h2>Registration</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor='name'>Name:</label>
                    <input id='name' type='text' value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='email'>Email:</label>
                    <input id='email' type='text' value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='password'>Password:</label>
                    <input id='password' type='password' value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
};

export default Registration;
