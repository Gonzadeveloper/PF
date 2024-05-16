const Footer = () => {
    return (
        <footer className="bg-dark text-white py-3" style={{ backgroundColor: '#212529' }}>
            <div className="container-fluid">
                <div className="row align-items-center justify-content-between">
                    <div className="col-md-6">
                        <p className="mb-0">© 2024 Todos los derechos reservados, Electro Emporium</p>
                    </div>
                    <div className="col-md-6 d-flex justify-content-end">
                        <ul className="list-inline mb-0 d-flex align-items-center">
                            <li className="list-inline-item me-2">
                                <a className="text-body-secondary btn btn-transparent" href="https://github.com/Gonzadeveloper/PF/tree/desarrollo" target="_blank">
                                    <img src="https://static-00.iconduck.com/assets.00/social-github-icon-256x250-yv67pnv6.png" alt="Github" style={{ width: '40px' }} />
                                </a>
                            </li>
                            <li className="list-inline-item me-2">
                                <a className="text-body-secondary btn btn-transparent" href="https://es.react.dev/" target="_blank">
                                    <img src="https://img.icons8.com/?size=80&id=wPohyHO_qO1a&format=png" alt="React" style={{ width: '40px' }} />
                                </a>
                            </li>
                            <li className="list-inline-item me-2">
                                <a className="text-body-secondary btn btn-transparent" href="https://redux.js.org/" target="_blank">
                                    <img src="https://cdn.worldvectorlogo.com/logos/redux.svg" alt="Redux" style={{ width: '40px' }} />
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a className="text-body-secondary btn btn-transparent" href="https://www.typescriptlang.org/" target="_blank">
                                    <img src="https://www.svgrepo.com/show/374144/typescript.svg" alt="TypeScript" style={{ width: '40px' }} />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
