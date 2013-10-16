#pragma strict
import System.IO;

var start : GUIStyle;
var continueGame : GUIStyle;
var profile : GUIStyle;
var exit : GUIStyle;


var animState = "idle";
private var upTime = 0;
var modulus = 0;

private var menu_state = 0;
private var menu_target = 0;

var global : GameManager;

function Start () {
	global = gameObject.GetComponent(GameManager);
	global.Load();
	RavenCache.level = global.level;
	menu_state = 1;
}

function Update () {

	menu_target += (-menu_target + (menu_state - 1)*(Screen.width - 305))* 0.1;
	
	if(Input.GetKey(KeyCode.KeypadEnter) ||Input.GetKey(KeyCode.Space)){	
		RavenCache.checkpoint = "";
		switch(menu_state){
			case 1:
				
				File.Delete("save.raven");
				RavenCache.level = 0;
				Application.LoadLevel ("tutlevel");
				//new game	
			break;
			case 0:
				if(global.loaded){
					Application.LoadLevel ("worldMap");
				}else{
					// walang save file
				}
				//continue	
			break;
			case -1:
				//profile			
			break;
			case -2:
				//exit
				Application.Quit();	
			break;
		}
	}
	
	if(upTime > modulus){
		upTime = 0;
	}else{
		upTime ++;
		return;
	}
	
	if(Input.GetKey(KeyCode.LeftArrow) || Input.GetKey(KeyCode.A)){
		if(menu_state != 1) {
			animState = "left";
			animation.Stop();
			if(menu_state <= 0)
			menu_state ++;
		}
	}
		
	if(Input.GetKey(KeyCode.RightArrow) || Input.GetKey(KeyCode.D)){
		if(menu_state != -2) {
			animState = "right";
			animation.Stop();
			if(menu_state >= -1)
			menu_state --;		
		}

	}
	if(animState != '')
	animation.Play(animState);
	animState = '';
	
	Debug.Log(menu_state);
}

function OnGUI() {
	/*
	GUI.Box (Rect (150 + 10 + menu_target,Screen.height/2 + 200,305,66), "", start);	
	GUI.Box (Rect (150 + 325 + menu_target,Screen.height/2 + 200,305,66), "", continueGame);
	GUI.Box (Rect (150 + 640 + menu_target,Screen.height/2 + 200,305,66), "", profile);
	GUI.Box (Rect (150 + 955 + menu_target,Screen.height/2 + 200,305,66), "", exit);
	*/
	
	GUI.Box (Rect (((Screen.width - 305)/2) + menu_target,Screen.height/2 + 200,305,66), "", start);	
	GUI.Box (Rect (((Screen.width - 305)/2) + menu_target + (Screen.width - 305),Screen.height/2 + 200,305,66), "", continueGame);
	GUI.Box (Rect (((Screen.width - 305)/2) + menu_target + ((Screen.width - 305) * 2),Screen.height/2 + 200,305,66), "", profile);
	GUI.Box (Rect (((Screen.width - 305)/2) + menu_target + ((Screen.width - 305) * 3),Screen.height/2 + 200,305,66), "", exit);
	
}