function Start () {

}

function Update () {

}

function Awake(){
	DontDestroyOnLoad(transform.gameObject);
}

public static class RavenCache{
	public var x : float;
	public var y : float;
	public var level = 0;
	public var checkpoint = "";
}