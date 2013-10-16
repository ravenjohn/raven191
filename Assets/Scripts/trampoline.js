#pragma strict

var raven : GameObject;
var strenght : int;

function Start () {
	
	raven = GameObject.Find("raven");
	//strenght = 3600; // strenght of trampoline

}

function Update () {

}

function OnCollisionEnter(collision : Collision) {

	if (collision.gameObject.name == "raven"){
		
		raven.rigidbody.AddForce(Vector3.up * strenght);
		
	}
	
}

/*
function OnCollisionExit(collision : Collision) {
	
	if (collision.gameObject.name == raven){
		Debug.Log("Exit!");
		collision = null;
	}
	
}
*/