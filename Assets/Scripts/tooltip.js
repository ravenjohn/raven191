#pragma strict

var parent : GameObject;	//use inspector to link gameObject
var hadCollided : boolean;
var isSwitch: boolean;
var delay : int;
var cooldown : int;

function Start () {
	gameObject.renderer.enabled = false;
	hadCollided = false;
	delay = 20;
	cooldown = 0;
	if(isSwitch) parent.renderer.material.color = Color.gray;
}

function Update () {
	
	if(isSwitch)
	if(Input.GetKey(KeyCode.E) && hadCollided && cooldown == 0){
		if(parent.renderer.material.color != Color.green) parent.renderer.material.color = Color.green;
		else parent.renderer.material.color = Color.gray;
		cooldown = delay;
	}
	
	if(cooldown > 0)cooldown--;
	
}



function OnTriggerEnter(collision : Collider) {

	if (collision.gameObject.name == "raven"){
	
		this.renderer.enabled = true;
		hadCollided = true;
	
	}
	
}

function OnTriggerExit(collision : Collider) {

	if (collision.gameObject.name == "raven"){
		
		this.renderer.enabled = false;
		hadCollided = false;
		
	}
	
}