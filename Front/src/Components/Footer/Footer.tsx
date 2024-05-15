import "./Footer.css";

const Footer = () => {
    return (
        <div className="footer">
            <div className="container my-5">
                <footer className="text-center text-lg-start" style={{ backgroundColor: '#212529' }}>
                    <div className="container d-flex justify-content-center py-5">
                        <button type="button" className="btn btn-primary btn-lg btn-floating mx-2" style={{ backgroundColor: '#212529' }}>
                            <i className="fab fa-facebook-f"></i>
                        </button>
                        <button type="button" className="btn btn-primary btn-lg btn-floating mx-2" style={{ backgroundColor: '#212529' }}>
                            <i className="fab fa-youtube"></i>
                        </button>
                        <button type="button" className="btn btn-primary btn-lg btn-floating mx-2" style={{ backgroundColor: '#212529' }}>
                            <i className="fab fa-instagram"></i>
                        </button>
                        <button type="button" className="btn btn-primary btn-lg btn-floating mx-2" style={{ backgroundColor: '#212529' }}>
                            <i className="fab fa-twitter"></i>
                        </button>
                    </div>

                    <div className="text-center text-white p-3" style={{ backgroundColor: '#212529' }}>
                        © 2024 Todos los derechos reservados:
                        <a className="text-white" href="https://github.com/Gonzadeveloper/PF/tree/desarrollo" target="_blank"> Electro Emporium</a>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Footer;
