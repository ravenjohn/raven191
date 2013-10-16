var map : GUIStyle;
var level1 : GUIStyle;
var level2 : GUIStyle;

var global : GameManager;


function Start () {
	global = gameObject.GetComponent(GameManager);
	global.Load();
	RavenCache.checkpoint = "";
}

function Update () {

}



function OnGUI () {
	GUI.Box(Rect(0,0,Screen.width,Screen.height),"", map);
	
	if (GUI.Button (Rect (0,275,280,280), "", level1)) {
		RavenCache.level = 0;
		Application.LoadLevel ("tutlevel");
	}
	
	if (global.level >= 1 && GUI.Button (Rect (785,220,366,366), "", level2)) {
		RavenCache.level = 1;
		Application.LoadLevel ("level2");
	}
	
}