Shader "Alpha" {
Properties
{
    _Alpha ("Alpha", Range (0.0,1.0)) = 0.0 
    _MainTex ("Base (RGB) Transparency (A)", 2D) = "" { }
}

SubShader
{
    Tags { "Queue" = "Transparent" }

    Pass
    {
        Blend SrcAlpha OneMinusSrcAlpha

        SetTexture [_MainTex] {
           constantColor (1, 1, 1, [_Alpha])
           combine texture * constant
        }
    }
} 
} 