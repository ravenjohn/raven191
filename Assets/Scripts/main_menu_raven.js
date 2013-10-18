#pragma strict
import System.IO;

var start : GUIStyle;
var continueGame : GUIStyle;
var profile : GUIStyle;
var exit : GUIStyle;

var showProfileMenu : boolean;
var profileMenuContainer : GUIStyle;
var profileMenuCancel : GUIStyle;
var profileMenuNew : GUIStyle;
var profileMenuDone : GUIStyle;
var showNewProfileMenu : boolean;
var newProfileMenuContainer : GUIStyle;
var newProfileMenuTitle : GUIStyle;
var newProfileMenuField : GUIStyle;
var newProfileName : String;
var scrollPosition : Vector2 = Vector2.zero;
var newProfileSelect : GUIStyle;

var usernames = new Array();

var animState = "idle";
private var upTime = 0;
var modulus = 0;

private var menu_state = 0;
private var menu_target = 0;

var global : GameManager;

function Start () {
	global = gameObject.GetComponent(GameManager);
	global.Load();
	menu_state = 1;
	
	newProfileName = "";
}

function openProfileMenu () {
    var info = new DirectoryInfo("save");
    var fileInfo = info.GetFiles();
    //usernames = info.GetFiles();
    
    if(usernames.length == 0){
    
	    for (file in fileInfo){
	    	usernames.Push(file.Name);
		}
    
    }
    
	
	//usernames = fileInfo;

	showNewProfileMenu = false;
	showProfileMenu = true;
	
}

function Update () {

	menu_target += (-menu_target + (menu_state - 1)*(Screen.width - 305))* 0.1;
	
	if(Input.GetKey(KeyCode.KeypadEnter) ||Input.GetKey(KeyCode.Space)){
		switch(menu_state){
			case 1:
				
				File.Delete(global.username + ".raven");
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
				openProfileMenu();
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
	
	if(!showProfileMenu){
	
		GUI.Box (Rect (((Screen.width - 305)/2) + menu_target,Screen.height/2 + 200,305,66), "", start);	
		GUI.Box (Rect (((Screen.width - 305)/2) + menu_target + (Screen.width - 305),Screen.height/2 + 200,305,66), "", continueGame);
		GUI.Box (Rect (((Screen.width - 305)/2) + menu_target + ((Screen.width - 305) * 2),Screen.height/2 + 200,305,66), "", profile);
		GUI.Box (Rect (((Screen.width - 305)/2) + menu_target + ((Screen.width - 305) * 3),Screen.height/2 + 200,305,66), "", exit);
	
	}
	
	else if(showProfileMenu && !showNewProfileMenu) {
	
		GUI.Box (Rect ((Screen.width - 974)/2,30,974,647), "", profileMenuContainer);
		
			
		
				scrollPosition = GUI.BeginScrollView (Rect (((Screen.width - 974)/2) + 145,175,690,260),
				scrollPosition, Rect (0, 0, 665, (usernames.length * 100))); //380 = y position + height of last item
				
					var temp;
					var i = 0;
					for(i = 0; i < usernames.length; i++){
						temp = usernames[i].ToString().Replace(".raven","");
						if (GUI.Button(Rect(0,(i*100),663,80),"" + temp,newProfileSelect)) {
							global.username = "" + temp;
							global.Load();
							if(global.loaded){
								Application.LoadLevel ("worldMap");
							}else{
								// walang save file
							}
						}
					}
					
					/*
					if (GUI.Button(Rect(0,0,663,80),"Pofile Name",newProfileSelect)) { 
						//Profile Name = string
						//insert load profile method call
					}
					if (GUI.Button(Rect(0,100,663,80),"Pofile Name",newProfileSelect)) { }
					if (GUI.Button(Rect(0,200,663,80),"Pofile Name",newProfileSelect)) { }
					if (GUI.Button(Rect(0,300,663,80),"Pofile Name",newProfileSelect)) { }
					*/
				
				// End the scroll view that we began above.
				GUI.EndScrollView ();
			
			
		
		if (GUI.Button(Rect(((Screen.width - 974)/2) + 180,475,190,66),"",profileMenuCancel)) {
			showProfileMenu = false;
		}
		if (GUI.Button(Rect(((Screen.width - 974)/2) + 180 + 210,475,190,66),"",profileMenuNew)) {
			showNewProfileMenu = true;
		}
		if (GUI.Button(Rect(((Screen.width - 974)/2) + 180 + 420,475,190,66),"",profileMenuDone)) { }
		
	}
	
	else if (showNewProfileMenu) {
	
			GUI.Box (Rect ((Screen.width - 646)/2,120,646,416), "", newProfileMenuContainer);
			GUI.Label (Rect (((Screen.width - 646)/2) + 110, 220, 400, 80), "Enter Profile Name", newProfileMenuTitle);
			
			newProfileName = GUI.TextField (Rect (((Screen.width - 646)/2) + 110, 272, 404, 73), newProfileName, 15, newProfileMenuField);
			
			if (GUI.Button(Rect(((Screen.width - 646)/2) + 110, 360, 190, 66),"",profileMenuCancel)) {
				openProfileMenu();
			}
			if (GUI.Button(Rect(((Screen.width - 646)/2) + 320, 360, 190, 66),"",profileMenuDone)) { 
				//insert create new profile method call
				//newProfileName string
				RavenCache.username = newProfileName;
				Application.LoadLevel ("tutlevel");
				//openProfileMenu();
			}
			
	}
	
} // end of OnGUI