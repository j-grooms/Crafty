import { useState } from 'react';
import LoginForm from "../LoginForm";
import SignupForm from "../SignupForm";
import Modal from "../Modal";
import "./SplashPage.css";

const SplashPage = () => {
    const [login, setLogin] = useState(false);
    const [signup, setSignup] = useState(false);
	return (
		<div className="splash-background">
			<div className="forms-holder">
				<button onClick={() => setLogin(true)}>Sign in</button>
				<button onClick={() => setSignup(true)}>Sign up</button>
                <Modal open={login} onClose={() => setLogin(false)}>
                    <LoginForm />
                </Modal>
                <Modal open={signup} onClose={() => setSignup(false)}>
                    <SignupForm />
                </Modal>
			</div>
		</div>
	);
};

export default SplashPage;
