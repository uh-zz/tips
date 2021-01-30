package main

// MapStatus マップ状態の構造体
// 「元に戻す」機能の実装を合成関数で行う
// 倉庫番ゲームを用いて説明
type MapStatus struct {
	pX, pY int // プレイヤー座標
	bX, bY int // 荷物座標
	mX, mY int // マーク座標

}

// NewMapStatus 初期座標を設定
func NewMapStatus() *MapStatus {
	m := new(MapStatus)

	// プレイヤー座標
	m.pX = 1
	m.pY = 0
	// 荷物座標
	m.bX = 3
	m.bY = 1
	// マーク座標
	m.mX = 5
	m.mY = 1

	return m
}

// clone コピーの作成
func (m *MapStatus) clone() *MapStatus {
	copy := *m
	return &copy
}

// move プレイヤーの移動
func (m *MapStatus) move(x, y int) {

	m.pX += x
	m.pY += y

	if m.pX == m.bX && m.pY == m.bY {
		m.bX += x
		m.bY += y
	}
}

type MoveParam func(MapStatus) *MapStatus

func (m MoveParam) Union() string { return "hoge" }

type Command interface {
	Union() string
}

// Right 右へ進む
func Right(m MapStatus) *MapStatus {
	m.move(1, 0)
	return &m
}

// Down 下へ進む
func Down(m MapStatus) *MapStatus {
	m.move(0, 1)
	return &m
}
