#pragma strict
var gate1 : GameObject;
var gate1isClosed: boolean;
var dialogue : int;
var heartObtained : int;
dialogue = 0;
var raven : Transform;
var heart : int = 0;
var cutscene = 0;
var diag = 1;


function OnStart() {
	
}

function OnGUI() {
	
}

function OnTriggerEnter (other : Collider){

	if(int.Parse(other.gameObject.name.Substring(1))){
		dialogue = int.Parse(other.gameObject.name.Substring(1));
	}
	Debug.Log(dialogue);	
}

function OnTriggerExit (other : Collider){
	if(int.Parse(other.gameObject.name.Substring(1))){
		if(int.Parse(other.gameObject.name.Substring(1)) < 4){
		//dialogue = 0;
	}
	}
}

function Update () {

	if(Input.anyKeyDown && !Input.GetKeyDown(KeyCode.E)){
		//heart = 0;
	}
	if(Input.GetKey(KeyCode.E) && dialogue == 1 && gate1isClosed){
		
		gate1.transform.position = Vector3.Lerp(gate1.transform.position, Vector3(gate1.transform.position.x, -3, 0), Time.deltaTime/40);
		print(gate1.transform.position);
		//gate1isClosed = false;
		
	}
	if(Input.GetKey(KeyCode.E) && dialogue == 5){
		cutscene = 1;
		heart = 2;
	}
	
    transform.position = raven.transform.position;
}
