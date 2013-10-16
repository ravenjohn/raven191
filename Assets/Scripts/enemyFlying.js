#pragma strict

var bounds : int;
var counter : int;
var goLeft : boolean;
var raven : GameObject;
var moveScript : Move;
var delay : int;
var stunDuration : int;
var strenght : int;
var speed : int;

function Start () {
	//Debug.Log();
	counter = 0;
	//bounds = 600;
	//speed = 10;
	//goLeft = false;
	delay = 0;
	stunDuration = 20;
	raven = GameObject.Find("raven");
	moveScript = raven.gameObject.GetComponent(Move);
}

function Update () {

	if(delay == 0){
		counter += speed;
		if(counter > bounds && goLeft) {
			goLeft = false;
			counter = 0;
		}
			else if(counter > bounds && !goLeft) {
				goLeft = true;
				counter = 0;
			}
		if(goLeft)this.transform.Translate(Vector3.left * Time.deltaTime * speed);
		else this.transform.Translate (Vector3.right * Time.deltaTime * speed);
	}
	if(delay !=0)delay--;
	
}

function OnCollisionEnter(collision : Collision) {

	
	if (collision.gameObject.name == "raven"){
		if(collision.gameObject.transform.position.y > this.gameObject.transform.position.y) {
			delay = stunDuration;
			collision.gameObject.rigidbody.AddForce(Vector3.up * strenght);
		}
		else {
			//insert kill raven
			moveScript.die();
			
		}
		
	}
	
}