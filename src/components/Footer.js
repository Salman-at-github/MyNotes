import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
    const openFB = () => {
        window.open('https://www.facebook.com', '_blank', 'noreferrer');
    };
    const openGoogle = () => {
        window.open('https://www.google.com', '_blank', 'noreferrer');
    };
    const openInsta = () => {
        window.open('https://www.instagram.com', '_blank', 'noreferrer');
    };
    const openLinkedin = () => {
        window.open('https://in.linkedin.com', '_blank', 'noreferrer');
    };
    const openGithub = () => {
        window.open('https://github.com', '_blank', 'noreferrer');
    };
    const openCWH = () => {
        window.open('https://www.codewithharry.com/tutorial/react-home/', '_blank', 'noreferrer');
    };
    const openYTCWH = () => {
        window.open('https://www.youtube.com/watch?v=hnVOvvbQrwA&list=PLu0W_9lII9agx66oZnT6IyhcMIbUMNMdt&index=3&ab_channel=CodeWithHarry', '_blank', 'noreferrer');
    };
    let location = useLocation();
    const NavigateTo = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        NavigateTo('/signin')
    }

    return (<>
        <div className="mt-4" >

            <footer className="text-center text-lg-start bg-light text-muted" >
                <section className="d-flex justify-content-center justify-content-lg-between p-2 border-bottom" style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
                    <div className="me-5 d-none d-lg-block">
                        <span>Get connected with us on social networks:</span>
                    </div>

                    <div>
                        <i className="fab fa-facebook-f me-4 text-reset" onClick={openFB}></i>
                        <i className="fab fa-google me-4 text-reset" onClick={openGoogle}></i>
                        <i className="fab fa-instagram me-4 text-reset" onClick={openInsta}></i>
                        <i className="fab fa-linkedin me-4 text-reset" onClick={openLinkedin}></i>
                        <i className="fab fa-github me-4 text-reset" onClick={openGithub}></i>
                    </div>
                </section>

                <section className="" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                    <div className="container text-center text-md-start mt-0" >
                        <div className="row pt-3">
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-2">
                                <h6 className="text-uppercase fw-bold mb-2">
                                    <i className="fas fa-gem me-3"></i>Creative Labs Pvt. Ltd.
                                </h6>
                                <p>
                                    Creative Labs Pvt. Ltd. is a joint venture by Ryo and Harry that focuses on learning through live interaction with the students.
                                </p>
                            </div>

                            {/* <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-2">
                                <h6 className="text-uppercase fw-bold mb-2">
                                    Reference
                                </h6>
                                <p>
                                    <Link to="/" className="text-reset">Angular</Link>
                                </p>
                                <p>
                                    <Link to="/" className="text-reset">React</Link>
                                </p>
                                <p>
                                    <Link to="/" className="text-reset">Vue</Link>
                                </p>
                                <p>
                                    <Link to="/" className="text-reset">Laravel</Link>
                                </p>
                            </div> */}

                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-2">
                                <h6 className="text-uppercase fw-bold mb-2">
                                    Useful links
                                </h6>
                                <p className="text-reset" onClick={openCWH} style={{ cursor: 'pointer', textDecoration: 'underline' }}>CodeWithHarry
                                </p>
                                <p className="text-reset" onClick={openYTCWH} style={{ cursor: 'pointer', textDecoration: 'underline' }}>Tutorials
                                </p>

                            </div>

                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-2">
                                <h6 className="text-uppercase fw-bold mb-2">Contact</h6>
                                <p><i className="fas fa-home me-3"></i> Bangalore, BA 560037, INDIA</p>
                                <p>
                                    <i className="fas fa-envelope me-3"></i>
                                    mynotebook@book.com
                                </p>
                                {/* <p><i className="fas fa-phone me-3"></i> + 01 234 567 88</p>
                                <p><i className="fas fa-print me-3"></i> + 01 234 567 89</p> */}
                            </div>
                        </div>
                    </div>
                </section>
                <div className="text-center p-2" style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
                    <p className="text-reset fw-bold" >© 2023 Copyright: MyNotebook</p>
                    {(location.pathname === '/') ? <p style={{
                        textDecoration: "underline",
                        cursor: "pointer",
                        display: "inline-block"
                    }} onClick={handleLogout}>Log out</p> : ''}
                </div>
            </footer>
        </div>
    </>)
}

export default Footer
