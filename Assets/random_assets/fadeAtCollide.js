#pragma strict

var fade : boolean = true;
var alpha : float;
var parent : GameObject;
function Start () {
	renderer.material.SetFloat("_Alpha", alpha);
}

function Update () {
	renderer.material.SetFloat("_Alpha", alpha);
	
	if(fade && alpha <=1){
		alpha +=0.15;
	}else{
		if(alpha>0)
		alpha -=0.15;
	}
	
	if(Input.GetKey(KeyCode.E) && fade){
		Destroy(parent.gameObject);
		Destroy(this.gameObject);
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