#include <bits/stdc++.h>
using namespace std;
using ll = int64_t;

int main(){
    ll N;
    string N_str;
    cin >> N;
    N_str = to_string(N);
    int order;
    order = N_str.size();
    int max_c = (order -1)/3;
    ll sum =0;
    for(int i=1; i<=max_c;i++){
        sum += N - (pow(1000,i) -1);
    }
    cout<< sum << endl;
}