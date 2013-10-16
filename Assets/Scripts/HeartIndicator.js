//code for 2 hearts

var mainContainer : GUIStyle;
var top : GUIStyle;
var right : GUIStyle;
var left : GUIStyle;
var bottom : GUIStyle;
var idle : GUIStyle;
var locked : GUIStyle;
var activeFrog : GUIStyle;
var activeCheetah : GUIStyle;
var activeEagle : GUIStyle;
var heartFrog : GUIStyle;
var heartCheetah : GUIStyle;
var heartEagle : GUIStyle;
var global : GameManager;

function Start () {
	top = locked;
	//right = locked;
	right = idle;
	left = idle;
	bottom = idle;
	if(GameObject.Find("raven"))global = GameObject.Find("raven").GetComponent(GameManager);
	else global = GameObject.Find("raven-02").GetComponent(GameManager);
}

function Update () {
	if(Input.GetKey(KeyCode.LeftArrow) && global.canDoubleJump) {
		bottom = idle;
		right = idle;
		left = activeFrog;
	}
	else if(Input.GetKey(KeyCode.DownArrow) && global.canDash) {
		left = idle;
		right = idle;
		bottom = activeCheetah;
	}
	//if(global.canZoom) right = idle;
	else if(Input.GetKey(KeyCode.RightArrow) && global.canZoom) {
		left = idle;
		bottom = idle;
		right = activeEagle;
	}
}


function OnGUI() {

	GUI.BeginGroup (new Rect (Screen.width-168, 10, 158, 157));
		GUI.Box(Rect(17,15,129,126),"", mainContainer);
		GUI.Box(Rect(47,0,64,64),"", top);
		GUI.Box(Rect(94,47,64,64),"", right);
			if(global.canZoom) GUI.Box(Rect(102,65,47,33),"", heartEagle);
		GUI.Box(Rect(0,47,64,64),"", left);
			if(global.canDoubleJump) GUI.Box(Rect(9,62,46,39),"", heartFrog);
		GUI.Box(Rect(47,93,64,64),"", bottom);
			if(global.canDash) GUI.Box(Rect(56,107,47,40),"", heartCheetah);
	GUI.EndGroup();	
	
}