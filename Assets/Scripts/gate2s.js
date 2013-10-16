#pragma strict

var isClosed : boolean;
var openGate : boolean;
var closeGate : boolean;
var endposY : float;	
var startposY : float;	
var currposY : float;

function Start () {

	isClosed = true;
	openGate = false;
	closeGate = false;

}

function Update () {


	if(openGate) {
		this.transform.Translate(Vector3.up * Time.deltaTime * 7);
		if(this.transform.localPosition.y >= endposY) {
			isClosed = false;
			openGate = false;	
		}
	}
		else if(closeGate) {
			this.transform.Translate(Vector3.down * Time.deltaTime * 7);
			if(this.transform.localPosition.y <= startposY) {
				isClosed = true;
				closeGate = false;
			}
		}

}

function toggleGate(){

	if(isClosed){
		openGate = true;
	}else {
		closeGate = true;
	}
	
}