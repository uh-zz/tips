#include <vector>
#include <functional>
#include <algorithm>
#include <iostream>
#include <cmath>

template<typename T, typename S>
void sort_with_function(std::vector<T> &vec, S fn(T),bool reverse = false){
    std::sort(vec.begin(),vec.end(),
        // lambda式を使うときは必要な変数をキャプチャする
        [fn,reverse](T left ,T right){
        // 昇順の時は left < right
        // 降順の時は　left > right
        if(reverse){
            return fn(left) > fn(right);
        }
        return fn(left)<fn(right);
    });
}
// BMIの昇順で並び替えてみる
struct Man{
    double height;
    double weight;
};
// BMIを計算する関数
double calc_bmi(Man man){
    return man.weight/(std::pow(man.height,2));
}

int main(){
    std::vector<Man> Men = {
        Man{1.5,50},
        Man{1.5,40},
        Man{1.5,30},
        Man{1.5,20},
        Man{1.5,100},
    };
    std::cout << "START ASCENDING" << std::endl;
    sort_with_function(Men,calc_bmi);
    for(auto x:Men){
        // デフォルトは昇順
        // 身長が同じなので体重が軽い順に表示されるはず
        std::cout << x.weight << std::endl;
    }
    std::cout << "START DECENDING" << std::endl;
    sort_with_function(Men,calc_bmi,true);
    for(auto x:Men){
        // 次は降順を試してみる
        // 身長が同じなので体重が重いい順に表示されるはず
        std::cout << x.weight << std::endl;
    }
}