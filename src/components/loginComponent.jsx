import { useState } from "react";
export default function LoginComponent() {

    const [focusedButton, setFocusedButton] = useState(0);

    const handleFocus = (index) => {
        setFocusedButton(index);
    };

    function LoginPage() {
        return (
            <>
                <input className='login-input' placeholder='Email address or phone number'></input>
                <input className='password-input' placeholder='Password'></input>
                <button className='login-btn'>Log in</button>
                <a href='' className="forget-password">Forgotten password?</a>
            </>
        )
    }

    function SignupPage() {
        return (
            <>
                <input className='login-input' placeholder='Email address or phone number'></input>
                <input className='password-input' placeholder='Password'></input>
                <input className='login-input' placeholder='Display name'></input>
                <input className='password-input' placeholder='Telephone number'></input>
                <button className='login-btn'>Create Account</button>
            </>
        )
    }

    return (
        <>
            <div className='login-container' >
                <div className="login-signup-options-btn">
                    <button className="option"
                        style={{
                            backgroundColor: focusedButton === 0 ? '#5FB2FF' : 'white',
                            border: focusedButton === 0 ? '0px' : '1px solid',
                            color: focusedButton === 0 ? 'white' : 'black'
                        }}
                        onFocus={() => handleFocus(0)} >
                        Log in
                    </button>
                    <button className="option"
                        style={{
                            backgroundColor: focusedButton === 1 ? '#5FB2FF' : 'white',
                            border: focusedButton === 1 ? '0px' : '1px solid',
                            color: focusedButton === 1 ? 'white' : 'black'
                        }}
                        onFocus={() => handleFocus(1)} >
                        Sign up
                    </button>
                </div>
                {
                    focusedButton === 0 ? LoginPage() : SignupPage()
                }
            </div >
        </>
    )
}