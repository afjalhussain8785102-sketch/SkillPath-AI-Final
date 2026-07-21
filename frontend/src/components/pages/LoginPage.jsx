import { useState } from "react";

function LoginPage() {
        const [ email, setEmail ] = useState('')
        const [ password, setPassword ] = useState('')
        const [ showPassword, setShowPassword ] = useState(false)
        const [error, setError ] = useState('');

        const handleSubmit = (e) => {
            e.preventDefault();
            if(!email || !password)
                setError('Plese fill in this fields.')
            return;
            }
            setError('');
                console.log('Logging in with: ', {email, password});
        }
    
        return (
            <div className="auth-container">
                <div className="auth-card">
                    <h2>Sign In to <span className="gradient-text">SkillPath AI</span></h2>
                    {error && <p className="error-messange">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" placeholder="your@example.com" value= {email} onChange={(e) => setEmail(e.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <div className="password-input-wrapper">
                                <input type="password" placeholder="*******" value= {password} onChange={(e) => password(e.target.value)}></input>
                                <button type="button" className="show-hide-btn" onClick = {() => setShowPassword(!showPassword)}></button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        )


