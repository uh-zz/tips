package main

// MapStatus マップ状態の構造体
// 「元に戻す」機能の実装を合成関数で行う
// 倉庫番ゲームを用いて説明
type MapStatus struct {
	pX, pY int // プレイヤー座標
	bX, bY int // 荷物座標
	mX, mY int // マーク座標

}

// MoveFunc func(*MapStatus)型
type MoveFunc func(*MapStatus)

// Union 空レシーバ
func (m MoveFunc) Union() {}

// Command 抽象コマンド
type Command interface {
	Union()
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

// move プレイヤーの移動
func (m *MapStatus) move(x, y int) {

	m.pX += x
	m.pY += y

	if m.pX == m.bX && m.pY == m.bY {
		m.bX += x
		m.bY += y
	}
}

// Right 右へ進む
func Right(m *MapStatus) {
	m.move(1, 0)
}

// Down 下へ進む
func Down(m *MapStatus) {
	m.move(0, 1)
}
