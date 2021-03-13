#include <bits/stdc++.h>
using namespace std;
using ll = int64_t;

int main(){
    double A,B,W;
    cin >> A >> B >> W;
    W *= 1000;
    double min_double,max_double;
    max_double = W / A;
    min_double = W / B;
    int min_int,max_int;
    min_int = ceil(min_double);
    max_int = (int)max_double;
    if(min_int > max_int){
        cout << "UNSATISFIABLE"<<endl;
    }else{
        cout << min_int << " " << max_int << endl;
    }
}