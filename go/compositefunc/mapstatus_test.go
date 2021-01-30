package main

import (
	"reflect"
	"testing"
)

func TestNewMapStatus(t *testing.T) {
	s := &MapStatus{
		pX: 1,
		pY: 0,
		bX: 3,
		bY: 1,
		mX: 5,
		mY: 1,
	}

	c := NewMapStatus()

	if !reflect.DeepEqual(s, c) {
		t.Fatal("NewMapStatus() should be fix")
	}
}

func TestClone(t *testing.T) {

	s := &MapStatus{
		pX: 1,
		pY: 0,
		bX: 3,
		bY: 1,
		mX: 5,
		mY: 1,
	}

	c := s.clone()

	if !reflect.DeepEqual(s, c) {
		t.Fatal("clone() should be fix")
	}
}

func TestRight(t *testing.T) {
	s := &MapStatus{
		pX: 1,
		pY: 0,
		bX: 3,
		bY: 1,
		mX: 5,
		mY: 1,
	}

	rs := Right(*s)

	expected := 2

	if rs.pX != expected {
		t.Fatalf("Right() is pX + 1,  want %d, got %d", expected, rs.pX)
	}
}

func TestDown(t *testing.T) {
	s := &MapStatus{
		pX: 1,
		pY: 0,
		bX: 3,
		bY: 1,
		mX: 5,
		mY: 1,
	}

	ds := Down(*s)

	expected := 1

	if ds.pY != expected {
		t.Fatalf("Down() is pY + 1,  want %d, got %d", expected, ds.pY)
	}
}

func TestCollision(t *testing.T) {
	s := &MapStatus{
		pX: 1,
		pY: 0,
		bX: 2,
		bY: 1,
		mX: 5,
		mY: 1,
	}

	rs := Right(*s)
	ds := Down(*rs)

	if s.pY == ds.bY {
		t.Fatal("OMG, The player and baggage collided!!")
	}
}
