import React from 'react';
import './Footer.css';
import logo from '../logo.svg';

export class Footer extends React.Component{
    render(){
        return(
            <footer className="Footer">
                <div className="line-div">
                    <p>グラデーション</p>
                    <hr className="line line1" />
                    <p>二重線</p>
                    <div style={{height:"30px",width:"100%",display:"block"}}>
                        <hr className="line line2"></hr>
                    </div>
                </div>
                <h2 className="check1">Hoge</h2>
                <div className="Pointer">
                    <h1 className="Pointer">Cursor</h1>
                </div>
                <div className="ham-menu-wrapper">
                    <a className="ham-menu-button"><span></span></a>
                </div>
                <div className="dot">
                    <h1>Hello, World!</h1>
                    <div className="dot-header">
                        <div className="dot-container">
                            <div className="dot-icon">
                                <img src={logo} width={150} height={150} alt=""/>
                            </div>
                            <div className="dot-info">
                                <h1>
                                    NakZ Michael
                                </h1>
                                <p>
                                    React Practice!
                                </p>
                                <ul>
                                    <li><img src={logo} width={50} height={50} alt=""/></li>
                                    <li><img src={logo} width={50} height={50} alt=""/></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="dot-body">
                        <section className="dot-works">
                                <h1>
                                    WORKS
                                </h1>
                                <section>
                                    <img src={logo} width={100} height={100} alt=""/>
                                    <h1>React楽しい</h1>
                                    <p>楽しいReact!!!!凄い凄い凄い凄い凄い凄い凄い凄い凄い凄い凄い凄い凄い凄い凄い凄い凄い凄い凄い凄い凄い凄い凄い凄い凄い凄い凄い凄い凄い凄い凄い凄い凄い凄い凄い凄い凄い</p>
                                </section>
                                <section>
                                    <img src={logo} width={100} height={100} alt=""/>
                                    <h1>React楽しい</h1>
                                    <p>楽しいReact楽しい楽しい楽しい楽しい楽しい楽しい楽しい楽しい楽しい楽しい楽しい楽しい楽しい楽しい楽しい楽しい楽しい楽しい楽しい楽しい楽しい楽しい楽しい楽しい楽しい楽しい楽しい楽しい楽しい楽しい楽しい楽しい楽しい楽しい楽しい楽しい楽しい楽しい楽しい!!!!</p>
                                </section>
                        </section>
                    </div>
                    <div className="dot-footer">
                        <p>copyrights!</p>
                    </div>
                </div>
            </footer>
        )
    }
}