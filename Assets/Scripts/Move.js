#pragma strict

var particles : UnityEngine.ParticleSystem;
var skin : UnityEngine.Texture;
var terrain : Transform;
var speed : float = 15.0;
var jumpSpeed : float = 600.0;

var pre_jump_sound : AudioClip;
var post_jump_sound : AudioClip;
var walk_sound : AudioClip;

var ravenMaterial : GameObject;
var main_camera : Transform;
var cam_state : String = 'idle';

private var distToGround: float;
private var ladder: boolean = false;
private var ground: boolean = false;
private var targetRotationy: float = 90.0;

private var jumpNumber: int = 0;
private var animState;

var cutscene = 0;
var imageRaven : GUIStyle;
var imageFrog : GUIStyle;
var dialogueStyle : GUIStyle;
var dialogue = 1;
var heldDown = 0;
var heartCD = 200;
var timer = 200;
var sprintCD = false;
var global : GameManager;


function Start(){
	distToGround = collider.bounds.extents.y;
	global = gameObject.GetComponent(GameManager);
	if(RavenCache.username){
		global.username = RavenCache.username;
	}
	global.Load();
	fixPositionAndObstacles();
}

function fixPositionAndObstacles(){
	Debug.Log(RavenCache.level);
	if(RavenCache.checkpoint != ""){
		transform.position.x = RavenCache.x;
		transform.position.y = RavenCache.y;
		transform.position.z = 1.938589e-05;	
		var level = parseInt(RavenCache.checkpoint.Substring(2,1));
		var num = parseInt(RavenCache.checkpoint.Substring(4,1));
		if(level == 0){
			if(num >= 6){
				Destroy(GameObject.Find("Falling Terrain"));
			}
		}
		else if(level == 1){
			if(num >= 2){
				Destroy(GameObject.Find("Gate1"));
				Destroy(GameObject.Find("gateTrigger1"));
			}
			if(num >= 3){
				Destroy(GameObject.Find("Gates"));
			}
			if(num >= 5){
				Destroy(GameObject.Find("Falling Terrain"));
			}
		}
		//destroy earlier checkpoints
		for(var i=1; i<num; i+=1){
			Destroy(GameObject.Find("cp"+level+"_"+i));		
		}
	}
}

function IsGrounded(): boolean {
	return Physics.Raycast(transform.position, -Vector3.up, distToGround + 0.1);
}

function IsLadder(): boolean{
	return ladder ? !IsGrounded() : false;
}

function OnCollisionExit (other : Collision) {
	if(other.gameObject.tag == "ground")
		ground = false;
}

function OnCollisionEnter (other : Collision) {
	var tag = other.gameObject.tag;
	
	var name = other.gameObject.name;

	if(name == "CaveWorm_anim" || name == "Creature2" || name == "enemyGround"){
		die();
	}
	else if(tag == "ground" || tag == "falling"){
		ground = true;
		jumpNumber = 0;
		emit();
	}
	else if(tag == "death"){
		die();
	}
	
	if(tag == "falling"){
		other.gameObject.rigidbody.isKinematic = false;
	}
}

function OnGUI () {
	if(cutscene != 1) return;
	
	//raven avatar
	GUI.Box(Rect(24,15,283,705),"",imageRaven);
	//frog avatar
	GUI.Box(Rect(740,127,518,593),"",imageFrog);

	if(dialogue == 1)GUI.Box(Rect(300,100,400,180),"Welcome.",dialogueStyle);
	else if(dialogue == 2)GUI.Box(Rect(550,200,400,180),"My legs are too weak to jump that ledge.",dialogueStyle);
	else if(dialogue == 3)GUI.Box(Rect(300,100,400,180),"Mine too.",dialogueStyle);
	else if(dialogue == 4)GUI.Box(Rect(550,200,400,180),"??? Well, ain't you an interesting little thing!",dialogueStyle);
	else if(dialogue == 5)GUI.Box(Rect(300,100,400,180),"???",dialogueStyle);
	else if(dialogue == 6)GUI.Box(Rect(550,200,400,180),"You're a... HEARTLESS!!",dialogueStyle);
	else if(dialogue == 7)GUI.Box(Rect(300,100,400,180),"...",dialogueStyle);
	else if(dialogue == 8)GUI.Box(Rect(550,200,400,180),"There had been legends, boy, about people like you. Oh, they've been saying a lot of bad things. But, you haven't eaten my heart yet, eh?",dialogueStyle);
	else if(dialogue == 9)GUI.Box(Rect(300,100,400,180),"Well I... can use hearts as my own.",dialogueStyle);
	else if(dialogue == 10)GUI.Box(Rect(550,200,400,180),"Heart-users! They're real?! They said heart-users gain power depending on the heart they're consuming.",dialogueStyle);
	else if(dialogue == 11)GUI.Box(Rect(300,100,400,180),"Yes...",dialogueStyle);
	else if(dialogue == 12)GUI.Box(Rect(550,200,400,180),"Well take mine boy, and get yourself out of this sprintCD hole.",dialogueStyle);
	else if(dialogue == 13)GUI.Box(Rect(300,100,400,180),"... No.",dialogueStyle);
	else if(dialogue == 14)GUI.Box(Rect(550,200,400,180),"You are young, boy. We can't both die here. Just promise me, you'll do something about the bigger sprintCD hole we call earth. It is time, boy. It is time.",dialogueStyle);
	else if(dialogue == 15)GUI.Box(Rect(300,100,400,180),"... No.",dialogueStyle);
	else if(dialogue == 16)GUI.Box(Rect(550,200,400,180),"Stubborn little sprintCD. Don't you see? You're the only one who can gather the hearts of this world in to one.",dialogueStyle);
	else if(dialogue == 17)GUI.Box(Rect(300,100,400,180),"...",dialogueStyle);
	else if(dialogue == 18)GUI.Box(Rect(550,200,400,180),"You are this world's last hope.",dialogueStyle);
	else if(dialogue == 19)GUI.Box(Rect(300,100,400,180),"...",dialogueStyle);
	else if(dialogue == 20)GUI.Box(Rect(550,200,400,180),"Go and be done with it, boy. KILLL MEEEEEEEEEEEEEEEEEEEEEEEH",dialogueStyle);

	if(dialogue > 20){ 
		GameObject.FindGameObjectWithTag("Respawn").renderer.material.mainTexture = skin;
		cutscene = 0;
	}
			
}

function OnTriggerEnter (other : Collider) {
	var name = other.gameObject.name;
	var tag = other.gameObject.tag;
	
	if(tag == "pipe"){
		ladder = true;
	}
	else if(tag == "death"){
		die();
	}
	else if(name == "d4"){  //cheetah
		global.canDash = true;
	}
	else if(name == "d5"){  //frog
		global.canDoubleJump = true;
	}
	else if(tag == "checkpoint"){
		RavenCache.x = other.transform.position.x;
		RavenCache.y = other.transform.position.y;
		RavenCache.checkpoint = name;
		global.Save();
		Destroy(other.gameObject);
	}
}

function OnTriggerExit (other : Collider) {
	if(other.gameObject.tag == "pipe"){
		ladder = false;
	}
}


function die(){
	global.deaths += 1;
	global.Save();
	if(RavenCache.level == 0){
		Application.LoadLevel("tutlevel");
	}else if(global.level == 1){
		Application.LoadLevel("level2");
	}
}

function jump(){
	ground = false;
	if(global.heart == 'frog'){
		if(jumpNumber == 1){
			jumpNumber = 2;
			rigidbody.AddForce(Vector3.up * jumpSpeed);
		}
	}
	if(jumpNumber == 0){
		jumpNumber = 1;
		rigidbody.AddForce(Vector3.up * jumpSpeed);
		emit();	
	}
	
	audio.PlayOneShot(post_jump_sound);	
}

function emit(){
	particles.transform.position.x = transform.position.x;
	particles.transform.position.z = transform.position.z;
	particles.transform.position.y = transform.position.y - 0.5;
	particles.Emit(12);
}

function loop_this_clip(clip : AudioClip){
	if(!audio.isPlaying){
		audio.priority = 1;
		audio.clip = clip;
		audio.Play();
	}
}

function pauseGame(){
	var allObjects	= GameObject.FindGameObjectsWithTag('cloth');
	Time.timeScale	= 0;
	global.paused	= true;
	
	for(var thisObject in allObjects){
		thisObject.GetComponent(InteractiveCloth).enabled = false;
	}
}
function resumeGame(){
	var allObjects	= GameObject.FindGameObjectsWithTag('cloth');
	Time.timeScale	= 1;
	global.paused	= false;
	
	for(var thisObject in allObjects){
		thisObject.GetComponent(InteractiveCloth).enabled = true;
	}	
}

function Update () {
	if(global.paused){
		global.timer += Time.deltaTime;
	}
	animState = "idle";
	transform.eulerAngles.y -= 0.1 * (transform.eulerAngles.y - targetRotationy);
	
	if (cutscene == 1) {
		if (Input.GetKeyUp (KeyCode.Return)) dialogue +=1;
		return;
	}
	
	var hit:RaycastHit;
	if(Physics.Raycast(transform.position, -Vector3.up, hit, 0.5)){
		if(hit.transform.gameObject.tag == 'dieBelowRaven'){
			Destroy(hit.transform.gameObject);
			rigidbody.AddForce(Vector3.up * jumpSpeed);
		}
	}
	
	if(global.paused){
		if(Input.GetKeyDown(KeyCode.Escape)) resumeGame();
		return;
	}
	
	if(Input.GetKeyDown(KeyCode.Escape)){
		pauseGame();
	}
	
	if(!(IsGrounded() || ground)){
		animState = "jump_pose";
	}
					
	if(Input.GetButtonDown("Jump")){
		audio.PlayOneShot(pre_jump_sound);	
		jump();
	}
	
	if(Input.GetKey(KeyCode.DownArrow)){
		global.enableDash();
		if(global.canDash)
			ravenMaterial.renderer.materials[0].SetColor("_Color", Color.yellow);
		cam_state = "zoom_in";
	}
	else if(Input.GetKey(KeyCode.LeftArrow)){
		global.enableDoubleJump();
		if(global.canDoubleJump)
			ravenMaterial.renderer.materials[0].SetColor("_Color", Color.green);
		cam_state = "zoom_in";
	} else if(Input.GetKey(KeyCode.RightArrow)){
		global.enableZoom();
		if(global.canZoom)
			ravenMaterial.renderer.materials[0].SetColor("_Color", Color.red);
	}
	

	
	if(Input.GetButton("Forward")){
		if(!IsLadder() && rigidbody.velocity.x < speed){
			targetRotationy = 90;
			loop_this_clip(walk_sound);
			if(ground){
				rigidbody.velocity.x = speed;
				animState = "run";
			}else{
				rigidbody.velocity.x += speed * 0.1;
			}
		}
	}
	
	if(Input.GetButton("Backward")){
		if(!IsLadder() && rigidbody.velocity.x > -speed){
			targetRotationy = 270;
			loop_this_clip(walk_sound);
			if(ground){
				rigidbody.velocity.x = -speed;
				animState = "run";
			}else{
				rigidbody.velocity.x -= speed * 0.1;
			}
		}
	}
	
	if(Input.GetButton("Action")){
		if( global.heart == 'cheetah'){
			if(timer == heartCD && targetRotationy == 90){
				rigidbody.AddForce(Vector3.right * 600);
				rigidbody.AddForce(Vector3.up * 100);
			}
			if(timer == heartCD && targetRotationy == 270){
				rigidbody.AddForce(Vector3.left * 600);
				rigidbody.AddForce(Vector3.up * 100);
			}
			
			sprintCD = true;
		}
		
		if( global.heart == 'eagle'){
			if(cam_state == 'idle'){
				if(main_camera.transform.localPosition.z <= -8 && main_camera.transform.localPosition.z >= -25)
					cam_state = 'zoom_out';
				else cam_state = 'zoom_in';
			}
		}
	}
	
	//Debug.Log(cam_state);
	
	if(sprintCD){
		timer -= Time.deltaTime;
		if(timer <= 0){
			timer = heartCD;
			sprintCD = false;
		}
	}
	
	if(IsLadder()){
		rigidbody.useGravity = false;
		rigidbody.velocity.y = 0;
		rigidbody.velocity.x = 0;
		rigidbody.isKinematic = true;
		
		if(Input.GetButton("Front")){
			targetRotationy = 0;
			transform.position -= transform.up * speed/2 * Time.deltaTime;
			
			
			animState = "climbing";
		}
		else if(Input.GetButton("Back")){
			targetRotationy = 0;
			transform.position += transform.up * speed/2 * Time.deltaTime;
			animState = "climbing";
		}
		if(Input.GetButton("Forward")){
			targetRotationy = 90;
		}
		else if(Input.GetButton("Backward")){
			targetRotationy = 270;
		}
		if(Input.GetButtonDown("Jump")){
			rigidbody.isKinematic = false;
			rigidbody.useGravity = true;
			ladder = false;
			if(targetRotationy == 270){
				rigidbody.AddForce(Vector3.left * speed);
				rigidbody.AddForce(Vector3.up * jumpSpeed);
			
			}
			else if(targetRotationy == 90){
				rigidbody.AddForce(Vector3.right * speed);
				rigidbody.AddForce(Vector3.up * jumpSpeed);
			
			}
		}
		
	}else{
		rigidbody.useGravity = true;
		rigidbody.isKinematic = false;
	}	

	if(Input.GetButton("Front") && animState == 'idle'){
		targetRotationy  = 180;
	}
	
	if(!Input.anyKey && animState != "jump_pose"){
		animation.Stop();
	}
	
	//camera zoomout/zoomin
	if(cam_state == "zoom_out" && main_camera.transform.localPosition.z >= -25){
		main_camera.transform.localPosition.z --;
		
	}else if(cam_state == "zoom_out"){
		cam_state = "idle";
	} 
	
	//Debug.Log(main_camera.transform.localPosition.z);
	
	if(cam_state == "zoom_in" && main_camera.transform.localPosition.z <= -9){
		main_camera.transform.localPosition.z ++;
		//Debug.Log("zooming in");
	}else if(cam_state == "zoom_in"){
		cam_state = "idle";
	}
	
	if(Input.anyKey && cam_state == "idle"){
		cam_state = "zoom_in";
	}
	
	if(animState != "idle")
		animation.Play(animState + "");
} //end of update()