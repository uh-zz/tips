import React from 'react'
import './index.css'
import logo from '../logo.svg'

export function BasicFlex(){
    return(
        <div className="BasicFlex" >
            <div className="container">
                <div className="box box1"> 1</div>
                <div className="box box2"> 2</div>
                <div className="box box3"> 3</div>
                <div className="box box4"> 4</div>
                <div className="box box5"> 5</div>
                <div className="box box6"> 6</div>
            </div>
            <h1>two column layout</h1>
            <div className="two-column">
                <header >
                    <img src={logo}  height={100} width={100} alt=""/>
                    {/* <nav> */}
                        <ul>
                            <li><a href="">menu</a></li>
                            <li><a href="">menu</a></li>
                            <li><a href="">menu</a></li>
                        </ul>
                    {/* </nav> */}
                </header>
                <div className="two-column-container">
                    {/* <main>Main FlexBoxではmarginの相殺は起きない</main>
                    <nav>Nav</nav>
                <aside>Aside</aside> */}
                    <div className="pic">
                        <img src={logo}  height={100} width={100} alt=""/>
                        <p>こんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちは</p>
                    </div>
                </div>
                <footer>Footer</footer>
            </div>
        </div>
    )
}

export default BasicFlex