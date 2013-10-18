#pragma strict

var raven : GameObject;
var gate1 : GameObject;
var lever : GameObject;
var isClosed : boolean;
var inCollider : boolean = false;
var yposopen : float;
var yposclosed : float;
var initposition: Vector3;


function Start () {
	raven = GameObject.Find("raven");
	isClosed = true;
	gate1 = GameObject.Find("Gate1");
	yposopen = gate1.transform.position.y-20;
	yposclosed = gate1.transform.position.y;
	initposition = gate1.transform.position;
	
	
	lever = GameObject.Find("lever1");

}

function Update () {
	var other : gate1s = gate1.GetComponent("gate1s");
	if(Input.GetKey(KeyCode.E) && inCollider && Input.inputString != ""){
		other.toggleGate();
		print(gate1.transform.position);
		Debug.Log(Input.inputString);
		//gate1isClosed = false;
		lever.animation.Play("switchLeft_001");
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

	
