import { Link } from 'react-router-dom';
function HeroSection(){
    return (
        <section className="hero-section">
            <h1>Personalized AI Roadmaps for <span className="gradient-text">Lifeling</span></h1>
            <p>Aligning with UN SDG 4 to make quality education and AAI-guided learning free</p>
            <div className="hero-buttons">
                <Link to="/register" className="btn btn-primary">Start Learning</Link>
                <Link to="/about" className="btn btn-primary">Learn More</Link>
            </div>
        </section>
    )
}

export default HeroSection;