import { Link } from 'react-router-dom';
function CTABanner(){
    return(
        <section className="cta-banner">
            <h2>Ready to bullid your persoalized sill path?</h2>
            <p>Join thousands of students learning at their own pace with AI.</p>
            <Line to="/regitster" className="btn btn-light">Get Started Now</Line>
        </section>
    );
}

export default CTABanner;