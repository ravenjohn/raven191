#pragma strict

var raven : GameObject;
var startDestroy : boolean;
var lifeTime : int;

function Start () {

	raven = GameObject.Find("raven");
	startDestroy = false;
	lifeTime = 100;

}

function Update () {

	if(startDestroy && lifeTime > 0) lifeTime -= 1;
	else if(lifeTime <= 0) Destroy(this.gameObject);

}

function OnCollisionEnter(collision : Collision) {

	if (collision.gameObject.name == "raven"){
	
		startDestroy = true;
		
	}
	
}