#include <bits/stdc++.h>
using namespace std;

// input_listの要素の可能な組み合わせの中から和が最大のものとその値を返す。
void maximum_set(vector<int> input_list,vector<int> &res_list,int  &res_val){
    int N = input_list.size();
    int max_value = -1000000;
    vector<int> res;
    for(int bit = 0;bit < (1<<N);bit++){
        int sum = 0;
        vector<int> tmp_vec(0);
        for(int i=0;i<N;i++){
            if(bit & (1<<i)){
                sum += input_list.at(i);
                tmp_vec.push_back(input_list.at(i));
            }
        }
        if( sum > max_value){
            max_value = sum;
            res = tmp_vec;
        }
    }
    res_val = max_value;
    res_list = res;
}

int main () {
    vector<int> A = { -100 ,1 ,2 , 3, 4,-1000};
    int max_val =0;
    vector<int> res;
    maximum_set(A,res,max_val);
    cout << "MAX VALUE: " << max_val << endl;
    cout << "MAX SET: [";
    for(int x:res){
        cout << x << ", ";
    }
    cout << "]" << endl;
}