#pragma strict

var raven : GameObject;
var parent : GameObject;

function Start () {

	raven = GameObject.Find("raven");
	parent.rigidbody.useGravity = false;
	
}

function Update () {
}
/*
function OnCollisionEnter(col : Collision) {

	if (col.gameObject.name == "raven"){
		parent.rigidbody.useGravity = true;
	}
	
}
*/
function OnTriggerEnter(col : Collider) {

	if (col.gameObject.name == "raven"){
		parent.rigidbody.useGravity = true;
	}
	
}