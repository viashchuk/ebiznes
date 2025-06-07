FROM golang:1.24

WORKDIR /go-app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build server.go

EXPOSE 1323

CMD [ "go", "run", "server.go" ]