#pragma strict
var ravenPortrait : GUIStyle;
var cheetahPortrait: GUIStyle;
var dialogueStyle : GUIStyle;
var heartNotifCheetah : GUIStyle;
var heartNotifFrog : GUIStyle;
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
	
	if(dialogue != 0  && dialogue < 4)GUI.Box(Rect(0,Screen.height-183,133,183),"",ravenPortrait);
	if(dialogue == 1)GUI.Box(Rect(153,Screen.height-120,800,150),"This lift would get me up there.",dialogueStyle);
	else if(dialogue == 2)GUI.Box(Rect(153,Screen.height-120,400,180),"There are enemies around, I better stay clear.",dialogueStyle);
	else if(dialogue == 3)GUI.Box(Rect(153,Screen.height-120,400,180),"I need to jump on the tree. It should help me get up there.",dialogueStyle);
	/*else if(dialogue == 4)GUI.Box(Rect(0,0,Screen.width,Screen.height),"",heartNotifCheetah);
	else if(dialogue == 5)GUI.Box(Rect(0,0,Screen.width,Screen.height),"",heartNotifFrog);*/
	else if(dialogue == 9){
		GUI.Box(Rect(0,0,Screen.width,Screen.height),"",heartNotifFrog);
		Debug.Log("END GAME");
	}
	
		if (cutscene == 1 && heart == 1){
		if(diag%2 == 0 && diag != 13){
			GUI.Box(Rect(0,Screen.height-183,183,183),"",cheetahPortrait);
			
		} else if (diag%2 == 1 && diag !=13 ){
			GUI.Box(Rect(0,Screen.height-183,183,183),"",ravenPortrait);
		
		}
		if (diag==2){
			//GUI.Box(Rect(0,Screen.height-183,183,183),"",cheetahPortrait);
			GUI.Box(Rect(180,Screen.height-120,800,150),"Oi. You there! Where do you think you're going?",dialogueStyle);
		}
		if (diag==3){
			//GUI.Box(Rect(0,Screen.height-183,183,183),"",ravenPortrait);
			GUI.Box(Rect(180,Screen.height-120,800,150),"... I just need to get through.",dialogueStyle);
		}
		if (diag==4){
			//GUI.Box(Rect(0,Screen.height-183,183,183),"",cheetahPortrait);
			GUI.Box(Rect(180,Screen.height-120,800,150),"Why? I need to know before you pass.",dialogueStyle);
		}
		if (diag==5){
			//GUI.Box(Rect(0,Screen.height-183,183,183),"",ravenPortrait);
			GUI.Box(Rect(180,Screen.height-120,800,150),"I have been having dreams. I need to get through",dialogueStyle);
		}
		if (diag==6){
			GUI.Box(Rect(180,Screen.height-120,800,150),"Wait. Aren't you a heartless?",dialogueStyle);
		}	
		if (diag==7){
			GUI.Box(Rect(180,Screen.height-120,800,150),"Y-e-a-h...",dialogueStyle);
		}
		if (diag==8){
			GUI.Box(Rect(180,Screen.height-120,800,150),"You’re the one! You’re that boy from the prophecy!",dialogueStyle);
		}
		if (diag==9){
			GUI.Box(Rect(180,Screen.height-120,800,150),"What are you saying?",dialogueStyle);
		}
		if (diag==10){
			GUI.Box(Rect(180,Screen.height-120,800,150),"You need to listen to me. Can you see the world? Get my heart and save the world",dialogueStyle);
		}
		if (diag==11){
			GUI.Box(Rect(180,Screen.height-120,800,150),"What? I can't do that.",dialogueStyle);
		}
		if (diag==12){
			GUI.Box(Rect(180,Screen.height-120,800,150),"Just go! I am one of the fated guardians. Get my heart boy!",dialogueStyle);
		}
		if (diag==13){
			GUI.Box(Rect(0,0,Screen.width,Screen.height),"",heartNotifCheetah);
		}
	}
	
	if(cutscene == 1 && heart == 2)GUI.Box(Rect(0,0,Screen.width,Screen.height),"",heartNotifFrog);

}

function OnTriggerEnter (other : Collider){
	if(other.gameObject.name == 'd4' || other.gameObject.name == 'd5'){
		dialogue = int.Parse(other.gameObject.name.Substring(1));
	}
}

function OnTriggerExit (other : Collider){
	if(other.gameObject.name == 'd4' || other.gameObject.name == 'd5'){
		if(int.Parse(other.gameObject.name.Substring(1)) < 4){
			dialogue = 0;
		}
	}
}

function Update () {

	if(Input.anyKeyDown && !Input.GetKeyDown(KeyCode.E)){
		//heart = 0;
	}
	if(Input.GetKey(KeyCode.E) && dialogue == 4){
		cutscene = 1;
		heart = 1;
	}
	if(Input.GetKey(KeyCode.E) && dialogue == 5){
		cutscene = 1;
		heart = 2;
	}
	
if (cutscene == 1 && heart == 1) {
	
		if (Input.anyKeyDown) diag += 1;
		if (diag>13	){
			heart=0;
			cutscene = 0;
			diag=1;
			Destroy(GameObject.Find("Cheetah"));
			Destroy(GameObject.Find("d4"));
		}
		return;
	
	}
	
	if (cutscene == 1  && heart == 2) {
	
		if (Input.anyKeyDown) diag +=1;
		if (diag==13){
			heart = 0;
			cutscene = 0;
			diag = 1;
			dialogue = 0;

		}
		return;
	
	}
	
    transform.position = raven.transform.position;
}
