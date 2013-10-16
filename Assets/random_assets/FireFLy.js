#pragma strict

var scalex : float;
var scaley : float;
var scalez : float;
var speed : float;

private var initx : float;
private var initz : float;
private var inity : float;

private var offsetx : float;
private var offsety : float;
private var offsetz : float;

function Start () {
	initx = transform.position.x;
	inity = transform.position.y;
	initz = transform.position.z;
	
	offsetx = Random.value;
	offsety = Random.value;
	offsetz = Random.value;
}

function Update () {
	transform.position.x = initx + scalex * Mathf.Cos(Time.timeSinceLevelLoad*speed/3 + offsetx*5);
	transform.position.y = inity + scaley * Mathf.Sin(Time.timeSinceLevelLoad*speed/3 + offsety*5);
	transform.position.z = initz + scalez * Mathf.Sin(Time.timeSinceLevelLoad*speed/3 + offsetz*5);
}