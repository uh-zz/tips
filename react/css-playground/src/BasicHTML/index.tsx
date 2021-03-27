import React from 'react'
import './index.css'
// 画像はこうやって読み込む
import  logo from './img/logo.png'
// headの情報とかはpublicのindex.htmlに書いてる
function BasicHTML(){
    return(
        <div className="BasicHTML">
            <header>
                {/* srcのようなものを属性と呼ぶ */}
                <img src={logo} width="100%" alt="Penguin's photo"/>
            </header>
            <nav>
                <ul>
                    <li><a href="#about">このアプリについて</a></li>
                    <li><a href="#history">沿革</a></li>
                </ul>
            </nav>
            <main>

            {/* 開始タグ、コンテンツ、終了タグ */}
            {/* 全てまとめて要素ともいう */}
            <h1><span style={{color:"red"}}>React</span> Playground</h1>
            <p>NakZ's React playground</p>
            
            <h2 id="about">What's this app?</h2>
            <p><strong>React</strong> is a good frontend framework!</p>
            
            <h2>Hello, World!</h2>
            <blockquote cite="http://example.com/">
                <p>It is 5 O'clock!</p>
            </blockquote>

            <hr/>

            <h2>My name is NakZ.</h2>
            <p>This is <br/>
            my web page!</p>

            {/* 文字実態参照 */}
            <p>&lt;br&gt;タグはこうやってかける</p>

            {/* preタグはこうやって書く */}
            <pre>
{`
とっても
便利な
preタグ
`
}
            </pre>
        <h2>リスト</h2>
            <ul>
                <li>hoge</li>
                <li>hoge</li>
                <li>hoge</li>
            </ul>

            <ol>
                <li>fuga</li>
                <li>fuga</li>
                <li>fuga</li>
            </ol>
            <dl>
                <dt>foo</dt>
                <dd>bar</dd>

                <dt>foo</dt>
                <dd>bar</dd>
                
                <dt>foo</dt>
                <dd>bar</dd>
            </dl>

            <h2>テーブル</h2>

            <h2 id="history">沿革</h2>
            <table>
                <thead>
                    <tr>
                        <th>年</th>
                        <th>出来事</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>2014</td>
                        <td>会社設立</td>
                    </tr>
                    <tr>
                        <td>2016</td>
                        <td>サイトリニューアル</td>
                    </tr>
                </tbody>
            </table>

            <h2>aタグ</h2>
            <p>
                <a href="http://example.com/">Example.com</a>
            </p>
            <p>新しくタブを開く方</p>
            <p>
                <a href="http://example.com/" target="_blank">Example.com</a>
            </p>
            </main>

            <input type="text" name="" id=""/>
            <input type="text" name="" id="" value="Hello"/>
            <input type="password" name="" id="" />
            {/* textareaは普通のHTMLと書き方が異なる */}
            <textarea name="" id="" cols={30} rows={10} value="hoge" />
            <textarea name="" id="" cols={30} rows={10} placeholder="Hello, World!" />


            <p>ラベルの使い方</p>
            <div>
                <label >名前
                    <input type="text" />
                </label>

            </div>
            <div>
                <p>forは予約後だからhtmlForを使うよ</p>
                <label htmlFor="name">名前</label>
                <input type="text" id="name"/>
            </div>

            <div>
                <h2>ドロップダウンリスト</h2>
                <label htmlFor="color">好きな色は？</label>
                {/* <select name="color" id="color" size={4} multiple  > */}
                <select name="color" id="color" >
                    <option value="">色1</option>
                    <option value="">色2</option>
                    <option value="" selected>色3</option>
                    <option value="">色4</option>
                    <option value="">色5</option>
                    <option value="">色6</option>
                </select>
            </div>

            <div>
                <h2>チェックボックス</h2>
                <p>fieldsetとlegendでグループ化</p>
                <fieldset>
                    <legend>お使いのスマホ(複数選択可能)</legend>
                    <label><input type="checkbox" name="phone1" id=""/>IPhone</label>
                    <label><input type="checkbox" name="phone1" id="" defaultChecked />Android</label>
                    <label><input type="checkbox" name="phone1" id=""/>その他</label>
                </fieldset>
                <fieldset>
                    <legend>お使いのスマホ(一つだけ選択可能)</legend>
                    <label><input type="radio" name="phone" id=""/>IPhone</label>
                    <label><input type="radio" name="phone" id="" defaultChecked />Android</label>
                    <label><input type="radio" name="phone" id=""/>その他</label>
                </fieldset>
            </div>

            <div>
                <h2>モダンな入力欄</h2>
                <input type="color"/>
                <input type="date" name="" id=""/>
                <input type="number" name="" id=""/>
                <input type="range" name="" id=""/>
            </div>

            <div>
                <h2>ボタン</h2>
                <input type="button" value="OK"/>
                <button>OK</button>

                <p>Disabled</p>
                <input type="button" value="OK" disabled />
                <button disabled>OK</button>
            </div>

            <div>
                <h2>フォーム</h2>
                <form action="/hoge" method="post">
                    <label htmlFor="">担当者名<input type="text" name="username" id=""/></label>
                    <label htmlFor="">タスク<input type="text" name="task" id=""/></label>
                    <button>追加</button>
                </form>
            </div>

            <footer>
                <p><a href="#top">先頭に戻る</a></p>
            </footer>

        </div>
    )
}

export default BasicHTML