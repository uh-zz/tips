type Twitter = {
    twitterId: string;
}

type Instagram = {
    instagramId: string;
}
  
// 型合成
const sns: Twitter & Instagram = {
    twitterId: "hoge",
    instagramId: "fuga"
}

// 型合成（インターフェース）
interface PartyPeople extends Twitter, Instagram {
}