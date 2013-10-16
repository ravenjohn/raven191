#pragma strict

private var speed = 1;
private var rotate = false;

function Start () {
	renderer.material.color.a = 0;
}

function OnTriggerEnter(object : Collider){
	renderer.material.color.a = 1;
	rotate = true;
}

//function startTransition() {
//	Debug.Log("startTransition");
//	renderer.material.color.a = 1;
//	rotate = true;
//
//}

function Update () {
	if(rotate && transform.localScale.x < 70){
		transform.eulerAngles.z+= 2 + (speed++ * 0.1);
		if(transform.position.z > -8)
			transform.position.z -= 0.02;
		transform.localScale.x += 0.5;
		transform.localScale.y += 0.5;
	}
}