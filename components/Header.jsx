// header component for bitsave algo
'use client'
import LiskConnect from "./auth"

const Header = () => {
    return (
        <div className="top_home_wraper">

        {/* <!-- Header Start --> */}
        <header className="fixed">
            {/* <!-- container start --> */}
            <div className="container">
                {/* <!-- navigation bar --> */}
                <nav className="navbar navbar-expand-lg">
                    {/* <a className="navbar-brand" href="/">
                        <img src="/bit1.png" alt="image" />
                    </a> */}
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon">
                            <div className="toggle-wrap">
                                <span className="toggle-bar"></span>
                            </div>
                        </span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#protocol">Protocol</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#hiw">How it works</a>
                            </li>
                            {/* <!-- secondery menu start --> */}
                            <li className="nav-item">
                                <a className="nav-link" href="#team">Team</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="https://docs.google.com/document/d/11qa_KT4dhbrIQHY4ma8zgsYo-t-WwKdQV-Sf-RzHf54/edit?usp=sharing" target="_blank">One-pager</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="https://cryptosmartnow.io/contact">Contact</a>
                            </li>

                            <li className="nav-item ">
                            <LiskConnect />
                            </li>
                        </ul>
                    </div>
                </nav>
                {/* <!-- navigation end --> */}
            </div>
            {/* <!-- container end --> */}
        </header>

        {/* <!-- Banner-Section-Start --> */}
        <section className="banner_section">
            <div className="container">
                <div className="banner_text">
                    <div className="ban_inner_text" data-aos="fade-up" data-aos-duration="1500">
                        <span>Secured, Easier and Faster</span>
                        <h1>The savings Protocol of #web3 Finance</h1>
                        <p>Bitsave Protocol helps you save and earn in Crypto without losing your savings to Crypto Market volatility.
                        </p>
                    </div>
                    <div className="row container justify-content-center d-flex align-self-center my-2 text-center">
                        <div className="btn_group col-lg-3 mb-3 text-center">
                            <a href="https://forms.gle/TgQm8DfRnsiPmpPt6" className="btn btn_main" data-aos="fade-right" data-aos-duration="1500">Join our waitlist <i className="fas fa-scroll"></i></a>
                        </div>

                        <div className="btn_group col-lg-3 mb-3 text-center">
                            <a href="https://youtube.com/playlist?list=PLBVK_AKYV8sPvpV_bihIaAA0b2tsAHU5q" target="_blank" className="btn btn_main" data-aos="fade-right" data-aos-duration="1500">Watch Videos<i className="fas fa-play-circle"></i></a>
                        </div>
                    </div>

                </div>
                <div className="banner_images" data-aos="fade-up" data-aos-duration="1500">
                    <img src="/banner.png" alt="image" className="img-fluid" />
                    <div className="sub_images">
                        <img className="moving_animation img-fluid" src="/banner1.png" alt="image" style={{ height: '150px' }} />
                        <img className="moving_animation img-fluid" src="/banner2.png" alt="image" style={{ height: '150px' }} />
                        <img className="moving_animation img-fluid" src="/banner3.png" alt="image" style={{ height: '150px' }} />
                    </div>
                </div>
            </div>
        </section>


    </div>
    )
}

export default Header