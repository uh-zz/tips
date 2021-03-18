type User = {
    name: string;
    age: number;
}

// オブジェクトで返す方法
//
// 返り値はオプション化する
function create(name: string, age: number): {user?: User, error?: Error} {
    if (age < 0) {
        return {
            error: new Error("hoge"),
        }
    }
    return {
        user: {
            name,
            age,
        }
    }
} 

const hoge = create("hoge",12);

// 一応名前があるからわかる
if (hoge.error) {
    console.log(`error: ${hoge.error}`);    
}

console.log(hoge.user);


// 合併型パターン
function createUnion(name: string, age: number): User | Error {
    if (age < 0) {
        return new Error("hoge");
    }
    return  {
        name,
        age,
    }
}

const hogeUnion = createUnion("hoge", 12);

// hogeUnionはUser | Errorのどちらにもなりうる、、
if (hogeUnion instanceof Error) {
    console.log(`error: ${hogeUnion}`);
}

console.log(hogeUnion);


// タプルパターン
function createTuple(name: string, age: number): [User?, Error?] {
    if (age < 0) {
        
        // 項目に名前がつけられないのが弱点、、 
        return [undefined, new Error("hoge")]
    }
    return [{name, age}];
}

// 呼び出し側はわかりやすい
const [ hogeTuple, error ] = createTuple("hoge",12);

// Goっぽい
if (error) {
    console.log(`error: ${error}`);
}

console.log(hogeTuple);