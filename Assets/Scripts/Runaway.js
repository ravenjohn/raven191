#pragma strict

var speed : float = 0.5;
var seen: boolean = false;

function Start () {
}

function Update () {
	transform.position.x += speed;
}