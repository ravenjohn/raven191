#pragma strict

var upperBound : float;
var lowerBound : float;
var force : float;
private var falling : boolean;
function Start () {
	falling = false;
	upperBound = transform.position.y + upperBound;
	lowerBound = transform.position.y + lowerBound;
}

function Update () {
	if(transform.position.y > upperBound){
		falling = true;
	}else{
		if(falling){
			falling = false;
		}
	}
	
	if(!falling){
		rigidbody.AddForce(Vector3.up * force);
	}
	
	Debug.Log(transform.position.y + "||" + rigidbody.position.y);
	
	
}