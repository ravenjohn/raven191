#pragma strict

var fade : boolean = false;
var alpha : float;
var parent : GameObject;
function Start () {
	renderer.material.SetFloat("_Alpha", alpha);
}

function Update () {
	renderer.material.SetFloat("_Alpha", alpha);
	
	if(fade && alpha <=0.5){
		alpha +=0.05;
	}else{
		if(alpha>0)
		alpha -=0.05;
	}
}

function OnTriggerEnter (other : Collider) {
	if(other.gameObject.name == "raven-02"){
		fade = true;
	}
}

function OnTriggerExit (other : Collider) {
	if(other.gameObject.name == "raven-02"){
		fade = false;
	}
}