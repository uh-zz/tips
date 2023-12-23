## 概要

DDD を始めるときに、序盤で、DI の設定がもろもろめんどくさい場合があります。

wire をつかうことで、導入を簡単化するだけでなく、変更容易性を保った開発ができるようになります。

https://github.com/google/wire

### 1. registry を作成

```go
package adapter

import "usecase"

type Registry struct {
	usecase.Usecase
}

func NewRegistry(
	usecase usecase.Usecase,
) *Registry {
	return &Registry{
		Usecase: usecase,
	}
}
```

### 2. wire をインストール

```
go install github.com/google/wire/cmd/wire@latest
```

### 3. injector.go を用意する

```go
//go:build wireinject

package main

import (
	"adapter"
	"adapter/client"
	"adapter/domain/repository"
	"adapter/domain/service"
	"usecase"
	"github.com/google/wire"
)

func initialize() *adapter.Registry {
	wire.Build(
		adapter.NewRegistry,

		usecase.NewUsecase,

		repository.NewRepository,

		service.NewService,

		client.NewClient,
	)
	return &adapter.Registry{}
}
```

### 4. 自動生成実行

```
wire
```
