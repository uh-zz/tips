import { url } from 'node:inspector'
import React from 'react'
import './index.css'
import logo from './img/logo.png' 

export function BasicCSS2(){
    return(
        <div className="BasicCSS2">
            <h1 className="info title" data-title="- Title">見出し1</h1>
            <p>こんにちは。こんにちは。こんにちは。こんにちは。こんにちは。こんにちは。こんにちは。</p>
            
            <h2 className="title">見出し2</h2>
            <p>こんにちは。こんにちは。こんにちは。こんにちは。こんにちは。こんにちは。こんにちは。こんにちは。こんにちは。こんにちは。こんにちは。こんにちは。こんにちは。こんにちは。こんにちは。こんにちは。こんにちは。こんにちは。こんにちは。</p>
            
            <h1 id="title">見出し3</h1>

            <ul>
                <li><a href="http://example.com/" target="_blank">Example.com</a></li>
                <li><a href="http://example.com/" >Example.com</a></li>
                <li><a href="#top" >Top</a></li>
            </ul>

            <div className="btn">OK</div>

            <div className="basic-main">
                <p>こんにちは</p>
                <p>こんにちは</p>
                <p>こんにちは</p>
                <p>こんにちは</p>
                <p>こんにちは</p>
                <p>こんにちは</p>
                <p>こんにちは</p>
                <p>こんにちは</p>
                <p>こんにちは</p>
                <p>こんにちは</p>
                <p>こんにちは</p>
                <p>こんにちは</p>
            </div>

            <h1>ここで区切り</h1>
            <div className="basic-main2">
                <h1>見出し</h1>
                <p>こんにちは</p>
                <h2>見出し</h2>
                <h2>見出し</h2>
                <h2>見出し</h2>
                <h2>見出し</h2>
                <h2>見出し</h2>
                <h2>見出し</h2>
                <p>こんにちは</p>
                <p>こんにちは</p>
                <p>こんにちは</p>
                <p>こんにちは</p>
                <h2>見出し</h2>
                <p>こんにちは</p>
                <h2>見出し</h2>
                <p>こんにちは</p>
                <p>こんにちは</p>
                <p>こんにちは</p>
                <p>こんにちは</p>
                <p>こんにちは</p>
                <p>こんにちは</p>
            </div>
            <h1>emptyとnot</h1>
            <div>
                <ul className="empty">
                    <li>項目</li>
                    <li></li>
                    <li>項目</li>
                    <li>項目</li>
                    <li>項目</li>
                    <li>項目</li>
                    <li>項目</li>
                    <li>項目</li>
                </ul>
            </div>

        </div>
    )
}

export default BasicCSS2