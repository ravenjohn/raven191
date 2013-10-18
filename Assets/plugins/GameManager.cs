using UnityEngine;    // For Debug.Log, etc.
 
using System.Text;
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;
 
using System;
using System.Runtime.Serialization;
using System.Reflection;


[Serializable ()]
public class SaveGameManager : ISerializable
{
	public int level;
	public bool canDash = false;
	public bool canDoubleJump = false;
	public bool canZoom = false;
	public int deaths;
	public bool paused;
	public string username = "save";
	public float timer;
	
 
    public SaveGameManager() { }
 
    public SaveGameManager (SerializationInfo info, StreamingContext ctxt)
    {
		level = (int) info.GetValue("level", typeof(int));
		canDash = (bool) info.GetValue("canDash", typeof(bool));
		deaths = (int) info.GetValue("deaths", typeof(int));
		canDoubleJump = (bool) info.GetValue("canDoubleJump", typeof(bool));
		canZoom = (bool) info.GetValue("canZoom", typeof(bool));
		paused = (bool) info.GetValue("paused", typeof(bool));
		username = (string) info.GetValue("username", typeof(string));
		timer = (float) info.GetValue("timer", typeof(float));
    }
 
    public void GetObjectData (SerializationInfo info, StreamingContext ctxt)
    {
        info.AddValue("level", level);
        info.AddValue("canDash", canDash);
        info.AddValue("canZoom", canZoom);
        info.AddValue("deaths", deaths);
        info.AddValue("canDoubleJump", canDoubleJump);
        info.AddValue("paused", paused);
        info.AddValue("username", username);
        info.AddValue("timer", timer);
    }
}


public sealed class VersionDeserializationBinder : SerializationBinder 
{ 
	public override Type BindToType( string assemblyName, string typeName )
    { 
        if ( !string.IsNullOrEmpty( assemblyName ) && !string.IsNullOrEmpty( typeName ) ) 
        { 
            Type typeToDeserialize = null; 
 
            assemblyName = Assembly.GetExecutingAssembly().FullName; 
 
            // The following line of code returns the type. 
            typeToDeserialize = Type.GetType( String.Format( "{0}, {1}", typeName, assemblyName ) ); 
 
            return typeToDeserialize; 
        } 
 
        return null; 
    } 
}


public class SaveLoad
{
	public SaveLoad(){
	}
    public static void  Save (string filePath, GameManager manager)
    {
        SaveGameManager data = new SaveGameManager ();
        data.level = manager.level;
        data.canDash = manager.canDash;
        data.canZoom = manager.canZoom;
        data.deaths = manager.deaths;
        data.canDoubleJump = manager.canDoubleJump;
        data.paused = manager.paused;
        data.username = manager.username;
        data.timer = manager.timer;
		
		//Debug.Log (data.level);
 
        Stream stream = File.Open(filePath, FileMode.Create);
        BinaryFormatter bformatter = new BinaryFormatter();
        bformatter.Binder = new VersionDeserializationBinder(); 
        bformatter.Serialize(stream, data);
        stream.Close();
    }
	
    public static void  Load (string filePath, GameManager manager)
    {
		try{
	        Stream stream = File.Open(filePath, FileMode.Open);
	        BinaryFormatter bformatter = new BinaryFormatter();
	        bformatter.Binder = new VersionDeserializationBinder(); 
	        SaveGameManager data = (SaveGameManager)bformatter.Deserialize(stream);
	        stream.Close();
	 
	        manager.level = data.level;
	        manager.canDash = data.canDash;
	        manager.canZoom = data.canZoom;
	        manager.deaths = data.deaths;
	        manager.canDoubleJump = data.canDoubleJump;
	        manager.paused = data.paused;
	        manager.username = data.username;
	        manager.timer = data.timer;
			manager.loaded = true;
		}catch(IOException e){
			manager.loaded = false;
			return;
		}
    }
}


public class GameManager : MonoBehaviour
{
	public bool loaded;
	public int level = 0;
	public bool canDash = false;
	public bool canDoubleJump = false;
	public bool canZoom = false;
	public int deaths;
	public string heart;
	public bool paused;
	public string username = "Raven";
	public float timer = 0;

	public GameManager(){
	}
	
	public void Save(){
		SaveLoad.Save("save/" + this.username + ".raven", this);
	}
	
	public int getlevel(){
		return level;
	}
	
	public void Load(){
		SaveLoad.Load("save/" + this.username + ".raven", this);
		if(this.canDash){
			Destroy(GameObject.Find("Cheetah"));
			Destroy(GameObject.Find("d4"));
		}
		if(this.canDoubleJump){
			Destroy(GameObject.Find("Frog"));
			Destroy(GameObject.Find("d5"));
		}
		if(this.canZoom){
			Destroy(GameObject.Find("heartOwner-Eagle"));
		}
	}
	
	public void enableDash(){
		if(this.canDash){
			this.heart = "cheetah";
		}
	}
	
	public void enableDoubleJump(){
		if(this.canDoubleJump){
			this.heart = "frog";
		}
	}
	
	public void enableZoom(){
		if(this.canZoom){
			this.heart = "eagle";
		}
	}
}