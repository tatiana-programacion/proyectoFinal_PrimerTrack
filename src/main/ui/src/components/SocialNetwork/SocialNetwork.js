import './SocialNetwork.scss'

const SocialNetwork = () => {
    return(
        <div className="social-network">
            <i data-testid="social" className="fa-brands fa-facebook"></i>
            <i data-testid="social" className="fa-brands fa-linkedin-in"></i>
            <i data-testid="social" className="fa-brands fa-twitter"></i>
            <i data-testid="social" className="fa-brands fa-instagram"></i>
        </div>
    )
}

export default SocialNetwork;