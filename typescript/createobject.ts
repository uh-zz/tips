// オブジェクトで返す方法
//
// こういう書き方するようにしよう
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