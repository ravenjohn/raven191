#pragma strict

var pointB : Vector3;
var transitionSpeed : float;
 
function Start () {
    var pointA = this.transform.position;
    while (true) {
	    this.transform.eulerAngles.y = 90;
        yield MoveObject(this.transform, pointA, pointB, transitionSpeed);
	    this.transform.eulerAngles.y = 270;
        yield MoveObject(this.transform, pointB, pointA, transitionSpeed);
    }
}
 
function MoveObject (thisTransform : Transform, startPos : Vector3, endPos : Vector3, time : float) {
    var i = 0.0;
    var rate = 1.0/time;
    while (i < 1.0) {
        i += Time.deltaTime * rate;
        thisTransform.position = Vector3.Lerp(startPos, endPos, i);
        yield; 
    }
}	