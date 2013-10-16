var start : GUIStyle;
var continueGame : GUIStyle;
var profile : GUIStyle;
var exit : GUIStyle;
var logo : GUIStyle;
var background : GUIStyle;
var global : GameManager;

function Start () {
	global = GetComponent(GameManager);
}

function Update () {

}

function OnGUI() {

	GUI.Box(Rect(0,0,Screen.width,Screen.height),"", background);
	GUI.Box(Rect((Screen.width-500)/2,(Screen.height-627)/2,500,627),"", logo);
	if (GUI.Button (Rect (10,Screen.height-86,305,66), "", start)) {
		/*
		global.x = -71.74115;
		global.y = 7.87863;
		*/
		Application.LoadLevel ("tutlevel");
		//insert change scene method call
		//resume game
	}
	if (GUI.Button (Rect (325,Screen.height-86,305,66), "", continueGame)) {
		//insert change scene method call
		//if(global.level == 0) Application.LoadLevel ("tutlevel");
		//if(global.level == 1) Application.LoadLevel ("level2");
		
	}
	if (GUI.Button (Rect (640,Screen.height-86,305,66), "", profile)) {
		//insert change scene method call
		//resume game
	}
	if (GUI.Button (Rect (955,Screen.height-86,305,66), "", exit)) {
		//insert change scene method call
		//resume game
		Application.Quit();
	}

}