#pragma strict

var global : GameManager;

function Start () {
	global = GameObject.Find("raven").gameObject.GetComponent(GameManager);
}

function Update () {

}

function OnTriggerEnter(collision : Collider) {
	if(!global.canZoom){
		if (collision.gameObject.name == "raven"){
			global.canZoom = true;
			global.Save();
			global.enableZoom();
		}
	}
}