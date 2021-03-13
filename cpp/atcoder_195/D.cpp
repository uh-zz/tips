#include <bits/stdc++.h>
using namespace std;
using ll = int64_t;

int main(){
    int N , M ,Q;
    scanf("%d%d%d",&N,&M,&Q);
    // firstがvalue,secondがweight
    vector<pair<int,int>>  B(N);
    for(int i=0;i<N;i++){
        scanf("%d%d",&B.at(i).second,&B.at(i).first);
    }
    vector<int> P(M);
    for(int i =0;i<M;i++){
        cin >> P.at(i);
    }
    for(int i=0;i<Q;i++){
        int L,R;
        scanf("%d%d",&L,&R);
        sort(B.begin(),B.end());
        reverse(B.begin(),B.end());
        vector<int> able_P(0);
        for(int j=0;j<M;j++){
            if((j<L-1) || (j>R-1)){
                able_P.push_back(P.at(j));
            }
        }
        sort(able_P.begin(),able_P.end());
        int score = 0;
        for(pair<int,int> x:B){
            for(int j=0;j<able_P.size();j++){
                if(x.second <= able_P.at(j)){
                    score += x.first;
                    able_P.erase(able_P.begin()+j);
                    break;
                }
            }
        }
        cout << score <<endl;
    }
}