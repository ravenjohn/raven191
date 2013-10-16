Shader "Custom/BRDFNormSpec" {
    Properties 
    {
       _MainTexIntense ("Base Intensity", float) = 2.5
       _RampTexIntense ("BRDF Intensity", float) = 0.5
       _MainTex ("Base (RGB)", 2D) = "white" {}
       _Ramp2D ("BRDF Texture", 2D) = "gray" {}
       _NormalMap ("Normal Texture", 2D) = "bump" {}
    }
    SubShader {
       Tags { "RenderType"="Opaque" }
       LOD 200
 
       CGPROGRAM
       #pragma surface surf Ramp
       #pragma target 2.0
 
       sampler2D _MainTex;
       sampler2D _Ramp2D;
       sampler2D _NormalMap;
       fixed _MainTexIntense;
       fixed _RampTexIntense;
 
       struct Input 
       {
         float2 uv_MainTex;
         float2 uv_NormalMap;
       };
 
       half4 LightingRamp (SurfaceOutput s, half3 lightDir, half3 viewDir, half atten)
       {
         float NdotL = dot(s.Normal, lightDir);
         float NdotE = dot(s.Normal, viewDir);
 
         float diff = (NdotL * 0.3) + 0.5;
         float2 brdfUV = float2(NdotE  * 0.8, diff);
         float3 BRDF = tex2D(_Ramp2D, brdfUV.xy).rgb * _RampTexIntense;
 
         float4 c;
         c.rgb = BRDF;
         c.a = s.Alpha;
 
         return c;
       }
 
       void surf (Input IN, inout SurfaceOutput o) 
       {
         half4 c = tex2D (_MainTex, IN.uv_MainTex) * _MainTexIntense;
 
         o.Albedo = c.rgb;
         o.Normal = UnpackNormal(tex2D (_NormalMap, IN.uv_NormalMap));
         o.Alpha = c.a;
       }
       ENDCG
    } 
    FallBack "Diffuse"
}