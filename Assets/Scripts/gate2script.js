#pragma strict

#pragma strict

var raven : GameObject;
var gate1 : GameObject;
var gate2 : GameObject;
var isClosed : boolean;
var inCollider : boolean = false;
var yposopen : float;
var yposclosed : float;
var initposition: Vector3;


function Start () {
	raven = GameObject.Find("raven");
	isClosed = true;
	yposopen = gate1.transform.position.y-20;
	yposclosed = gate1.transform.position.y;
	initposition = gate1.transform.position;

}

function Update () {
	var other : gate2s = gate1.GetComponent("gate2s");
	var other2 : gate2s = gate2.GetComponent("gate2s");
	if(Input.GetKey(KeyCode.E) && inCollider && Input.inputString != ""){
		other.toggleGate();
		other2.toggleGate();
	}
}


function OnCollisionEnter(collision : Collision) {

	if (collision.gameObject.name == "raven"){
		
		inCollider = true;
		//print(inCollider);
	}
	
}

function OnCollisionExit(collision : Collision) {

	if (collision.gameObject.name == "raven"){
		
		inCollider = false;
		//print(inCollider);
	}
	
}



	
