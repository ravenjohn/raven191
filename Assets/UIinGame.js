
var pauseMenu : GUIStyle;
var menuButton : GUIStyle;
var menuResume : GUIStyle;
var menuRestart : GUIStyle;
var worldMap : GUIStyle;
var exit : GUIStyle;
var pauseBG : GUIStyle;
var isPaused;
var ifEndOfLevel : boolean;
var global : GameManager;
var moveScript : Move;

function Start () {
	isPaused = false;
	ifEndOfLevel = false;
	//global = GameObject.Find("raven").GetComponent(GameManager);
	if(GameObject.Find("raven")){
		moveScript = GameObject.Find("raven").GetComponent(Move);
		global = GameObject.Find("raven").GetComponent(GameManager);
	}
	else {
		moveScript = GameObject.Find("raven-02").GetComponent(Move);
		global = GameObject.Find("raven-02").GetComponent(GameManager);
	}
	
}

function Update () {

}

function resumeGame(){
	var allObjects	= GameObject.FindGameObjectsWithTag('cloth');
	Time.timeScale	= 1;
	global.paused	= false;
	
	for(var thisObject in allObjects){
		thisObject.GetComponent(InteractiveCloth).enabled = true;
	}	
}

function OnGUI() {
	//if(isPaused){
	if(global.paused){
		GUI.Box(Rect(0,0,Screen.width,Screen.height),"", pauseBG);
		GUI.Box(Rect((Screen.width-524)/2,(Screen.height-506)/2,524,506),"", pauseMenu);
		if (GUI.Button (Rect (((Screen.width-524)/2)+100,((Screen.height-506)/2)+118,315,66), "", menuResume)) {
			//insert change scene method call
			//resume game
			isPaused = false;
			resumeGame();
		}
		if (GUI.Button (Rect (((Screen.width-524)/2)+100,((Screen.height-506)/2)+192,315,66), "", menuRestart)) {
			//insert change scene method call
			//restart
			isPaused = false;
			resumeGame();
			moveScript.die();
		}
		if (GUI.Button (Rect (((Screen.width-524)/2)+100,((Screen.height-506)/2)+266,315,66), "", worldMap)) {
			//insert change scene method call
			isPaused = false;
			resumeGame();
			Application.LoadLevel ("worldMap");
		}
		if (GUI.Button (Rect (((Screen.width-524)/2)+100,((Screen.height-506)/2)+340,315,66), "", exit)) {
			//insert change scene method call
			//restart
			isPaused = false;
			resumeGame();
			Application.LoadLevel ("main_menu_raven");
		}
	
	}
	
	if(ifEndOfLevel) {
		
	
	}
	
}

