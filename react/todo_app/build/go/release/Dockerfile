FROM golang:latest
RUN mkdir /go/src/work

WORKDIR /go/src/work

ADD . /go/src/work
EXPOSE 8080

CMD cd ./cmd \
&& go mod download  \
&& go install ./  \
&& /go/bin/cmd