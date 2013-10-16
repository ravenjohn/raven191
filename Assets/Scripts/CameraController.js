#pragma strict

var Target : Transform;
var distance:float = -15.0f;

function Start(){
	transform.position.z = distance;
	transform.position.y = 10;
}

function Update () {
    transform.position.x += 0.1 * -(transform.position.x - Target.position.x);
	transform.position.y += 0.1 * -(transform.position.y - Target.position.y - 3);
	transform.LookAt(Target.transform);
	
	if(Time.timeScale == 0){
		audio.volume = 0.1;
		
	}else{
		audio.volume = 1.0;
	}
	
}