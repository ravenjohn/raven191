#pragma strict
//var transObject : GameObject;
//var transScript : RotatePlane;
var global : GameManager;


function Start () {
	//global = GameObject.Find("raven").GetComponent(GameManager);
	if(GameObject.Find("raven"))global = GameObject.Find("raven").GetComponent(GameManager);
	else global = GameObject.Find("raven-02").GetComponent(GameManager);
	//transObject = GameObject.Find("portalBounds");
	//transScript = transObject.GetComponent(RotatePlane);
}

function Update () {

}

function OnTriggerEnter(raven : Collider) {
	global.level = 1;
	global.Save();
	//transScript.startTransition();
	Application.LoadLevel ("worldMap");
}