var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.findInternal = function(a, f, g) {
    a instanceof String && (a = String(a));
    for (var h = a.length, k = 0; k < h; k++) {
        var n = a[k];
        if (f.call(g, n, k, a)) return {
            i: k,
            v: n
        }
    }
    return {
        i: -1,
        v: void 0
    }
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, f, g) {
    a != Array.prototype && a != Object.prototype && (a[f] = g.value)
};
$jscomp.getGlobal = function(a) {
    return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(a, f, g, h) {
    if (f) {
        g = $jscomp.global;
        a = a.split(".");
        for (h = 0; h < a.length - 1; h++) {
            var k = a[h];
            k in g || (g[k] = {});
            g = g[k]
        }
        a = a[a.length - 1];
        h = g[a];
        f = f(h);
        f != h && null != f && $jscomp.defineProperty(g, a, {
            configurable: !0,
            writable: !0,
            value: f
        })
    }
};
$jscomp.polyfill("Array.prototype.find", function(a) {
    return a ? a : function(a, g) {
        return $jscomp.findInternal(this, a, g).v
    }
}, "es6", "es3");
var vortexVShader = "attribute vec3 vert;\nattribute vec3 normal;\nattribute vec2 texcoord;\nuniform mat4 u_mvMatrix;\nuniform mat4 u_invMvMatrix;\nuniform vec3 u_eye;\nuniform mat4 u_normalMatrix;\nuniform mat4 u_projMatrix;\nvarying vec3 vNormal;\nvarying vec3 vCPos;\nvarying vec3 vECPos;\nvarying vec2 vTexcoord;\nvarying vec3 vEyePos;\nvarying vec3 vSrcNormal;\nvoid main()\n{\n\tvTexcoord       = texcoord;\n\tvCPos           = vert;\n   vEyePos         = u_eye;\n\tvECPos\t    = (u_mvMatrix*vec4(vert, 1.0)).xyz;\n\tvNormal \t= (u_normalMatrix*vec4(normal, 1.0)).xyz;\n   vSrcNormal  = normal;\n\tgl_Position\t= u_projMatrix * vec4(vECPos, 1.0);\n}";
var vortexFShader = "#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D layerMap1;\nuniform sampler2D layerMap2;\nuniform sampler2D colorMeMap1;\nuniform sampler2D colorMeMap2;\nuniform sampler2D normalMap1;\nuniform sampler2D normalMap2;\nuniform sampler2D envDiff;\nuniform sampler2D envMap;\nuniform mat4 u_invMvMatrix;\nuniform sampler2D stickerMap0;\nuniform sampler2D stickerMap1;\nuniform sampler2D stickerMap2;\nuniform sampler2D stickerMap3;\nuniform sampler2D stickerMap4;\nuniform sampler2D stickerMap5;\nuniform sampler2D stickerMap6;\nuniform sampler2D stickerMap7;\nuniform mat4 u_stickerMatrix0;\nuniform mat4 u_stickerMatrix1;\nuniform mat4 u_stickerMatrix2;\nuniform mat4 u_stickerMatrix3;\nuniform mat4 u_stickerMatrix4;\nuniform mat4 u_stickerMatrix5;\nuniform mat4 u_stickerMatrix6;\nuniform mat4 u_stickerMatrix7;\nuniform vec3 u_stickerPos0;\nuniform vec3 u_stickerPos1;\nuniform vec3 u_stickerPos2;\nuniform vec3 u_stickerPos3;\nuniform vec3 u_stickerPos4;\nuniform vec3 u_stickerPos5;\nuniform vec3 u_stickerPos6;\nuniform vec3 u_stickerPos7;\nuniform vec4 \tu_ambient;\nuniform vec4 \tu_diffuse;\nuniform vec4 \tu_specular;\nuniform vec4 \tu_fillColor1;\nuniform vec4 \tu_fillColor2;\nuniform vec4 \tu_skinColor;\nuniform float \tu_shininess;\nvarying vec3 vNormal;\nvarying vec3 vCPos;\nvarying vec3 vECPos;\nvarying vec2 vTexcoord;\nvarying vec3 vEyePos;\nvarying vec3 vSrcNormal;\nvec3 srcNormal;\nvec4 TextureProject(mat4 texMat, vec3 texPos, sampler2D sampleMap, vec4 texelColor)\n{\n   float facing     = dot(normalize(texPos - vCPos), srcNormal);\n   if (facing>0.0)\n   {\n       mat4 eye          = texMat * u_invMvMatrix;\n       vec4 eyeVertex    = vec4(vECPos, 1.0);\n       vec4 texel        = eye * eyeVertex;\n       vec4 stickerTexel = vec4(texture2D(sampleMap, texel.xy));\n       texelColor.rgb    = (stickerTexel.rgb * stickerTexel.a) + (texelColor.rgb*(1.0-stickerTexel.a));\n   }\n   return texelColor;\n}\nvoid main()\n{\n\tvec3 normal         = normalize(vNormal);\n   srcNormal           = normalize(vSrcNormal);\n   vec3 mapNormal = normalize(2.0*(texture2D(normalMap1, vTexcoord).xyz + texture2D(normalMap2, vTexcoord).xyz) - 2.0);\n   mapNormal = mapNormal.x*(cross(vec3(0.0, 1.0, 0.0), normal)) + mapNormal.y*vec3(0.0, 1.0, 0.0) + mapNormal.z*normal;\n   vec2 vEnvMapTexcoord = vec2(0.0, 0.0);\n   vec3 toCam = vec3(vECPos.xyz - vEyePos.xyz);\n   vec3 r = reflect( normalize(toCam), mapNormal);\n   float m = 2.0 * sqrt( r.x*r.x + r.y*r.y + (r.z+1.0)*(r.z+1.0) );\n\tvEnvMapTexcoord.x = r.x/m + 0.5;\n\tvEnvMapTexcoord.y = r.y/m + 0.5;\n   vec4 specTexel1 = texture2D(colorMeMap1, vTexcoord);\n   vec4 specTexel2 = texture2D(colorMeMap2, vTexcoord);\n   vec4 faceTexel = texture2D(layerMap1, vTexcoord);\n   vec4 hairTexel = texture2D(layerMap2, vTexcoord);\n   vec4 envMapTexel1    = vec4(texture2D(envMap, vEnvMapTexcoord).rgb*specTexel1.r + texture2D(envDiff, vEnvMapTexcoord).rgb*(1.0 - specTexel1.r), 0.0)*u_skinColor;\n   vec4 envMapTexel2    = (vec4(texture2D(envMap, vEnvMapTexcoord).rgb*specTexel2.r + texture2D(envDiff, vEnvMapTexcoord).rgb*(1.0 - specTexel2.r), 0.0))*0.2*u_skinColor;\n   vec4 colorMod1       = vec4(1.0, 1.0, 1.0, 1.0) - vec4(1.0 - u_fillColor1.r, 1.0 - u_fillColor1.g, 1.0 - u_fillColor1.b, 1.0 - u_fillColor1.a)*specTexel1.g;\n   vec4 colorMod2       = vec4(1.0, 1.0, 1.0, 1.0) - vec4(1.0 - u_fillColor2.r, 1.0 - u_fillColor2.g, 1.0 - u_fillColor2.b, 1.0 - u_fillColor2.a)*specTexel2.g;\n   faceTexel.rgb    = colorMod1.rgb*faceTexel.rgb*faceTexel.a + envMapTexel1.rgb*(1.0 - faceTexel.a);\n   hairTexel.rgb    = colorMod2.rgb*hairTexel.rgb*hairTexel.a + envMapTexel2.rgb*specTexel2.r;\n   float fresnelFactor = pow((1.0 - dot( normalize(-toCam), normal)),4.0)*(0.9 - 0.45*hairTexel.a);\n   vec4 finalTexel     = vec4(hairTexel.rgb*hairTexel.a + faceTexel.rgb*(1.0 - hairTexel.a), 1.0);\n   finalTexel = TextureProject(u_stickerMatrix0, u_stickerPos0, stickerMap0, finalTexel);\n   finalTexel = TextureProject(u_stickerMatrix1, u_stickerPos1, stickerMap1, finalTexel);\n   finalTexel = TextureProject(u_stickerMatrix2, u_stickerPos2, stickerMap2, finalTexel);\n   finalTexel = TextureProject(u_stickerMatrix3, u_stickerPos3, stickerMap3, finalTexel);\n   finalTexel = TextureProject(u_stickerMatrix4, u_stickerPos4, stickerMap4, finalTexel);\n   finalTexel = TextureProject(u_stickerMatrix5, u_stickerPos5, stickerMap5, finalTexel);\n   finalTexel = TextureProject(u_stickerMatrix6, u_stickerPos6, stickerMap6, finalTexel);\n   finalTexel = TextureProject(u_stickerMatrix7, u_stickerPos7, stickerMap7, finalTexel);\n\tgl_FragColor = vec4(finalTexel.rgb + vec3(fresnelFactor, fresnelFactor, fresnelFactor), 1.0);\n}";
var linesVShader = "attribute vec3 point;\nuniform mat4 u_worldMatrix;\nuniform mat4 u_viewMatrix;\nuniform mat4 u_projMatrix;\nvoid main()\n{\n\tvec3 pos = point;\n\tmat4 mvp = u_projMatrix*u_viewMatrix*u_worldMatrix;\n\tgl_Position\t= mvp * vec4(pos, 1.0);\n}";
var linesFShader = "#ifdef GL_ES\nprecision highp float;\n#endif\nuniform vec4 u_lineColor;\nvoid main()\n{\n\tgl_FragColor = u_lineColor;\n}";
var screenQuad_vShader = "attribute vec3 vert;\nattribute vec2 texcoord;\nuniform float u_inv_viewport_width;\nuniform float u_inv_viewport_height;\nvarying vec2 vTexcoord;\nvoid main()\n{\ngl_Position = vec4(vert.xy, 0.0, 1.0);\nvTexcoord.x = 0.5 * (1.0 + vert.x + u_inv_viewport_width);\nvTexcoord.y = 0.5 * (1.0 - vert.y + u_inv_viewport_height);\n}";
var screenQuad_fShader = "#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D basemap;\nvarying vec2 vTexcoord;\nvoid main()\n{\n\tvec2 tex = vec2(vTexcoord.x, 1.0 - vTexcoord.y);\n\tvec4 texel = texture2D(basemap, tex );\n\tgl_FragColor = texel;\n}";
var depthMapVShader = "attribute vec3 vert;\nattribute vec3 normal;\nattribute vec2 texcoord;\nuniform mat4 u_mvpLightMatrix;\nvarying vec4 vPos;\nvoid main()\n{\n\tvec4 pos\t= u_mvpLightMatrix * vec4(vert, 1.0);\n   vPos = pos;\n\tgl_Position\t= pos;\n}";
var depthMapFShader = "#ifdef GL_ES\nprecision highp float;\n#endif\nvarying vec4 vPos;\nvoid main()\n{\nfloat shadow = 0.5;\n\tgl_FragColor = vec4(shadow,shadow,shadow, 1.0);\n}";
var shadow_vshader = "attribute vec3 vert;\nattribute vec3 normal;\nattribute vec2 texcoord;\nuniform mat4 u_mvMatrix;\nuniform mat4 u_projMatrix;\nuniform mat4 u_shadowLightWorld;\nuniform mat4 u_shadowBiasMatrix;\nuniform mat4 u_vShadowLight;\nvarying vec4 vShadowCoord;\nvoid main()\n{\n\tvec4 pos\t    = (u_mvMatrix*vec4(vert, 1.0));\n\tgl_Position\t= u_projMatrix * pos;\n\tmat4 shadowMat  = u_shadowBiasMatrix*u_projMatrix*u_vShadowLight;\n   vShadowCoord    = shadowMat * vec4(vert, 1.0);\n}";
var shadow_fshader = "#define BLOCKER_SEARCH_NUM_SAMPLES 16\n#define PCF_NUM_SAMPLES 16\n#define NEAR_PLANE 4.5 \n#define LIGHT_WORLD_SIZE 3.0 \n#define LIGHT_FRUSTUM_WIDTH 8.0 \n#define LIGHT_SIZE_UV (LIGHT_WORLD_SIZE / LIGHT_FRUSTUM_WIDTH) \n#define SHADOW_EPSILON 0.1\n#define SMAP_SIZE 1024.0\n#define texMapScale 1.0/SMAP_SIZE\n#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D shadowMap;\nvec2 poissonDisk[16];\nvarying vec4 vShadowCoord;\nfloat unpackTex2D(sampler2D map, vec2 coord);\nfloat PCSS(vec4 coords);\nvoid FindBlocker(out float avgBlockerDepth, out float numBlockers, vec2 uv, float zReceiver );\nfloat PenumbraSize(float zReceiver, float zBlocker); //Parallel plane estimation \nfloat PCF_Filter(vec2 uv, float zReceiver, float filterRadiusUV);\nvoid main()\n{\n\tvec4 shadowCoord    = vec4(vShadowCoord.xyz / vShadowCoord.w, vShadowCoord.w);\n\tvec4 rgba_depth = texture2D(shadowMap, shadowCoord.xy);\n\tgl_FragColor = vec4(0.0,0.0,0.0, rgba_depth.r);\n}\nfloat unpackTex2D(sampler2D map, vec2 coord)\n{\n\tvec4 rgba_depth = texture2D(map, coord.xy);\n\tconst vec4 bit_shift = vec4(1.0/(256.0*256.0*256.0), 1.0/(256.0*256.0), 1.0/256.0, 1.0);\n\treturn dot(rgba_depth, bit_shift);\n}\nfloat PenumbraSize(float zReceiver, float zBlocker) //Parallel plane estimation \n{\nreturn (zReceiver - zBlocker) / zBlocker; \n}\nvoid FindBlocker(out float avgBlockerDepth, out float numBlockers, vec2 uv, float zReceiver )\n{\nfloat searchWidth = (LIGHT_SIZE_UV*(zReceiver - NEAR_PLANE) / zReceiver)/SMAP_SIZE; \nfloat blockerSum = 0.0;\nnumBlockers = 0.0;\nfor( int i = 0; i < BLOCKER_SEARCH_NUM_SAMPLES; i++)\n{\nfloat shadowMapDepth = unpackTex2D(shadowMap, uv + poissonDisk[i]*searchWidth);\nif(shadowMapDepth + SHADOW_EPSILON < zReceiver)\n{\nblockerSum += shadowMapDepth;\nnumBlockers++;\n}\n}\navgBlockerDepth = blockerSum/numBlockers;\n}\nfloat PCF_Filter(vec2 uv, float zReceiver, float filterRadiusUV)\n{\nfloat sum = 0.0;\nfloat scale = 10.0/SMAP_SIZE;\nfloat sample= 0.0;\nfor(int i = 0; i < PCF_NUM_SAMPLES;i++)\n{\nvec2 sampleuv = uv + (poissonDisk[i]*scale);\nsample = unpackTex2D(shadowMap, sampleuv) + SHADOW_EPSILON;\nsum += sample < zReceiver ? 1.0 : 0.3;\n}\nreturn sum/float(PCF_NUM_SAMPLES);\n}\nfloat PCSS(vec4 coords)\n{\npoissonDisk[0] = vec2( -0.94201624, -0.39906216 );\npoissonDisk[1] = vec2( 0.94558609, -0.76890725 );\npoissonDisk[2] = vec2( -0.094184101, -0.92938870);\npoissonDisk[3] = vec2( 0.34495938, 0.29387760 );\npoissonDisk[4] = vec2( -0.91588581, 0.45771432 );\npoissonDisk[5] = vec2( -0.81544232, -0.87912464 );\npoissonDisk[6] = vec2( -0.38277543, 0.27676845 );\npoissonDisk[7] = vec2( 0.97484398, 0.75648379 );\npoissonDisk[8] = vec2( 0.44323325, -0.97511554 );\npoissonDisk[9] = vec2( 0.53742981, -0.47373420 );\npoissonDisk[10] = vec2( -0.26496911, -0.41893023 );\npoissonDisk[11] = vec2( 0.79197514, 0.19090188 );\npoissonDisk[12] = vec2( -0.24188840, 0.99706507 );\npoissonDisk[13] = vec2( -0.81409955, 0.91437590 );\npoissonDisk[14] = vec2( 0.19984126, 0.78641367 );\npoissonDisk[15] = vec2( 0.14383161, -0.14100790 );\nvec2 uv = coords.xy;\nfloat zReceiver = coords.z;\nfloat avgBlockerDepth = 0.0;\nfloat numBlockers = 0.0;\nFindBlocker(avgBlockerDepth, numBlockers, uv, zReceiver);\nif(numBlockers < 1.0)\n{\nreturn 0.1;\n}\nfloat penumbraRatio = PenumbraSize(zReceiver, avgBlockerDepth);\nfloat filterRadiusUV = penumbraRatio*LIGHT_SIZE_UV*NEAR_PLANE/coords.z;\nreturn PCF_Filter(uv, zReceiver, filterRadiusUV);\n}";
var radialBlur_vshader = "attribute vec3 vert;\nattribute vec2 texcoord;\nuniform float u_inv_viewport_width;\nuniform float u_inv_viewport_height;\nvarying vec2 vTexcoord;\nvoid main()\n{\ngl_Position = vec4(vert.xy, 0.0, 1.0);\nvTexcoord.x = 0.5 * (1.0 + vert.x + u_inv_viewport_width);\nvTexcoord.y = 0.5 * (1.0 - vert.y + u_inv_viewport_height);\n}";
var radialBlur_fshader = "#ifdef GL_ES\nprecision highp float;\n#endif\nvec2 poissonDisk[16];\nuniform sampler2D basemap;\nuniform float u_mapSize;\nuniform float u_sampRadius;\nconst int u_numSamples = 16;\nvarying vec2 vTexcoord;\nfloat radialBlur(sampler2D map, vec2 coord);\nvoid main()\n{\n   gl_FragColor =  vec4(0.0, 0.0, 0.0, radialBlur(basemap, vTexcoord));\n}\nfloat radialBlur(sampler2D map, vec2 coord)\n{\nfloat texmapscale = 1.0/u_mapSize;\npoissonDisk[0] = vec2( -0.94201624, -0.39906216 );\npoissonDisk[1] = vec2( 0.94558609, -0.76890725 );\npoissonDisk[2] = vec2( -0.094184101, -0.92938870);\npoissonDisk[3] = vec2( 0.34495938, 0.29387760 );\npoissonDisk[4] = vec2( -0.91588581, 0.45771432 );\npoissonDisk[5] = vec2( -0.81544232, -0.87912464 );\npoissonDisk[6] = vec2( -0.38277543, 0.27676845 );\npoissonDisk[7] = vec2( 0.97484398, 0.75648379 );\npoissonDisk[8] = vec2( 0.44323325, -0.97511554 );\npoissonDisk[9] = vec2( 0.53742981, -0.47373420 );\npoissonDisk[10] = vec2( -0.26496911, -0.41893023 );\npoissonDisk[11] = vec2( 0.79197514, 0.19090188 );\npoissonDisk[12] = vec2( -0.24188840, 0.99706507 );\npoissonDisk[13] = vec2( -0.81409955, 0.91437590 );\npoissonDisk[14] = vec2( 0.19984126, 0.78641367 );\npoissonDisk[15] = vec2( 0.14383161, -0.14100790 );\nfloat sum = 0.0;\nfloat a = 0.0;\nfor(int i = 0; i < u_numSamples ;i++)\n{\nvec2 offset = poissonDisk[i]*u_sampRadius;\na += texture2D(map, coord.xy + offset*texmapscale).w;\n}\nreturn a/float(u_numSamples);\n}";
var shadowProj_vshader = "attribute vec3 vert;\nattribute vec3 normal;\nattribute vec2 texcoord;\nuniform mat4 u_mvMatrix;\nuniform mat4 u_projMatrix;\nuniform mat4 u_shadowLightWorld;\nuniform mat4 u_shadowBiasMatrix;\nuniform mat4 u_vShadowLight;\nvarying vec4 vShadowCoord;\nvoid main()\n{\n\tvec4 pos\t    = (u_mvMatrix*vec4(vert, 1.0));\n\tgl_Position\t= u_projMatrix * pos;\n\tmat4 shadowMat  = u_shadowBiasMatrix*u_projMatrix*u_vShadowLight;\n   vShadowCoord    = shadowMat * vec4(vert, 1.0);\n}";
var shadowProj_fshader = "#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D shadowMap;\nvarying vec4 vShadowCoord;\nvoid main()\n{\n\tvec4 shadowCoord    = vec4(vShadowCoord.xyz / vShadowCoord.w, vShadowCoord.w);\n\tvec4 shadow = texture2D(shadowMap, shadowCoord.xy);\n   float alpha = 1.0 - dot(shadow.rgb, vec3(1.0, 1.0, 1.0))/2.0;\n\tgl_FragColor = vec4(0.0, 0.0, 0.0, shadow.a);\n}";

function loadObjVertexMtrl(a, f) {
    var g = new XMLHttpRequest;
    g.obj = {
        meshObj: a
    };
    g.onreadystatechange = function() {
        onResponseLoadVerts(g)
    };
    g.open("GET", a.meshDataSrc.vertexData, !0);
    var h = new XMLHttpRequest;
    h.obj = {
        meshObj: a
    };
    h.onreadystatechange = function() {
        onResponseLoadMtrl(h)
    };
    h.open("GET", a.meshDataSrc.mtrl, !0);
    h.send(null);
    g.send(null)
}

function onResponseLoadMtrl(a) {
    4 == a.readyState && (a.obj.meshObj.mtrlData = a.responseText, a.obj.meshObj.preInit())
}

function onResponseLoadVerts(a) {
    4 == a.readyState && (a.obj.meshObj.vertexData = a.responseText, a.obj.meshObj.preInit())
}

function processMatVertData(a) {
    var f = procObjMtrl(a.mtrlData);
    a.vertexData = procObjVertices(a.primSets, f, a.vertexData)
}

function procObjMtrl(a) {
    var f = [];
    a = a.split("newmtl");
    for (var g = new TextureSet, h = new TextureSet, k = 0; k < a.length; k++) {
        var n = new Material,
            l = a[k].split("\n");
        if (1 != l.length) {
            n.name = l[0].substring(1);
            l = l.slice(1);
            for (var t = 0; t < l.length; t++) {
                var p = l[t].replace(/[ \t]+/g, " ").replace(/\s\s*$/, "");
                "#" != p[0] && (p = p.split(" "), "Ka" == p[0] ? (n.amb.x = p[1], n.amb.y = p[2], n.amb.z = p[3], 4 < p.length && (n.amb.w = p[4])) : "Kd" == p[0] ? (n.diff.x = p[1], n.diff.y = p[2], n.diff.z = p[3], 4 < p.length && (n.diff.w = p[4])) : "Ks" == p[0] ? (n.spec.x = p[1],
                    n.spec.y = p[2], n.spec.z = p[3], 4 < p.length && (n.spec.w = p[4])) : "Ns" == p[0] ? n.pwr = p[1] : "map_set1" == p[0] ? (g.name = p[1], n.tex.set1.push(g_texMan.getTextureSetByName(g.name))) : "map_set2" == p[0] ? (h.name = p[1], n.tex.set2.push(g_texMan.getTextureSetByName(h.name))) : "map_Kd" == p[0] ? (g.diff = p[1], n.tex.diffuse1.push(g_texMan.loadTexture(p[1]))) : "map_Kd2" == p[0] ? (h.diff = p[1], n.tex.diffuse2.push(g_texMan.loadTexture(p[1]))) : "map_Ks" == p[0] ? (g.spec = p[1], n.tex.spec1.push(g_texMan.loadSpecMap(p[1]))) : "map_Ks2" == p[0] ? (h.spec =
                    p[1], n.tex.spec2.push(g_texMan.loadSpecMap(p[1]))) : "bump" == p[0] ? (g.norm = p[1], n.tex.normal1.push(g_texMan.loadNormalMap(p[1]))) : "bump2" == p[0] ? (h.norm = p[1], n.tex.normal2.push(g_texMan.loadNormalMap(p[1]))) : "shader" != p[0] && "pickable" == p[0] && (n.pickable = "true" == p[1] ? !0 : !1))
            }
            null != n.name && f.push(n)
        }
    }
    return f
}

function procObjVertices(a, f, g) {
    var h = new MeshData,
        k = [],
        n = [],
        l = [],
        t = [],
        p = null;
    for (v in f) subArr = [], t.push(subArr), t[v].points = [];
    var q = [],
        r = [],
        u = [],
        x = {};
    var v = 0;
    g = g.split("\n");
    for (var y = 0; y < g.length; y++) {
        var w = g[y].replace(/[ \t]+/g, " ").replace(/\s\s*$/, "");
        if ("#" != w[0])
            if (w = w.split(" "), "usemtl" == w[0]) p = w[1];
            else if ("v" == w[0]) q.push(parseFloat(w[1])), q.push(parseFloat(w[2])), q.push(parseFloat(w[3]));
        else if ("vt" == w[0]) u.push(parseFloat(w[1])), u.push(parseFloat(w[2]));
        else if ("vn" == w[0]) r.push(parseFloat(w[1])),
            r.push(parseFloat(w[2])), r.push(parseFloat(w[3]));
        else if ("f" == w[0] && 4 == w.length)
            for (var z = 1; 4 > z; ++z) {
                if (!(w[z] in x)) {
                    var A = w[z].split("/"),
                        B;
                    if (1 == A.length) var G = A = B = parseInt(A[0]) - 1;
                    else A.length = 3, B = parseInt(A[0]) - 1, G = parseInt(A[1]) - 1, A = parseInt(A[2]) - 1;
                    var C = 0,
                        D = 0,
                        E = 0;
                    3 * B + 2 < q.length && (C = q[3 * B], D = q[3 * B + 1], E = q[3 * B + 2]);
                    k.push(C);
                    k.push(D);
                    k.push(E);
                    B = getIndexOfName(f, p);
                    t[B].points.push(C);
                    t[B].points.push(D);
                    t[B].points.push(E);
                    D = C = 0;
                    2 * G + 1 < u.length && (C = u[2 * G], D = u[2 * G + 1]);
                    l.push(C);
                    l.push(D);
                    D = C =
                        0;
                    E = 1;
                    3 * A + 2 < r.length && (C = r[3 * A], D = r[3 * A + 1], E = r[3 * A + 2]);
                    n.push(C);
                    n.push(D);
                    n.push(E);
                    x[w[z]] = v++
                }
                B = getIndexOfName(f, p);
                t[B].push(x[w[z]])
            }
    }
    h.vertexObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, h.vertexObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(k), gl.STATIC_DRAW);
    h.normalObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, h.normalObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(n), gl.STATIC_DRAW);
    h.texCoordObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, h.texCoordObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(l), gl.STATIC_DRAW);
    k = Array(3E4);
    for (v = l = n = 0; v < f.length; v++) {
        a.push({
            size: 0,
            indexInBuffer: n,
            points: t[v].points,
            material: f[v]
        });
        for (p = 0; p < t[v].length; p++) k[l++] = t[v][p];
        a[v].size = p;
        n += t[v].length
    }
    k = k.slice(0, l);
    h.numIndices = k.length;
    h.indexObject = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, h.indexObject);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(k), gl.STREAM_DRAW);
    return h
}

function getIndexOfName(a, f) {
    for (var g = 0; g < a.length; g++)
        if (f == a[g].name) return g;
    return 0
};

function __UNIFORMTYPE() {
    this.INT = 1008;
    this.FLOAT = 1E3;
    this.FLOAT2 = 1001;
    this.FLOAT3 = 1002;
    this.FLOAT4 = 1003;
    this.MATRIX3 = 1004;
    this.MATRIX4 = 1005;
    this.TEXTURE2D = 1006;
    this.TEXTURECUBE = 1007
}
UNIFORMTYPE = new __UNIFORMTYPE;

function RenderObject(a) {
    this.shader = a;
    this.world = null;
    this.bindings = new ShaderData;
    this.postRenderProc = this.renderProc = this.initRenderProc = null
}
RenderObject.prototype.addUniform = function (a, f, g) {
    debugger;
    var h = gl.getUniformLocation(this.shader, a);
    h && (h.debugName = a, this.bindings.uniforms.push(new UniformPair(h, f, g)))
};
RenderObject.prototype.addUniformArray = function(a, f, g, h) {
    var k = gl.getUniformLocation(this.shader, a);
    if (k)
        for (; 0 < h; 0) k.debugName = a + 0, this.bindings.uniforms.push(new UniformPair(k, f[0], g)), k += f[0].length, f++
};
RenderObject.prototype.addTexture = function(a, f, g) {
    (a = gl.getUniformLocation(this.shader, a)) && this.bindings.textures.push(new TexUniform(a, f, g))
};
RenderObject.prototype.addBuffers = function(a, f, g, h, k) {
    void 0 == g || void 0 == h || void 0 == k || null == g || null == h || null == k ? this.bindings.buffers.push(new BufferAttrib(a, f, null, null, null)) : this.bindings.buffers.push(new BufferAttrib(a, f, g, h, k))
};
RenderObject.prototype.bindUniforms = function() {
    for (var a = 0; a < this.bindings.uniforms.length; a++) {
        var f = this.bindings.uniforms[a];
        switch (f.type) {
            case UNIFORMTYPE.INT:
                gl.uniform1i(f.uniform, f.value);
                break;
            case UNIFORMTYPE.FLOAT:
                gl.uniform1f(f.uniform, f.value);
                break;
            case UNIFORMTYPE.FLOAT2:
                gl.uniform2fv(f.uniform, f.value.getAsWebGLFloatArray());
                break;
            case UNIFORMTYPE.FLOAT3:
                gl.uniform3fv(f.uniform, f.value.getAsWebGLFloatArray());
                break;
            case UNIFORMTYPE.FLOAT4:
                gl.uniform4fv(f.uniform, f.value.getAsWebGLFloatArray());
                break;
            case UNIFORMTYPE.MATRIX3:
                gl.uniformMatrix3fv(f.uniform, !1, f.value.getAsWebGLFloatArray());
                break;
            case UNIFORMTYPE.MATRIX4:
                gl.uniformMatrix4fv(f.uniform, !1, f.value.getAsWebGLFloatArray())
        }
    }
};
RenderObject.prototype.bindTextures = function() {
    for (var a = 0; a < this.bindings.textures.length; a++) {
        var f = this.bindings.textures[a];
        switch (f.type) {
            case UNIFORMTYPE.TEXTURE2D:
                gl.activeTexture(gl.TEXTURE0 + f.unit);
                gl.uniform1i(f.uniform, f.unit);
                break;
            case UNIFORMTYPE.TEXTURECUBE:
                gl.activeTexture(gl.TEXTURE0 + f.unit), gl.uniform1i(f.uniform, f.unit)
        }
    }
};
RenderObject.prototype.bindBuffers = function() {
    for (var a = 0; a < this.bindings.buffers.length; a++) {
        var f = this.bindings.buffers[a];
        gl.bindBuffer(f.glBufferType, f.buffer);
        null != f.glAttribType && (gl.enableVertexAttribArray(f.attribIndex), gl.vertexAttribPointer(f.attribIndex, f.attribSize, f.glAttribType, !1, 0, 0))
    }
};
RenderObject.prototype.unBindBuffers = function() {
    for (var a = 0; a < this.bindings.buffers.length; a++) {
        var f = this.bindings.buffers[a];
        null != f.glAttribType && gl.disableVertexAttribArray(f.attribIndex);
        gl.bindBuffer(f.glBufferType, null)
    }
};
RenderObject.prototype.initialize = function(a) {
    a(this)
};
RenderObject.prototype.clear = function() {
    this.world = new CanvasMatrix4;
    this.bindings = new ShaderData
};

function ShaderData() {
    this.uniforms = [];
    this.textures = [];
    this.buffers = []
}

function UniformPair(a, f, g) {
    this.uniform = a;
    this.value = f;
    this.type = g
}

function TexUniform(a, f, g) {
    this.uniform = a;
    this.unit = f;
    this.type = g
}

function BufferAttrib(a, f, g, h, k) {
    this.buffer = a;
    this.glBufferType = f;
    this.attribSize = g;
    this.glAttribType = k;
    this.attribIndex = h
}
renderProcDefault = __renderProcDefault;
postRenderProcDefault = __postRenderProcDefault;
renderProcLines = __renderProcLines;
renderProcScreenQuad = __renderProcScreenQuad;
renderProcDepthMap = __renderProcDepthMap;
renderProcShadowReceiver = __renderProcShadowReceiver;
renderProcShadowProjection = __renderProcShadowProjection;

function __setActiveTexture(a, f) {
    gl.activeTexture(a);
    gl.bindTexture(gl.TEXTURE_2D, f)
}

function __renderProcDefault(a) {
    gl.mvMatrix.load(g_cam.view);
    gl.mvMatrix.multRight(a.parentMesh.world);
    gl.normalMatrix.load(gl.mvMatrix);
    gl.normalMatrix.invert();
    gl.normalMatrix.transpose();
    gl.invMvMatrix.load(gl.mvMatrix);
    gl.invMvMatrix.invert();
    gl.useProgram(arrayPeek(a.material.shader).shaderHandle);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, arrayPeek(a.material.tex.set1).diff);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, arrayPeek(a.material.tex.set2).diff);
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, arrayPeek(a.material.tex.set1).spec);
    gl.activeTexture(gl.TEXTURE3);
    gl.bindTexture(gl.TEXTURE_2D, arrayPeek(a.material.tex.set2).spec);
    gl.activeTexture(gl.TEXTURE4);
    gl.bindTexture(gl.TEXTURE_2D, arrayPeek(a.material.tex.env));
    gl.activeTexture(gl.TEXTURE5);
    gl.bindTexture(gl.TEXTURE_2D, arrayPeek(a.material.tex.envDiff));
    __setActiveTexture(gl.TEXTURE7, g_cam.stickerTexture[0]);
    __setActiveTexture(gl.TEXTURE8, g_cam.stickerTexture[1]);
    __setActiveTexture(gl.TEXTURE9, g_cam.stickerTexture[2]);
    __setActiveTexture(gl.TEXTURE10, g_cam.stickerTexture[3]);
    __setActiveTexture(gl.TEXTURE11, g_cam.stickerTexture[4]);
    __setActiveTexture(gl.TEXTURE12, g_cam.stickerTexture[5]);
    __setActiveTexture(gl.TEXTURE13, g_cam.stickerTexture[6]);
    __setActiveTexture(gl.TEXTURE14, g_cam.stickerTexture[7]);
    for (var f = 0; 8 > f; f++) a.parentMesh.stickers[f].load(g_cam.stickers[f]), a.parentMesh.stickersPos[f].setvec(g_cam.stickersPos[f]);
    __setActiveTexture(gl.TEXTURE15, arrayPeek(a.material.tex.set1).norm);
    __setActiveTexture(gl.TEXTURE6,
        arrayPeek(a.material.tex.set2).norm);
    arrayPeek(a.material.renderObj).bindBuffers();
    arrayPeek(a.material.renderObj).bindTextures();
    arrayPeek(a.material.renderObj).bindUniforms();
    gl.drawElements(gl.TRIANGLES, a.size, gl.UNSIGNED_SHORT, 2 * a.indexInBuffer)
}

function __renderProcLines(a, f, g, h, k) {
    gl.useProgram(a.shader);
    a.lineColor.x = f;
    a.lineColor.y = g;
    a.lineColor.z = h;
    a.lineColor.w = k;
    a.bindBuffers();
    a.bindUniforms();
    gl.drawArrays(gl.LINES, 0, a.numPoints / 3);
    gl.useProgram(null)
}

function __renderProcScreenQuad(a) {
    gl.disable(gl.DEPTH_TEST);
    gl.useProgram(a.shader);
    a.renderObj.bindBuffers();
    a.renderObj.bindTextures();
    a.renderObj.bindUniforms();
    gl.bindTexture(gl.TEXTURE_2D, a.texture);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.useProgram(null);
    gl.enable(gl.DEPTH_TEST)
}

function __postRenderProcDefault(a) {
    gl.useProgram(arrayPeek(a.material.renderObj).shader);
    gl.useProgram(null)
}

function __renderProcDepthMap(a) {
    gl.useProgram(g_depthMap.shader);
    arrayPeek(a.material.renderObj).bindBuffers();
    g_depthMap.bindUniforms();
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.POLYGON_OFFSET_FILL);
    gl.cullFace(gl.FRONT);
    gl.drawElements(gl.TRIANGLES, a.size, gl.UNSIGNED_SHORT, 2 * a.indexInBuffer);
    gl.cullFace(gl.BACK);
    gl.disable(gl.POLYGON_OFFSET_FILL);
    gl.disable(gl.CULL_FACE);
    gl.useProgram(null)
}

function __renderProcShadowReceiver(a) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, a.shadowTarget.frameBuffer);
    gl.viewport(0, 0, a.shadowTarget.frameBuffer.width, a.shadowTarget.frameBuffer.height);
    gl.clearDepth(g_farZ);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.useProgram(arrayPeek(a.material.shader).shaderHandle);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, g_depthMap.depthRT);
    arrayPeek(a.material.renderObj).bindTextures();
    gl.mvMatrix.load(g_defaultView);
    gl.mvMatrix.multRight(a.parentMesh.world);
    arrayPeek(a.material.renderObj).bindUniforms();
    error = gl.getError();
    arrayPeek(a.material.renderObj).bindBuffers();
    gl.drawElements(gl.TRIANGLES, a.size, gl.UNSIGNED_SHORT, 2 * a.indexInBuffer);
    gl.useProgram(null);
    gl.bindTexture(gl.TEXTURE_2D, a.shadowTarget);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, theSceneRTT.frameBuffer);
    gl.viewport(0, 0, theSceneRTT.frameBuffer.width, theSceneRTT.frameBuffer.height);
    gl.bindFramebuffer(gl.FRAMEBUFFER, a.shadowTargetFinal.frameBuffer);
    gl.viewport(0, 0, a.shadowTargetFinal.frameBuffer.width, a.shadowTargetFinal.frameBuffer.height);
    gl.clearDepth(g_farZ);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    a.screenQuad.setTexture(a.shadowTarget);
    a.screenQuad.render(renderProcScreenQuad);
    gl.bindTexture(gl.TEXTURE_2D, a.shadowTargetFinal);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, theSceneRTT.frameBuffer);
    gl.viewport(0, 0, theSceneRTT.frameBuffer.width, theSceneRTT.frameBuffer.height);
    gl.bindFramebuffer(gl.FRAMEBUFFER, a.shadowTarget.frameBuffer);
    gl.viewport(0, 0, a.shadowTarget.frameBuffer.width, a.shadowTarget.frameBuffer.height);
    gl.clearDepth(g_farZ);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    a.screenQuad.setTexture(a.shadowTargetFinal);
    a.screenQuad.render(renderProcScreenQuad);
    gl.bindTexture(gl.TEXTURE_2D, a.shadowTarget);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, theSceneRTT.frameBuffer);
    gl.viewport(0, 0, theSceneRTT.frameBuffer.width,
        theSceneRTT.frameBuffer.height)
}

function __renderProcShadowProjection(a) {
    gl.useProgram(arrayPeek(a.material.shader).shaderHandle);
    gl.getError();
    gl.activeTexture(gl.TEXTURE0);
    gl.getError(gl.bindTexture(gl.TEXTURE_2D, g_depthMap.shadowTarget));
    gl.bindTexture(gl.TEXTURE_2D, g_meshMan.getModelByName("backdropReceiver").mesh.shadowToProject);
    arrayPeek(a.material.renderObj).bindTextures();
    gl.mvMatrix.load(g_defaultView);
    gl.mvMatrix.multRight(a.parentMesh.world);
    arrayPeek(a.material.renderObj).bindUniforms();
    arrayPeek(a.material.renderObj).bindBuffers();
    gl.drawElements(gl.TRIANGLES, a.size, gl.UNSIGNED_SHORT, 2 * a.indexInBuffer);
    gl.useProgram(null)
};
renderInitProcDefault = __renderInitProcDefault;
renderInitScreenQuad = __renderInitScreenQuad;
renderInitProcDepthMap = __renderInitProcDepthMap;
renderInitShadowReceiver = __renderInitShadowReceiver;
renderInitShadowProjection = __renderInitShadowProjection;

function __renderInitProcDefault(a, f) {
    var g = a.material;
    g.tex.env.push(arrayPeek(g.shader).envMap);
    g.tex.envDiff.push(arrayPeek(g.shader).envDiff);
    gl.useProgram(arrayPeek(g.shader).shaderHandle);
    arrayPeek(g.renderObj).addTexture("layerMap1", 0, UNIFORMTYPE.TEXTURE2D);
    arrayPeek(g.renderObj).addTexture("layerMap2", 1, UNIFORMTYPE.TEXTURE2D);
    arrayPeek(g.renderObj).addTexture("colorMeMap1", 2, UNIFORMTYPE.TEXTURE2D);
    arrayPeek(g.renderObj).addTexture("colorMeMap2", 3, UNIFORMTYPE.TEXTURE2D);
    arrayPeek(g.renderObj).addTexture("envMap",
        4, UNIFORMTYPE.TEXTURE2D);
    arrayPeek(g.renderObj).addTexture("envDiff", 5, UNIFORMTYPE.TEXTURE2D);
    arrayPeek(g.renderObj).addTexture("normalMap1", 15, UNIFORMTYPE.TEXTURE2D);
    arrayPeek(g.renderObj).addTexture("normalMap2", 6, UNIFORMTYPE.TEXTURE2D);
    arrayPeek(g.renderObj).addTexture("stickerMap0", 7, UNIFORMTYPE.TEXTURE2D);
    arrayPeek(g.renderObj).addTexture("stickerMap1", 8, UNIFORMTYPE.TEXTURE2D);
    arrayPeek(g.renderObj).addTexture("stickerMap2", 9, UNIFORMTYPE.TEXTURE2D);
    arrayPeek(g.renderObj).addTexture("stickerMap3",
        10, UNIFORMTYPE.TEXTURE2D);
    arrayPeek(g.renderObj).addTexture("stickerMap4", 11, UNIFORMTYPE.TEXTURE2D);
    arrayPeek(g.renderObj).addTexture("stickerMap5", 12, UNIFORMTYPE.TEXTURE2D);
    arrayPeek(g.renderObj).addTexture("stickerMap6", 13, UNIFORMTYPE.TEXTURE2D);
    arrayPeek(g.renderObj).addTexture("stickerMap7", 14, UNIFORMTYPE.TEXTURE2D);
    arrayPeek(g.renderObj).addUniform("u_normalMatrix", gl.normalMatrix, UNIFORMTYPE.MATRIX4);
    arrayPeek(g.renderObj).addUniform("u_mvMatrix", gl.mvMatrix, UNIFORMTYPE.MATRIX4);
    arrayPeek(g.renderObj).addUniform("u_invMvMatrix",
        gl.invMvMatrix, UNIFORMTYPE.MATRIX4);
    arrayPeek(g.renderObj).addUniform("u_stickerMatrix0", a.parentMesh.stickers[0], UNIFORMTYPE.MATRIX4);
    arrayPeek(g.renderObj).addUniform("u_stickerMatrix1", a.parentMesh.stickers[1], UNIFORMTYPE.MATRIX4);
    arrayPeek(g.renderObj).addUniform("u_stickerMatrix2", a.parentMesh.stickers[2], UNIFORMTYPE.MATRIX4);
    arrayPeek(g.renderObj).addUniform("u_stickerMatrix3", a.parentMesh.stickers[3], UNIFORMTYPE.MATRIX4);
    arrayPeek(g.renderObj).addUniform("u_stickerMatrix4", a.parentMesh.stickers[4],
        UNIFORMTYPE.MATRIX4);
    arrayPeek(g.renderObj).addUniform("u_stickerMatrix5", a.parentMesh.stickers[5], UNIFORMTYPE.MATRIX4);
    arrayPeek(g.renderObj).addUniform("u_stickerMatrix6", a.parentMesh.stickers[6], UNIFORMTYPE.MATRIX4);
    arrayPeek(g.renderObj).addUniform("u_stickerMatrix7", a.parentMesh.stickers[7], UNIFORMTYPE.MATRIX4);
    arrayPeek(g.renderObj).addUniform("u_stickerPos0", a.parentMesh.stickersPos[0], UNIFORMTYPE.FLOAT3);
    arrayPeek(g.renderObj).addUniform("u_stickerPos1", a.parentMesh.stickersPos[1], UNIFORMTYPE.FLOAT3);
    arrayPeek(g.renderObj).addUniform("u_stickerPos2", a.parentMesh.stickersPos[2], UNIFORMTYPE.FLOAT3);
    arrayPeek(g.renderObj).addUniform("u_stickerPos3", a.parentMesh.stickersPos[3], UNIFORMTYPE.FLOAT3);
    arrayPeek(g.renderObj).addUniform("u_stickerPos4", a.parentMesh.stickersPos[4], UNIFORMTYPE.FLOAT3);
    arrayPeek(g.renderObj).addUniform("u_stickerPos5", a.parentMesh.stickersPos[5], UNIFORMTYPE.FLOAT3);
    arrayPeek(g.renderObj).addUniform("u_stickerPos6", a.parentMesh.stickersPos[6], UNIFORMTYPE.FLOAT3);
    arrayPeek(g.renderObj).addUniform("u_stickerPos7",
        a.parentMesh.stickersPos[7], UNIFORMTYPE.FLOAT3);
    arrayPeek(g.renderObj).addUniform("u_projMatrix", gl.perspectiveMatrix, UNIFORMTYPE.MATRIX4);
    arrayPeek(g.renderObj).addUniform("u_fillColor1", g.fillColor[0], UNIFORMTYPE.FLOAT4);
    arrayPeek(g.renderObj).addUniform("u_fillColor2", g.fillColor[1], UNIFORMTYPE.FLOAT4);
    arrayPeek(g.renderObj).addUniform("u_skinColor", g.fillColor[2], UNIFORMTYPE.FLOAT4);
    f.vertexObject.name = "vertexObject";
    f.normalObject.name = "normalObject";
    f.texCoordObject.name = "texCoordObject";
    f.indexObject.name =
        "indexObject";
    arrayPeek(g.renderObj).addBuffers(f.vertexObject, gl.ARRAY_BUFFER, 3, 0, gl.FLOAT);
    arrayPeek(g.renderObj).addBuffers(f.normalObject, gl.ARRAY_BUFFER, 3, 1, gl.FLOAT);
    arrayPeek(g.renderObj).addBuffers(f.texCoordObject, gl.ARRAY_BUFFER, 2, 2, gl.FLOAT);
    arrayPeek(g.renderObj).addBuffers(f.indexObject, gl.ELEMENT_ARRAY_BUFFER);
    gl.useProgram(null)
}

function __renderInitScreenQuad(a, f) {
    a.shader = void 0 == f ? createShader(gl, screenQuad_vShader, screenQuad_fShader, ["vert", "texcoord"]) : f;
    a.renderObj = new RenderObject(a.shader);
    quadBuf = getScreenAlignedQuad();
    a.vertBuffer = quadBuf.vertexObject;
    a.uvBuffer = quadBuf.texCoordObject;
    a.renderObj.addTexture("basemap", 0, UNIFORMTYPE.TEXTURE2D);
    a.renderObj.addUniform("u_inv_viewport_width", 1 / g_width, UNIFORMTYPE.FLOAT);
    a.renderObj.addUniform("u_inv_viewport_height", 1 / g_height, UNIFORMTYPE.FLOAT);
    a.renderObj.addBuffers(a.vertBuffer,
        gl.ARRAY_BUFFER, 3, 0, gl.FLOAT);
    a.renderObj.addBuffers(a.uvBuffer, gl.ARRAY_BUFFER, 2, 2, gl.FLOAT)
}

function __renderInitProcDepthMap(a) {
    a.shader = g_depthShader.shaderHandle;
    gl.useProgram(a.shader);
    a.addUniform("u_mvpLightMatrix", g_mainLight.mvpMatrix, UNIFORMTYPE.MATRIX4);
    a.bindUniforms();
    gl.useProgram(null)
}

function __renderInitShadowReceiver(a, f) {
    a.shadowTarget = g_texMan.loadRenderTarget("shadowTarget", 256, 256);
    a.shadowTargetFinal = g_texMan.loadRenderTarget("shadowTargetFinal", 256, 256);
    a.screenQuad = new ScreenQuad(a.shadowTargetFinal);
    a.screenQuad.initialize(__renderInitRadialBlur);
    a.parentMesh.shadowToProject = a.shadowTarget;
    a = a.material;
    a.tex.env.push(arrayPeek(a.shader).envMap);
    a.tex.envDiff.push(arrayPeek(a.shader).envDiff);
    gl.useProgram(arrayPeek(a.shader).shaderHandle);
    arrayPeek(a.renderObj).addTexture("shadowMap",
        0, UNIFORMTYPE.TEXTURE2D);
    arrayPeek(a.renderObj).addUniform("u_mvMatrix", gl.mvMatrix, UNIFORMTYPE.MATRIX4);
    arrayPeek(a.renderObj).addUniform("u_projMatrix", gl.perspectiveMatrix, UNIFORMTYPE.MATRIX4);
    arrayPeek(a.renderObj).addUniform("u_shadowBiasMatrix", g_mainLight.shadowMatrix, UNIFORMTYPE.MATRIX4);
    arrayPeek(a.renderObj).addUniform("u_vShadowLight", g_mainLight.view, UNIFORMTYPE.MATRIX4);
    f.vertexObject.name = "vertexObject";
    f.normalObject.name = "normalObject";
    f.texCoordObject.name = "texCoordObject";
    f.indexObject.name =
        "indexObject";
    arrayPeek(a.renderObj).addBuffers(f.vertexObject, gl.ARRAY_BUFFER, 3, 0, gl.FLOAT);
    arrayPeek(a.renderObj).addBuffers(f.normalObject, gl.ARRAY_BUFFER, 3, 1, gl.FLOAT);
    arrayPeek(a.renderObj).addBuffers(f.texCoordObject, gl.ARRAY_BUFFER, 2, 2, gl.FLOAT);
    arrayPeek(a.renderObj).addBuffers(f.indexObject, gl.ELEMENT_ARRAY_BUFFER);
    gl.useProgram(null)
}

function __renderInitShadowProjection(a, f) {
    a = a.material;
    gl.useProgram(arrayPeek(a.shader).shaderHandle);
    arrayPeek(a.renderObj).addTexture("shadowMap", 0, UNIFORMTYPE.TEXTURE2D);
    arrayPeek(a.renderObj).addUniform("u_mvMatrix", gl.mvMatrix, UNIFORMTYPE.MATRIX4);
    arrayPeek(a.renderObj).addUniform("u_projMatrix", gl.perspectiveMatrix, UNIFORMTYPE.MATRIX4);
    arrayPeek(a.renderObj).addUniform("u_shadowBiasMatrix", g_mainLight.shadowMatrix, UNIFORMTYPE.MATRIX4);
    arrayPeek(a.renderObj).addUniform("u_vShadowLight", g_mainLight.view,
        UNIFORMTYPE.MATRIX4);
    f.vertexObject.name = "vertexObject";
    f.normalObject.name = "normalObject";
    f.texCoordObject.name = "texCoordObject";
    f.indexObject.name = "indexObject";
    arrayPeek(a.renderObj).addBuffers(f.vertexObject, gl.ARRAY_BUFFER, 3, 0, gl.FLOAT);
    arrayPeek(a.renderObj).addBuffers(f.normalObject, gl.ARRAY_BUFFER, 3, 1, gl.FLOAT);
    arrayPeek(a.renderObj).addBuffers(f.texCoordObject, gl.ARRAY_BUFFER, 2, 2, gl.FLOAT);
    arrayPeek(a.renderObj).addBuffers(f.indexObject, gl.ELEMENT_ARRAY_BUFFER);
    gl.useProgram(null)
}

function __renderInitRadialBlur(a, f) {
    a.shader = void 0 == f ? createShader(gl, radialBlur_vshader, radialBlur_fshader, ["vert", "texcoord"]) : f;
    a.renderObj = new RenderObject(a.shader);
    quadBuf = getScreenAlignedQuad();
    a.vertBuffer = quadBuf.vertexObject;
    a.uvBuffer = quadBuf.texCoordObject;
    a.renderObj.addTexture("basemap", 0, UNIFORMTYPE.TEXTURE2D);
    a.renderObj.addUniform("u_inv_viewport_width", 1 / g_width, UNIFORMTYPE.FLOAT);
    a.renderObj.addUniform("u_inv_viewport_height", 1 / g_height, UNIFORMTYPE.FLOAT);
    a.renderObj.addUniform("u_sampRadius",
        5, UNIFORMTYPE.FLOAT);
    a.renderObj.addUniform("u_mapSize", 256, UNIFORMTYPE.FLOAT);
    a.renderObj.addBuffers(a.vertBuffer, gl.ARRAY_BUFFER, 3, 0, gl.FLOAT);
    a.renderObj.addBuffers(a.uvBuffer, gl.ARRAY_BUFFER, 2, 2, gl.FLOAT)
};

function CollisionManager() {
    this.BV = []
};

function Model(a, f) {
    this.name = a;
    this.mesh = f;
    this.camera = null
}

function MeshManager() {
    this.modelList = [];
    this.readyList = [];
    this.meshesLoading = !0;
    this.postMeshLoadCallbackList = []
}
MeshManager.prototype.loadMesh = function(a, f, g, h) {
    f = new Mesh({
        vertexData: f,
        mtrl: g
    });
    f.defaultShaderName = h;
    a = new Model(a, f);
    this.readyList.push(a);
    f.loadMesh()
};
MeshManager.prototype.getModelByName = function(a) {
    for (var f in this.modelList)
        if (a == this.modelList[f].name) return this.modelList[f];
    this.meshToAdd = a;
    return null
};
MeshManager.prototype.getModelNames = function() {
    var a = [],
        f;
    for (f in this.modelList) a.push(this.modelList[f].name);
    return a
};
MeshManager.prototype.setModelCamera = function(a) {
    a = this.getModelByName(a);
    null == a.camera && (a.camera = new camera);
    a.camera.copy(g_cam)
};
MeshManager.prototype.getModelCamera = function(a) {
    (a = this.getModelByName(a)) && a.camera ? g_cam.copy(a.camera) : g_cam.clearstickers();
    g_cam.updateStickerCounter()
};
MeshManager.prototype.addToScene = function(a) {
    var f = this.getModelByName(a);
    f ? g_worldObjects.push(f) : this.meshToAdd = a;
    return null
};
MeshManager.prototype.processMeshData = function() {
    for (var a in this.readyList)
        if (this.readyList[a] && this.readyList[a].mesh.readyToProcess) {
            var f = this.readyList[a];
            this.readyList.splice(a, 1);
            f.mesh.initialize();
            this.modelList.push(f);
            this.meshToAdd && this.meshToAdd == f.name && (g_worldObjects.push(f), this.meshToAdd = null);
            if (0 == this.readyList.length && 1 == g_initComplete) this.onLoaded();
            break
        }
};
MeshManager.prototype.addOnLoadedCallback = function(a) {
    this.postMeshLoadCallbackList.push(a)
};
MeshManager.prototype.onLoaded = function() {
    for (var a in this.postMeshLoadCallbackList) this.postMeshLoadCallbackList[a]()
};

function TextureSet() {
    this.name = "unnamed";
    this.norm = this.spec = this.diff = g_alphaTex;
    this.layer = 0;
    this.partName = null
}

function TextureManager() {
    this.textureMap = [];
    this.rttMap = [];
    this.materialMap = [];
    this.normalMap = [];
    this.specMap = [];
    this.textureSetMap = []
}
TextureManager.prototype.loadTexture = function(a) {
    return this.loadTexAddToMap(this.textureMap, a)
};
TextureManager.prototype.loadTextureSet = function(a, f, g, h, k, n) {
    if (void 0 == this.textureSetMap[a]) {
        var l = new TextureSet;
        l.diff = f && f.image ? f : void 0 == f ? null : this.loadTexAddToMap(this.textureMap, f);
        l.spec = g && g.image ? g : void 0 == g ? null : this.loadTexAddToMap(this.specMap, g);
        l.norm = h && h.image ? h : void 0 == h ? null : this.loadTexAddToMap(this.normalMap, h);
        l.diff = null == l.diff || void 0 == l.diff ? g_alphaTex : l.diff;
        l.spec = null == l.spec || void 0 == l.diff ? g_alphaTex : l.spec;
        l.norm = null == l.norm || void 0 == l.diff ? 0 == k ? g_defaultNorm1 :
            g_defaultNorm2 : l.norm;
        l.layer = k;
        l.partName = n;
        l.name = a;
        this.textureSetMap[a] = l;
        this.textureSetMap[a].name = a
    }
    return this.textureSetMap[a]
};
TextureManager.prototype.loadRenderTarget = function(a, f, g) {
    void 0 == this.rttMap[a] && (this.rttMap[a] = createRenderTargetTexture(f, g), null != this.rttMap[a] && (this.rttMap[a].name = a));
    return this.rttMap[a]
};
TextureManager.prototype.loadMaterial = function(a) {
    return this.loadTexAddToMap(this.materialMap, a)
};
TextureManager.prototype.loadNormalMap = function(a) {
    return this.loadTexAddToMap(this.normalMap, a)
};
TextureManager.prototype.loadSpecMap = function(a) {
    return this.loadTexAddToMap(this.specMap, a)
};
TextureManager.prototype.loadTexAddToMap = function(a, f) {
    void 0 == a[f] && (a[f] = loadImageTexture(gl, "content/texture/" + f), a[f].name = f);
    return a[f]
};
TextureManager.prototype.addTexture = function(a, f) {
    this.textureMap[a] = f
};
TextureManager.prototype.getTextureSetNames = function() {
    var a = [],
        f;
    for (f in this.textureSetMap) a.push(this.textureSetMap[f].name);
    return a
};
TextureManager.prototype.getTextureSetNamesByLayerAndPart = function(a, f) {
    var g = [],
        h;
    for (h in this.textureSetMap) this.textureSetMap[h].layer == a && this.textureSetMap[h].partName == f && g.push(this.textureSetMap[h].name);
    return g
};
TextureManager.prototype.getTextureSetByName = function(a) {
    a = this.textureSetMap[a];
    return void 0 != a ? a : null
};
TextureManager.prototype.getTextureByName = function(a) {
    var f = this.textureMap[a];
    void 0 == f && (f = this.rttMap[a]);
    void 0 == f && (f = this.materialMap[a]);
    void 0 == f && (f = this.normalMap[a]);
    void 0 == f && (f = this.specMap[a]);
    return void 0 != f ? f : null
};
TextureManager.prototype.init = function() {
    this.loadTextureSet("defaultHead", "alphaTex.png", "whiteTex.png", "defaultNormMap1.jpg", 0, "Head");
    this.loadTextureSet("defaultHair", "alphaTex.png", "whiteTex.png", "defaultNormMap2.jpg", 1, "Head");
    this.loadTextureSet("defaultBody", "alphaTex.png", "whiteTex.png", "defaultNormMap1.jpg", 0, "Body");
    this.loadTextureSet("defaultLeg", "alphaTex.png", "whiteTex.png", "defaultNormMap2.jpg", 1, "Body");
    this.loadTexture("StampDecal_01_DM.png");
    this.loadTexture("StampDecal_02_DM.png");
    this.loadTexture("StampDecal_03_DM.png");
    this.loadTexture("StampDecal_04_DM.png");
    this.loadTexture("StampDecal_05_DM.png");
    this.loadTexture("StampDecal_06_DM.png");
    this.loadTexture("StampDecal_07_DM.png");
    this.loadTexture("StampDecal_08_DM.png");
    this.loadTexture("StampDecal_09_DM.png");
    this.loadTexture("StampDecal_10_DM.png");
    for (var a = 0; 10 > a; ++a) {
        var f = 9 > a ? "0" + (a + 1) : a + 1;
        this.loadTextureSet("Head" + f, "Head/HeadDecal" + f + "_DM.png", "Head/HeadDecal" + f + "_ColorM.jpg", "Head/HeadDecal" + f + "_NM.jpg", 0, "Head");
        this.loadTextureSet("Hair" + f, "Hair/HairDecal" + f + "_DM.png", "Hair/HairDecal" + f + "_ColorM.jpg", "Hair/HairDecal" + f + "_NM.jpg", 1, "Head")
    }
    for (a = 0; 10 > a; ++a) f = 9 > a ? "0" + (a + 1) : a + 1, this.loadTextureSet("Body" + f, "Body/BodyDecal" + f + "_DM.png", "Body/BodyDecal" + f + "_ColorM.jpg", "Body/BodyDecal" + f + "_NM.jpg", 1, "Body"), this.loadTextureSet("Legs" + f, "Legs/LegDecal" + f + "_DM.png", "Legs/LegDecal" + f + "_ColorM.jpg", "Legs/LegDecal" + f + "_NM.jpg", 0, "Body")
};

function Shader(a, f, g, h, k) {
    this.name = a;
    this.shaderHandle = f;
    this.initRenderProc = h;
    this.renderProc = g;
    this.postRenderProc = postRenderProcDefault;
    this.envDiff = this.envMap = k
}

function ShaderManager() {
    this.shaderMap = []
}
ShaderManager.prototype.addShader = function(a, f, g, h, k, n, l, t) {
    var p = this.shaderMap[a];
    return void 0 == p ? (f = createShader(gl, f, g, h), void 0 != l || void 0 != t ? (l = g_texMan.loadMaterial(l), t = g_texMan.loadMaterial(t), this.shaderMap[a] = new Shader(a, f, k, n, l), this.shaderMap[a].envDiff = t) : (this.shaderMap[a] = new Shader(a, f, k, n, null), this.shaderMap[a].envDiff = null), this.shaderMap[a].name = a, this.shaderMap[a]) : p
};
ShaderManager.prototype.getShaderNames = function() {
    var a = [],
        f;
    for (f in this.shaderMap) a.push(this.shaderMap[f].name);
    return a
};
ShaderManager.prototype.getShaderByName = function(a) {
    a = this.shaderMap[a];
    return void 0 != a && null != a ? a : null
};
ShaderManager.prototype.init = function() {
    this.addShader("default", vortexVShader, vortexFShader, ["vert", "normal", "texcoord"], renderProcDefault, renderInitProcDefault, "material_DullPlastic.png", "material_DullPlastic.png");
    this.addShader("barlights", vortexVShader, vortexFShader, ["vert", "normal", "texcoord"], renderProcDefault, renderInitProcDefault, "material_barlights.png", "material_barlightsDull.png");
    this.addShader("gloss", vortexVShader, vortexFShader, ["vert", "normal", "texcoord"], renderProcDefault, renderInitProcDefault,
        "material_gloss.png", "material_glossDull.png");
    this.addShader("inGlass", vortexVShader, vortexFShader, ["vert", "normal", "texcoord"], renderProcDefault, renderInitProcDefault, "material_inGlass.png", "material_inGlassDull.png");
    this.addShader("normals", vortexVShader, vortexFShader, ["vert", "normal", "texcoord"], renderProcDefault, renderInitProcDefault, "material_normal.png", "material_normalDull.png");
    this.addShader("paint", vortexVShader, vortexFShader, ["vert", "normal", "texcoord"], renderProcDefault, renderInitProcDefault,
        "material_paint.png", "material_paintDull.png");
    this.addShader("plastic", vortexVShader, vortexFShader, ["vert", "normal", "texcoord"], renderProcDefault, renderInitProcDefault, "material_plastic.png", "material_plasticDull.png");
    this.addShader("shadows", vortexVShader, vortexFShader, ["vert", "normal", "texcoord"], renderProcDefault, renderInitProcDefault, "material_shadows.png", "material_shadowsDull.png");
    this.addShader("skin", vortexVShader, vortexFShader, ["vert", "normal", "texcoord"], renderProcDefault, renderInitProcDefault,
        "material_skin.png", "material_skinDull.png");
    this.addShader("wax", vortexVShader, vortexFShader, ["vert", "normal", "texcoord"], renderProcDefault, renderInitProcDefault, "material_wax.png", "material_waxDull.png");
    this.addShader("shadowReceiver", shadow_vshader, shadow_fshader, ["vert", "normal", "texcoord"], renderProcShadowReceiver, renderInitShadowReceiver);
    this.addShader("shadowProj", shadowProj_vshader, shadowProj_fshader, ["vert", "normal", "texcoord"], renderProcShadowProjection, renderInitShadowProjection)
};

function Material() {
    this.name = null;
    this.amb = new vec4(0, 0, 0, 1);
    this.diff = new vec4(0, 0, 0, 1);
    this.spec = new vec4(0, 0, 0, 1);
    this.pwr = 64;
    this.tex = {
        diffuse1: [g_alphaTex],
        diffuse2: [g_alphaTex],
        spec1: [g_alphaTex],
        spec2: [g_alphaTex],
        normal1: [g_alphaTex],
        normal2: [g_alphaTex],
        env: [g_alphaTex],
        envDiff: [g_alphaTex],
        set1: [new TextureSet],
        set2: [new TextureSet]
    };
    this.fillColor = [new vec4(1, 1, 1, 1), new vec4(1, 1, 1, 1), new vec4(1, 1, 1, 1)];
    this.shader = [];
    this.renderObj = [];
    this.pickable = !0
}

function MeshData() {
    this.numIndices = 0;
    this.indexObject = this.normalObject = this.texCoordObject = this.vertexObject = this.primSets = null
}

function Mesh(a) {
    this.glCtx = gl;
    this.meshDataSrc = a;
    this.mtrlData = this.vertexData = null;
    this.readyToProcess = this.loaded = !1;
    this.BVL = null;
    this.world = new CanvasMatrix4;
    this.primSets = [];
    this.defaultShaderName = "default";
    this.stickers = [];
    this.stickersPos = [];
    for (a = 0; 9 > a; a++) this.stickers[a] = new CanvasMatrix4, this.stickersPos[a] = new vec3(0, 0, 0)
}
Mesh.prototype.loadMesh = function() {
    loadObjVertexMtrl(this, this.initialize)
};
Mesh.prototype.preInit = function() {
    this.vertexData && this.mtrlData && (this.readyToProcess = !0)
};
Mesh.prototype.initialize = function() {
    processMatVertData(this);
    for (var a in this.primSets) this.primSets[a].parentMesh = this;
    this.pushShaderToModel(this.defaultShaderName);
    this.generateMaterialBVL();
    this.loaded = !0
};
Mesh.prototype.generateMaterialBVL = function() {
    if (void 0 != this.primSets) {
        this.BVL = [];
        for (var a = 0; a < this.primSets.length; a++)
            if (0 != this.primSets[a].material.pickable) {
                this.BVL.push({
                    min: null,
                    max: null,
                    primSetRef: this.primSets[a]
                });
                for (var f = null, g = null, h = null, k = null, n = null, l = null, t, p, q, r = 0; r < this.primSets[a].points.length; r += 3) {
                    t = this.primSets[a].points[r];
                    p = this.primSets[a].points[r + 1];
                    q = this.primSets[a].points[r + 2];
                    if (t < f || null == f) f = t;
                    if (p < g || null == g) g = p;
                    if (q < h || null == h) h = q;
                    if (t > k || null == k) k = t;
                    if (p >
                        n || null == n) n = p;
                    if (q > l || null == l) l = q
                }
                this.primSets[a].points = null;
                this.BVL[a].min = new vec3(f, g, h);
                this.BVL[a].max = new vec3(k, n, l)
            }
    }
};
g_u_mvp = g_lineShader = g_lineFShader = g_lineVShader = null;
Mesh.prototype.initBVLDraw = function() {
    if (null == g_lineVShader && null == g_lineFShader) var a = g_lineShader = createShader(gl, linesVShader, linesFShader, ["point"]);
    for (var f = 0; f < this.BVL.length; f++) {
        var g = this.BVL[f].min,
            h = this.BVL[f].max;
        this.BVL[f].renderObj = new RenderObject(a);
        this.BVL[f].renderObj.world = this.world;
        this.BVL[f].renderObj.lineColor = new vec4(1, 0, 0, 1);
        this.BVL[f].renderObj.addUniform("u_lineColor", this.BVL[f].renderObj.lineColor, UNIFORMTYPE.FLOAT4);
        this.BVL[f].renderObj.addUniform("u_worldMatrix",
            this.world, UNIFORMTYPE.MATRIX4);
        this.BVL[f].renderObj.addUniform("u_viewMatrix", g_cam.view, UNIFORMTYPE.MATRIX4);
        this.BVL[f].renderObj.addUniform("u_projMatrix", gl.perspectiveMatrix, UNIFORMTYPE.MATRIX4);
        g = [g.x, g.y, g.z, h.x, g.y, g.z, h.x, g.y, g.z, h.x, h.y, g.z, h.x, h.y, g.z, g.x, h.y, g.z, g.x, h.y, g.z, g.x, g.y, g.z, g.x, g.y, h.z, h.x, g.y, h.z, h.x, g.y, h.z, h.x, h.y, h.z, h.x, h.y, h.z, g.x, h.y, h.z, g.x, h.y, h.z, g.x, g.y, h.z, g.x, g.y, g.z, g.x, g.y, h.z, h.x, g.y, g.z, h.x, g.y, h.z, h.x, h.y, g.z, h.x, h.y, h.z, g.x, h.y, g.z, g.x, h.y, h.z];
        this.BVL[f].renderObj.numPoints =
            g.length;
        this.BVL[f].buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.BVL[f].buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(g), gl.STATIC_DRAW);
        this.BVL[f].renderObj.addBuffers(this.BVL[f].buffer, gl.ARRAY_BUFFER, 3, 0, gl.FLOAT)
    }
};
Mesh.prototype.pushShaderToPrimSet = function(a, f) {
    shaderPush([this.primSets[f]], a, this.vertexData)
};
Mesh.prototype.popShaderFromPrimSet = function(a) {
    return shaderPop([this.primSets[a]])
};
Mesh.prototype.pushShaderToModel = function(a) {
    shaderPush(this.primSets, a, this.vertexData)
};
Mesh.prototype.popShaderFromModel = function() {
    return shaderPop(this.primSets)
};
Mesh.prototype.render = function() {
    if (this.loaded)
        for (var a = 0; a < this.primSets.length; a++) {
            var f = this.primSets[a].material;
            f.shader[f.shader.length - 1].renderProc(this.primSets[a]);
            f.shader[f.shader.length - 1].postRenderProc(this.primSets[a])
        }
};
Mesh.prototype.renderOverride = function(a, f) {
    if (this.loaded)
        for (var g = 0; g < this.primSets.length; g++) a(this.primSets[g]), f && f(this.primSets[g])
};
Mesh.prototype.flattenMaterial = function() {
    for (var a = 0; a < this.primSets.length; a++) {
        var f = this.primSets[a].material;
        f.shader.splice(0, f.shader.length - 1);
        f.renderObj.splice(0, f.renderObj.length - 1);
        for (var g in f.tex) f.tex.splice(0, g.length - 1)
    }
};
Mesh.prototype.createMaterialURL = function() {
    this.flattenMaterial();
    for (var a = "", f = 0; f < this.primSets.length; f++) {
        var g = this.primSets[f].material;
        a += "&" + f + "name=" + g.name + "&" + f + "set1=" + g.tex.set1[0].name + "+" + g.tex.set1[0].diff.name + "+" + g.tex.set1[0].spec.name + "+" + g.tex.set1[0].norm.name + "+" + g.tex.set1[0].layer + "+" + g.tex.set1[0].partName + "&" + f + "set2=" + g.tex.set2[0].name + "+" + g.tex.set2[0].diff.name + "+" + g.tex.set2[0].spec.name + "+" + g.tex.set2[0].norm.name + "+" + g.tex.set2[0].layer + "+" + g.tex.set2[0].partName +
            "&" + f + "clr=" + g.fillColor[0].toURLString() + "+" + g.fillColor[1].toURLString() + "+" + g.fillColor[2].toURLString() + "&" + f + "shdr=" + g.shader[0].name
    }
    return a
};
Mesh.prototype.flattenMaterial = function() {
    for (var a = 0; a < this.primSets.length; a++) {
        var f = this.primSets[a].material;
        f.shader.splice(0, f.shader.length - 1);
        f.renderObj.splice(0, f.renderObj.length - 1);
        f.tex.diffuse1.splice(0, f.tex.diffuse1.length - 1);
        f.tex.diffuse2.splice(0, f.tex.diffuse2.length - 1);
        f.tex.spec1.splice(0, f.tex.spec1.length - 1);
        f.tex.spec2.splice(0, f.tex.spec2.length - 1);
        f.tex.normal1.splice(0, f.tex.normal1.length - 1);
        f.tex.normal2.splice(0, f.tex.normal2.length - 1);
        f.tex.env.splice(0, f.tex.env.length -
            1);
        f.tex.envDiff.splice(0, f.tex.envDiff.length - 1);
        f.tex.set1.splice(0, f.tex.set1.length - 1);
        f.tex.set2.splice(0, f.tex.set2.length - 1)
    }
};

function ScreenQuad(a) {
    this.uvBuffer = this.vertBuffer = null;
    this.texture = a;
    this.renderObj = this.shader = null
}
ScreenQuad.prototype.initialize = function(a, f) {
    a(this, f)
};
ScreenQuad.prototype.setTexture = function(a) {
    this.texture = a
};
ScreenQuad.prototype.render = function(a) {
    a(this)
};
g_activeModel = g_depthMap = theSceneRTT = mainSceneQuad = null;
g_activeLayer = 0;
g_shadowProj = g_radialBlur = g_defaultView = g_mainLight = null;
g_farZ = 100;
g_lightMat = g_depthShader = g_alphaTex = null;
g_initComplete = !1;

function preinit() {
    g_lightMat = [new vec4(0, 0, 0, 0), new vec4(0, 0, 0, 0), new vec4(0, 0, 0, 0), new vec4(0, 0, 0, 0)];
    gl = initWebGL("canvas", [0, 0, 0, 0], g_farZ);
    g_depthShader = g_shaderMan.addShader("depthShader", depthMapVShader, depthMapFShader, ["vert", "normal", "texcoord"]);
    gl.normalMatrix = new CanvasMatrix4;
    gl.mvMatrix = new CanvasMatrix4;
    gl.invMvMatrix = new CanvasMatrix4;
    gl.viewport(0, 0, g_width, g_height);
    gl.perspectiveMatrix = new CanvasMatrix4;
    gl.perspectiveMatrix.perspective(45, g_width / g_height, 1, g_farZ);
    g_mainLight =
        new camera;
    g_mainLight.setLookAt(new vec3(-2, 2, 15), zeroVec(), upVec());
    g_mainLight.mvMatrix = new CanvasMatrix4(g_mainLight.view);
    g_mainLight.mvpMatrix = new CanvasMatrix4;
    g_mainLight.shadowMatrix = new CanvasMatrix4;
    g_mainLight.shadowMatrix.scale(.6, .6, .5);
    g_mainLight.shadowMatrix.translate(.5, .5, .5);
    startTime = (new Date).getTime();
    g_cam.setLookAt(new vec3(0, 0, 10), zeroVec(), upVec());
    g_defaultView = new CanvasMatrix4(g_cam.view);
    g_defaultTex = g_texMan.loadTexture("whiteTex.png");
    g_alphaTex = g_texMan.loadTexture("alphaTex.png");
    g_defaultNorm1 = g_texMan.loadTexture("defaultNormMap1.jpg");
    g_defaultNorm2 = g_texMan.loadTexture("defaultNormMap2.jpg");
    g_cam.clearstickers();
    g_texMan.init();
    g_shaderMan.init();
    g_radialBlur = g_shaderMan.addShader("radialBlur", radialBlur_vshader, radialBlur_fshader);
    g_meshMan.loadMesh("backdropProject", "content/mesh/backdrop.obj", "content/mesh/backdrop.mtl", "shadowProj");
    g_meshMan.loadMesh("backdropReceiver", "content/mesh/backdrop.obj", "content/mesh/backdrop.mtl", "shadowReceiver");
    g_meshMan.loadMesh("dollbaseMale",
        "content/mesh/CollectableDollBase_Maya.txt", "content/mesh/CollectableDollBase_Maya.mtl", "default");
    g_meshMan.loadMesh("dollbaseFemale", "content/mesh/CollectableDollBaseF_Maya.txt", "content/mesh/CollectableDollBaseF_Maya.mtl", "default");
    g_initComplete = !0;
    return gl
}

function init() {
    g_meshMan.addOnLoadedCallback(postMeshLoadInit);
    theSceneRTT = g_texMan.loadRenderTarget("mainTarget", 1024, 1024);
    mainSceneQuad = new ScreenQuad(theSceneRTT);
    mainSceneQuad.initialize(renderInitScreenQuad)
}

function postMeshLoadInit() {
    g_depthMap = new RenderObject(null);
    g_depthMap.initialize(renderInitProcDepthMap);
    g_depthMap.depthRT = g_texMan.loadRenderTarget("shadowMapDepthMap", 1024, 1024);
    addModelToScene("backdropReceiver");
    addModelToScene("backdropProject");
    selectModelIntent("Skin");
    maybeLoadModel() && loadModelFromURL();
    draw = Draw
}

function resize(a) {
    var f = document.getElementById("canvas");
    if (f.clientWidth != g_width || f.clientHeight != g_height) g_width = f.clientWidth, g_height = f.clientHeight, a.viewport(0, 0, g_width, g_height), a.perspectiveMatrix = new CanvasMatrix4, a.perspectiveMatrix.perspective(45, g_width / g_height, 1, g_farZ)
}
var draw = loadingDraw;

function Draw(a) {
    curTime = (new Date).getTime();
    g_dt = curTime - startTime;
    g_dt /= 1E3;
    startTime = curTime;
    .09 < g_dt && (g_dt = .05);
    resize(a);
    g_cam.mouseLook(g_dt);
    g_meshMan.processMeshData();
    if (g_hiQu) {
        a.bindFramebuffer(a.FRAMEBUFFER, g_depthMap.depthRT.frameBuffer);
        a.viewport(0, 0, g_depthMap.depthRT.frameBuffer.width, g_depthMap.depthRT.frameBuffer.height);
        a.clearDepth(g_farZ);
        a.enable(a.DEPTH_TEST);
        a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT);
        for (objIndex in g_worldObjects)
            if (void 0 != g_worldObjects[objIndex] &&
                1 == g_worldObjects[objIndex].mesh.loaded && !(void 0 != g_worldObjects[objIndex] && "backdropReceiver" == g_worldObjects[objIndex].name || void 0 != g_worldObjects[objIndex] && "backdropProject" == g_worldObjects[objIndex].name)) {
                g_mainLight.mvpMatrix.load(g_worldObjects[objIndex].mesh.world);
                a.invMvMatrix.load(g_cam.world);
                a.invMvMatrix.invert();
                g_mainLight.mvpMatrix.multLeft(a.invMvMatrix);
                g_mainLight.mvpMatrix.multLeft(g_cam.view);
                g_mainLight.mvpMatrix.multLeft(a.perspectiveMatrix);
                g_mainLight.mvpMatrix.multLeft(g_mainLight.shadowMatrix);
                g_mainLight.mvMatrix.load(g_mainLight.view);
                var f = new CanvasMatrix4(g_cam.view);
                f.multLeft(g_worldObjects[objIndex].mesh.world);
                f.m41 = 0;
                f.m42 = 0;
                f.m43 = 0;
                g_mainLight.mvMatrix.multLeft(f);
                g_mainLight.mvpMatrix.load(a.perspectiveMatrix);
                g_mainLight.mvpMatrix.multLeft(g_mainLight.mvMatrix);
                g_worldObjects[objIndex].mesh.renderOverride(renderProcDepthMap, null)
            } a.bindTexture(a.TEXTURE_2D, g_depthMap.depthRT);
        a.generateMipmap(a.TEXTURE_2D);
        a.bindTexture(a.TEXTURE_2D, null);
        a.bindFramebuffer(a.FRAMEBUFFER, null)
    }
    a.viewport(0,
        0, g_width, g_height);
    g_hiQu && a.bindFramebuffer(a.FRAMEBUFFER, theSceneRTT.frameBuffer);
    a.viewport(0, 0, theSceneRTT.frameBuffer.width, theSceneRTT.frameBuffer.height);
    a.clearDepth(g_farZ);
    a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT);
    for (objIndex in g_worldObjects) void 0 != g_worldObjects[objIndex] && 1 == g_worldObjects[objIndex].mesh.loaded && g_worldObjects[objIndex].mesh.render();
    g_hiQu && (a.bindTexture(a.TEXTURE_2D, theSceneRTT), a.generateMipmap(a.TEXTURE_2D), a.bindTexture(a.TEXTURE_2D, null), a.bindFramebuffer(a.FRAMEBUFFER,
        null), a.viewport(0, 0, g_width, g_height), a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT), renderProcScreenQuad(mainSceneQuad));
    a.flush();
    framerate.snapshot()
}

function loadingDraw(a) {
    g_meshMan.processMeshData()
}

function addModelToScene(a) {
    g_meshMan.addToScene(a)
}

function removeModelFromScene(a) {
    for (var f in g_worldObjects)
        if (a == g_worldObjects[f].name) return g_worldObjects.splice(f, 1), !0;
    return !1
}

function clearScene() {
    g_worldObjects = []
}

function maybeLoadModel() {
    return urlParam("0set1") ? !0 : !1
}

function getInitComplete() {
    return g_initComplete
};

function getAvailableModels() {
    return g_meshMan.getModelNames()
}

function setModelCamera(a) {
    g_meshMan.setModelCamera(a)
}

function getModelCamera(a) {
    g_meshMan.getModelCamera(a)
}

function setActiveModel(a) {
    g_activeModel ? removeModelFromScene(g_activeModel) && (setModelCamera(g_activeModel), g_activeModel = a, addModelToScene(a), getModelCamera(a)) : (g_activeModel = a, addModelToScene(a), getModelCamera(a))
}

function apiSetGraphicsQuality(a) {
    "low" == a ? (removeModelFromScene("backdropReceiver"), removeModelFromScene("backdropProject"), g_hiQu = !1) : "high" == a && (removeModelFromScene("backdropReceiver"), removeModelFromScene("backdropProject"), addModelToScene("backdropReceiver"), addModelToScene("backdropProject"), g_hiQu = !0)
}

function apiUseToolSelected(a) {
    a = a.split(" ");
    "undo" == a[0] ? g_cam.undosticker() : "doll1" == a[0] ? setActiveModel("dollbaseMale") : "doll2" == a[0] ? setActiveModel("dollbaseFemale") : "zoom" == a[0] ? g_cam.zoom() : "cameraReset" == a[0] && g_cam.reset()
}

function apiSetColor(a) {
    colorFillLayer(new vec4(a.R / 255, a.G / 255, a.B / 255, a.A / 255))
}

function apiSelectIntent(a) {
    g_IntentSelected = mapUIToIntentIndex(a);
    selectModelIntent(g_IntentText[g_IntentSelected])
}

function apiPushMaterial(a) {
    a = a.split("_");
    if ("mat" == a[0]) pushShaderToModel(a[1]);
    else if ("sticker" == a[0]) {
        var f = "StampDecal_";
        10 > a[1] && (f += "0");
        f += a[1] + "_DM.png";
        g_cam.selecttexture(g_texMan.getTextureByName(f))
    } else a = parseInt(a[1]), f = g_texMan.getTextureSetNamesByLayerAndPart(getActiveLayer(), getActivePartName()), pushTextureToModelPart(f[a % f.length])
}

function selectModelIntent(a) {
    switch (a) {
        case "None":
            setActiveLayer(-1);
            setSelectedPrimSet(-1);
            break;
        case "Skin":
            setActiveLayer(2);
            setSelectedPrimSet(0);
            break;
        case "Hair":
            setSelectedPrimSet(1);
            setActiveLayer(1);
            break;
        case "Face":
            setSelectedPrimSet(1);
            setActiveLayer(0);
            break;
        case "Body":
            setSelectedPrimSet(0);
            setActiveLayer(1);
            break;
        case "Legs":
            setSelectedPrimSet(0), setActiveLayer(0)
    }
    "Sticker" != a && g_cam.clearselection()
}

function colorFillLayer(a) {
    return 2 == getActiveLayer() ? colorFillSkin(a) : null == getSelectedPrimSet() || 0 == getSelectedPrimSet().length ? !1 : (primSet = getSelectedPrimSet()[0]) && a && 0 <= getActiveLayer() ? (primSet.material.fillColor[getActiveLayer()].x = a.x, primSet.material.fillColor[getActiveLayer()].y = a.y, primSet.material.fillColor[getActiveLayer()].z = a.z, primSet.material.fillColor[getActiveLayer()].w = a.w, !0) : !1
}

function colorFillSkin(a) {
    if (!getActiveModel().mesh.loaded) return !1;
    if ((primSets = getActiveModel().mesh.primSets) && a) {
        for (var f = 0; f < primSets.length; f++) primSets[f].material.fillColor[2].x = a.x, primSets[f].material.fillColor[2].y = a.y, primSets[f].material.fillColor[2].z = a.z, primSets[f].material.fillColor[2].w = a.w;
        return !0
    }
    return !1
}

function setColourPickersColour() {
    var a = new vec4;
    2 == getActiveLayer() ? (primSets = getActiveModel().mesh.primSets, a.x = primSets[0].material.fillColor[2].x, a.y = primSets[0].material.fillColor[2].y, a.z = primSets[0].material.fillColor[2].z, a.w = primSets[0].material.fillColor[2].w) : (primSet = getSelectedPrimSet()[0]) && a && 0 <= getActiveLayer() && (a.x = primSet.material.fillColor[getActiveLayer()].x, a.y = primSet.material.fillColor[getActiveLayer()].y, a.z = primSet.material.fillColor[getActiveLayer()].y, a.w = primSet.material.fillColor[getActiveLayer()].w)
}

function activateStickerPlacement(a) {}

function pushTextureToModel(a) {
    return texturePush(TEXTYPE.SET1, getActiveModel().mesh.primSets, a)
}

function popTextureFromModel() {
    return texturePop(TEXTYPE.SET1, getActiveModel().mesh.primSets)
}

function pushTextureToModelPart(a) {
    return texturePush(TEXTYPE.SET1, getSelectedPrimSet(), a)
}

function popTextureFromModelPart() {
    return texturePop(TEXTYPE.SET1, getSelectedPrimSet())
}

function pushShaderToModel(a) {
    return shaderPush(getActiveModel().mesh.primSets, a, getActiveModel().mesh.vertexData)
}

function popShaderFromModel() {
    return shaderPop(getActiveModel().mesh.primSets)
}

function pushShaderToModelPart(a) {
    return shaderPush(getSelectedPrimSet(), a, getActiveModel().mesh.vertexData)
}

function popShaderFromModelPart() {
    return shaderPop(getSelectedPrimSet())
}

function createModelURL() {
    debugger;
    return buildModelURL() + "&stickers=" + g_cam.getstickurl()
}

function loadModelFromURL() {
    loadMeshFromURL();
    loadStickersFromURL();
    g_cam.updateStickerCounter()
};
CanvasMatrix4 = function(a) {
    if ("object" == typeof a) {
        if ("length" in a && 16 <= a.length) {
            this.load(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]);
            return
        }
        if (a instanceof CanvasMatrix4) {
            this.load(a);
            return
        }
    }
    this.makeIdentity()
};
CanvasMatrix4.prototype.set = function(a, f, g, h) {
    this.m11 = a.x;
    this.m12 = a.y;
    this.m13 = a.z;
    this.m14 = 0;
    this.m21 = f.x;
    this.m22 = f.y;
    this.m23 = f.z;
    this.m24 = 0;
    this.m31 = g.x;
    this.m32 = g.y;
    this.m33 = g.z;
    this.m34 = 0;
    this.m41 = h.x;
    this.m42 = h.y;
    this.m43 = h.z;
    this.m44 = 1
};
CanvasMatrix4.prototype.load = function() {
    if (1 == arguments.length && "object" == typeof arguments[0]) {
        var a = arguments[0];
        if ("length" in a && 16 == a.length) {
            this.m11 = a[0];
            this.m12 = a[1];
            this.m13 = a[2];
            this.m14 = a[3];
            this.m21 = a[4];
            this.m22 = a[5];
            this.m23 = a[6];
            this.m24 = a[7];
            this.m31 = a[8];
            this.m32 = a[9];
            this.m33 = a[10];
            this.m34 = a[11];
            this.m41 = a[12];
            this.m42 = a[13];
            this.m43 = a[14];
            this.m44 = a[15];
            return
        }
        if (arguments[0] instanceof CanvasMatrix4) {
            this.m11 = a.m11;
            this.m12 = a.m12;
            this.m13 = a.m13;
            this.m14 = a.m14;
            this.m21 = a.m21;
            this.m22 =
                a.m22;
            this.m23 = a.m23;
            this.m24 = a.m24;
            this.m31 = a.m31;
            this.m32 = a.m32;
            this.m33 = a.m33;
            this.m34 = a.m34;
            this.m41 = a.m41;
            this.m42 = a.m42;
            this.m43 = a.m43;
            this.m44 = a.m44;
            return
        }
    }
    this.makeIdentity()
};
CanvasMatrix4.prototype.getAsArray = function() {
    return [this.m11, this.m12, this.m13, this.m14, this.m21, this.m22, this.m23, this.m24, this.m31, this.m32, this.m33, this.m34, this.m41, this.m42, this.m43, this.m44]
};
CanvasMatrix4.prototype.getAsWebGLFloatArray = function() {
    return new Float32Array(this.getAsArray())
};
CanvasMatrix4.prototype.makeIdentity = function() {
    this.m11 = 1;
    this.m21 = this.m14 = this.m13 = this.m12 = 0;
    this.m22 = 1;
    this.m32 = this.m31 = this.m24 = this.m23 = 0;
    this.m33 = 1;
    this.m43 = this.m42 = this.m41 = this.m34 = 0;
    this.m44 = 1
};
CanvasMatrix4.prototype.transpose = function() {
    var a = this.m12;
    this.m12 = this.m21;
    this.m21 = a;
    a = this.m13;
    this.m13 = this.m31;
    this.m31 = a;
    a = this.m14;
    this.m14 = this.m41;
    this.m41 = a;
    a = this.m23;
    this.m23 = this.m32;
    this.m32 = a;
    a = this.m24;
    this.m24 = this.m42;
    this.m42 = a;
    a = this.m34;
    this.m34 = this.m43;
    this.m43 = a
};
CanvasMatrix4.prototype.invert = function() {
    var a = this._determinant4x4();
    if (1E-8 > Math.abs(a)) return !1;
    this._makeAdjoint();
    this.m11 /= a;
    this.m12 /= a;
    this.m13 /= a;
    this.m14 /= a;
    this.m21 /= a;
    this.m22 /= a;
    this.m23 /= a;
    this.m24 /= a;
    this.m31 /= a;
    this.m32 /= a;
    this.m33 /= a;
    this.m34 /= a;
    this.m41 /= a;
    this.m42 /= a;
    this.m43 /= a;
    this.m44 /= a;
    return !0
};
CanvasMatrix4.prototype.linearlyIndependant = function() {
    var a = this._determinant4x4();
    return 1E-8 > Math.abs(a) ? !1 : !0
};
CanvasMatrix4.prototype.xAxisCopy = function() {
    return new vec3(this.m11, this.m12, this.m13)
};
CanvasMatrix4.prototype.yAxisCopy = function() {
    return new vec3(this.m21, this.m22, this.m23)
};
CanvasMatrix4.prototype.zAxisCopy = function() {
    return new vec3(this.m31, this.m32, this.m33)
};
CanvasMatrix4.prototype.wAxisCopy = function() {
    return new vec3(this.m41, this.m42, this.m43)
};
CanvasMatrix4.prototype.setXAxis = function(a) {
    this.m11 = a.x;
    this.m12 = a.y;
    this.m13 = a.z
};
CanvasMatrix4.prototype.setYAxis = function(a) {
    this.m21 = a.x;
    this.m22 = a.y;
    this.m23 = a.z
};
CanvasMatrix4.prototype.setZAxis = function(a) {
    this.m31 = a.x;
    this.m32 = a.y;
    this.m33 = a.z
};
CanvasMatrix4.prototype.setWAxis = function(a) {
    this.m41 = a.x;
    this.m42 = a.y;
    this.m43 = a.z
};
CanvasMatrix4.prototype.translate = function(a, f, g) {
    void 0 == a && (a = 0);
    void 0 == f && (f = 0);
    void 0 == g && (g = 0);
    var h = new CanvasMatrix4;
    h.m41 = a;
    h.m42 = f;
    h.m43 = g;
    this.multRight(h)
};
CanvasMatrix4.prototype.scale = function(a, f, g) {
    void 0 == a && (a = 1);
    void 0 == g ? g = void 0 == f ? f = a : 1 : void 0 == f && (f = a);
    var h = new CanvasMatrix4;
    h.m11 = a;
    h.m22 = f;
    h.m33 = g;
    this.multRight(h)
};
CanvasMatrix4.prototype.rotate = function(a, f, g, h) {
    a = a / 180 * Math.PI;
    a /= 2;
    var k = Math.sin(a);
    a = Math.cos(a);
    var n = k * k,
        l = Math.sqrt(f * f + g * g + h * h);
    0 == l ? (g = f = 0, h = 1) : 1 != l && (f /= l, g /= l, h /= l);
    l = new CanvasMatrix4;
    if (1 == f && 0 == g && 0 == h) l.m11 = 1, l.m12 = 0, l.m13 = 0, l.m21 = 0, l.m22 = 1 - 2 * n, l.m23 = 2 * k * a, l.m31 = 0, l.m32 = -2 * k * a, l.m33 = 1 - 2 * n;
    else if (0 == f && 1 == g && 0 == h) l.m11 = 1 - 2 * n, l.m12 = 0, l.m13 = -2 * k * a, l.m21 = 0, l.m22 = 1, l.m23 = 0, l.m31 = 2 * k * a, l.m32 = 0, l.m33 = 1 - 2 * n;
    else if (0 == f && 0 == g && 1 == h) l.m11 = 1 - 2 * n, l.m12 = 2 * k * a, l.m13 = 0, l.m21 = -2 * k * a, l.m22 = 1 - 2 * n,
        l.m23 = 0, l.m31 = 0, l.m32 = 0, l.m33 = 1;
    else {
        var t = f * f,
            p = g * g,
            q = h * h;
        l.m11 = 1 - 2 * (p + q) * n;
        l.m12 = 2 * (f * g * n + h * k * a);
        l.m13 = 2 * (f * h * n - g * k * a);
        l.m21 = 2 * (g * f * n - h * k * a);
        l.m22 = 1 - 2 * (q + t) * n;
        l.m23 = 2 * (g * h * n + f * k * a);
        l.m31 = 2 * (h * f * n + g * k * a);
        l.m32 = 2 * (h * g * n - f * k * a);
        l.m33 = 1 - 2 * (t + p) * n
    }
    l.m14 = l.m24 = l.m34 = 0;
    l.m41 = l.m42 = l.m43 = 0;
    l.m44 = 1;
    this.multRight(l)
};
CanvasMatrix4.prototype.makeRotationX = function(a) {
    var f = Math.sin(a);
    a = Math.cos(a);
    this.m11 = 1;
    this.m12 = this.m41 = this.m31 = this.m21 = 0;
    this.m22 = a;
    this.m32 = f;
    this.m13 = this.m42 = 0;
    this.m23 = -f;
    this.m33 = a;
    this.m34 = this.m24 = this.m14 = this.m43 = 0;
    this.m44 = 1
};
CanvasMatrix4.prototype.makeRotationY = function(a) {
    new CanvasMatrix4;
    var f = Math.sin(a);
    this.m11 = a = Math.cos(a);
    this.m21 = 0;
    this.m31 = -f;
    this.m12 = this.m41 = 0;
    this.m22 = 1;
    this.m42 = this.m32 = 0;
    this.m13 = f;
    this.m23 = 0;
    this.m33 = a;
    this.m34 = this.m24 = this.m14 = this.m43 = 0;
    this.m44 = 1
};
CanvasMatrix4.prototype.makeRotationZ = function(a) {
    new CanvasMatrix4;
    var f = Math.sin(a);
    this.m11 = a = Math.cos(a);
    this.m21 = f;
    this.m41 = this.m31 = 0;
    this.m12 = -f;
    this.m22 = a;
    this.m23 = this.m13 = this.m42 = this.m32 = 0;
    this.m33 = 1;
    this.m34 = this.m24 = this.m14 = this.m43 = 0;
    this.m44 = 1
};
CanvasMatrix4.prototype.multRight = function(a) {
    var f = this.m11 * a.m12 + this.m12 * a.m22 + this.m13 * a.m32 + this.m14 * a.m42,
        g = this.m11 * a.m13 + this.m12 * a.m23 + this.m13 * a.m33 + this.m14 * a.m43,
        h = this.m11 * a.m14 + this.m12 * a.m24 + this.m13 * a.m34 + this.m14 * a.m44,
        k = this.m21 * a.m11 + this.m22 * a.m21 + this.m23 * a.m31 + this.m24 * a.m41,
        n = this.m21 * a.m12 + this.m22 * a.m22 + this.m23 * a.m32 + this.m24 * a.m42,
        l = this.m21 * a.m13 + this.m22 * a.m23 + this.m23 * a.m33 + this.m24 * a.m43,
        t = this.m21 * a.m14 + this.m22 * a.m24 + this.m23 * a.m34 + this.m24 * a.m44,
        p = this.m31 * a.m11 +
        this.m32 * a.m21 + this.m33 * a.m31 + this.m34 * a.m41,
        q = this.m31 * a.m12 + this.m32 * a.m22 + this.m33 * a.m32 + this.m34 * a.m42,
        r = this.m31 * a.m13 + this.m32 * a.m23 + this.m33 * a.m33 + this.m34 * a.m43,
        u = this.m31 * a.m14 + this.m32 * a.m24 + this.m33 * a.m34 + this.m34 * a.m44,
        x = this.m41 * a.m11 + this.m42 * a.m21 + this.m43 * a.m31 + this.m44 * a.m41,
        v = this.m41 * a.m12 + this.m42 * a.m22 + this.m43 * a.m32 + this.m44 * a.m42,
        y = this.m41 * a.m13 + this.m42 * a.m23 + this.m43 * a.m33 + this.m44 * a.m43,
        w = this.m41 * a.m14 + this.m42 * a.m24 + this.m43 * a.m34 + this.m44 * a.m44;
    this.m11 = this.m11 * a.m11 +
        this.m12 * a.m21 + this.m13 * a.m31 + this.m14 * a.m41;
    this.m12 = f;
    this.m13 = g;
    this.m14 = h;
    this.m21 = k;
    this.m22 = n;
    this.m23 = l;
    this.m24 = t;
    this.m31 = p;
    this.m32 = q;
    this.m33 = r;
    this.m34 = u;
    this.m41 = x;
    this.m42 = v;
    this.m43 = y;
    this.m44 = w
};
CanvasMatrix4.prototype.multLeft = function(a) {
    var f = a.m11 * this.m12 + a.m12 * this.m22 + a.m13 * this.m32 + a.m14 * this.m42,
        g = a.m11 * this.m13 + a.m12 * this.m23 + a.m13 * this.m33 + a.m14 * this.m43,
        h = a.m11 * this.m14 + a.m12 * this.m24 + a.m13 * this.m34 + a.m14 * this.m44,
        k = a.m21 * this.m11 + a.m22 * this.m21 + a.m23 * this.m31 + a.m24 * this.m41,
        n = a.m21 * this.m12 + a.m22 * this.m22 + a.m23 * this.m32 + a.m24 * this.m42,
        l = a.m21 * this.m13 + a.m22 * this.m23 + a.m23 * this.m33 + a.m24 * this.m43,
        t = a.m21 * this.m14 + a.m22 * this.m24 + a.m23 * this.m34 + a.m24 * this.m44,
        p = a.m31 * this.m11 + a.m32 *
        this.m21 + a.m33 * this.m31 + a.m34 * this.m41,
        q = a.m31 * this.m12 + a.m32 * this.m22 + a.m33 * this.m32 + a.m34 * this.m42,
        r = a.m31 * this.m13 + a.m32 * this.m23 + a.m33 * this.m33 + a.m34 * this.m43,
        u = a.m31 * this.m14 + a.m32 * this.m24 + a.m33 * this.m34 + a.m34 * this.m44,
        x = a.m41 * this.m11 + a.m42 * this.m21 + a.m43 * this.m31 + a.m44 * this.m41,
        v = a.m41 * this.m12 + a.m42 * this.m22 + a.m43 * this.m32 + a.m44 * this.m42,
        y = a.m41 * this.m13 + a.m42 * this.m23 + a.m43 * this.m33 + a.m44 * this.m43,
        w = a.m41 * this.m14 + a.m42 * this.m24 + a.m43 * this.m34 + a.m44 * this.m44;
    this.m11 = a.m11 * this.m11 + a.m12 *
        this.m21 + a.m13 * this.m31 + a.m14 * this.m41;
    this.m12 = f;
    this.m13 = g;
    this.m14 = h;
    this.m21 = k;
    this.m22 = n;
    this.m23 = l;
    this.m24 = t;
    this.m31 = p;
    this.m32 = q;
    this.m33 = r;
    this.m34 = u;
    this.m41 = x;
    this.m42 = v;
    this.m43 = y;
    this.m44 = w
};
CanvasMatrix4.prototype.ortho = function(a, f, g, h, k, n) {
    var l = (a + f) / (a - f),
        t = (h + g) / (h - g),
        p = (n + k) / (n - k),
        q = new CanvasMatrix4;
    q.m11 = 2 / (a - f);
    q.m12 = 0;
    q.m13 = 0;
    q.m14 = 0;
    q.m21 = 0;
    q.m22 = 2 / (h - g);
    q.m23 = 0;
    q.m24 = 0;
    q.m31 = 0;
    q.m32 = 0;
    q.m33 = -2 / (n - k);
    q.m34 = 0;
    q.m41 = l;
    q.m42 = t;
    q.m43 = p;
    q.m44 = 1;
    this.multRight(q)
};
CanvasMatrix4.prototype.frustum = function(a, f, g, h, k, n) {
    var l = new CanvasMatrix4;
    l.m11 = 2 * k / (f - a);
    l.m12 = 0;
    l.m13 = 0;
    l.m14 = 0;
    l.m21 = 0;
    l.m22 = 2 * k / (h - g);
    l.m23 = 0;
    l.m24 = 0;
    l.m31 = (f + a) / (f - a);
    l.m32 = (h + g) / (h - g);
    l.m33 = -(n + k) / (n - k);
    l.m34 = -1;
    l.m41 = 0;
    l.m42 = 0;
    l.m43 = -(2 * n * k) / (n - k);
    l.m44 = 0;
    this.multRight(l)
};
CanvasMatrix4.prototype.perspective = function(a, f, g, h) {
    a = Math.tan(a * Math.PI / 360) * g;
    var k = -a;
    this.frustum(f * k, f * a, k, a, g, h)
};
CanvasMatrix4.prototype.veclookat = function(a, f, g) {
    this.lookat(a.x, a.y, a.z, f.x, f.y, f.z, g.x, g.y, g.z)
};
CanvasMatrix4.prototype.lookat = function(a, f, g, h, k, n, l, t, p) {
    var q = new CanvasMatrix4;
    h = a - h;
    k = f - k;
    n = g - n;
    var r = Math.sqrt(h * h + k * k + n * n);
    r && (h /= r, k /= r, n /= r);
    xx = t * n - p * k;
    xy = -l * n + p * h;
    xz = l * k - t * h;
    t = -h * xz + n * xx;
    l = h * xy - k * xx;
    if (r = Math.sqrt(xx * xx + xy * xy + xz * xz)) xx /= r, xy /= r, xz /= r;
    if (r = Math.sqrt(l * l + t * t + p * p)) l /= r, t /= r, p /= r;
    q.m11 = xx;
    q.m12 = xy;
    q.m13 = xz;
    q.m14 = 0;
    q.m21 = l;
    q.m22 = t;
    q.m23 = p;
    q.m24 = 0;
    q.m31 = h;
    q.m32 = k;
    q.m33 = n;
    q.m34 = 0;
    q.m41 = 0;
    q.m42 = 0;
    q.m43 = 0;
    q.m44 = 1;
    q.translate(-a, -f, -g);
    this.multRight(q)
};
CanvasMatrix4.prototype._determinant2x2 = function(a, f, g, h) {
    return a * h - f * g
};
CanvasMatrix4.prototype._determinant3x3 = function(a, f, g, h, k, n, l, t, p) {
    return a * this._determinant2x2(k, n, t, p) - h * this._determinant2x2(f, g, t, p) + l * this._determinant2x2(f, g, k, n)
};
CanvasMatrix4.prototype._determinant4x4 = function() {
    var a = this.m12,
        f = this.m13,
        g = this.m14,
        h = this.m21,
        k = this.m22,
        n = this.m23,
        l = this.m24,
        t = this.m31,
        p = this.m32,
        q = this.m33,
        r = this.m34,
        u = this.m41,
        x = this.m42,
        v = this.m43,
        y = this.m44;
    return this.m11 * this._determinant3x3(k, p, x, n, q, v, l, r, y) - a * this._determinant3x3(h, t, u, n, q, v, l, r, y) + f * this._determinant3x3(h, t, u, k, p, x, l, r, y) - g * this._determinant3x3(h, t, u, k, p, x, n, q, v)
};
CanvasMatrix4.prototype._makeAdjoint = function() {
    var a = this.m11,
        f = this.m12,
        g = this.m13,
        h = this.m14,
        k = this.m21,
        n = this.m22,
        l = this.m23,
        t = this.m24,
        p = this.m31,
        q = this.m32,
        r = this.m33,
        u = this.m34,
        x = this.m41,
        v = this.m42,
        y = this.m43,
        w = this.m44;
    this.m11 = this._determinant3x3(n, q, v, l, r, y, t, u, w);
    this.m21 = -this._determinant3x3(k, p, x, l, r, y, t, u, w);
    this.m31 = this._determinant3x3(k, p, x, n, q, v, t, u, w);
    this.m41 = -this._determinant3x3(k, p, x, n, q, v, l, r, y);
    this.m12 = -this._determinant3x3(f, q, v, g, r, y, h, u, w);
    this.m22 = this._determinant3x3(a,
        p, x, g, r, y, h, u, w);
    this.m32 = -this._determinant3x3(a, p, x, f, q, v, h, u, w);
    this.m42 = this._determinant3x3(a, p, x, f, q, v, g, r, y);
    this.m13 = this._determinant3x3(f, n, v, g, l, y, h, t, w);
    this.m23 = -this._determinant3x3(a, k, x, g, l, y, h, t, w);
    this.m33 = this._determinant3x3(a, k, x, f, n, v, h, t, w);
    this.m43 = -this._determinant3x3(a, k, x, f, n, v, g, l, y);
    this.m14 = -this._determinant3x3(f, n, q, g, l, r, h, t, u);
    this.m24 = this._determinant3x3(a, k, p, g, l, r, h, t, u);
    this.m34 = -this._determinant3x3(a, k, p, f, n, q, h, t, u);
    this.m44 = this._determinant3x3(a, k, p, f,
        n, q, g, l, r)
};
CanvasMatrix4.prototype.vectorMultLeft = function(a) {
    out = new vec4(0, 0, 0, 0);
    out.x = a.x * this.m11 + a.y * this.m21 + a.z * this.m31 + a.w * this.m41;
    out.y = a.x * this.m12 + a.y * this.m22 + a.z * this.m32 + a.w * this.m42;
    out.z = a.x * this.m13 + a.y * this.m23 + a.z * this.m33 + a.w * this.m43;
    out.w = a.x * this.m14 + a.y * this.m24 + a.z * this.m34 + a.w * this.m44;
    return out
};
CanvasMatrix4.prototype.vectorMultRight = function(a) {
    out = new vec4(0, 0, 0, 0);
    out.x = a.x * this.m11 + a.y * this.m12 + a.z * this.m13 + a.w * this.m14;
    out.y = a.x * this.m21 + a.y * this.m22 + a.z * this.m23 + a.w * this.m24;
    out.z = a.x * this.m31 + a.y * this.m32 + a.z * this.m33 + a.w * this.m34;
    out.w = a.x * this.m41 + a.y * this.m42 + a.z * this.m43 + a.w * this.m44;
    return out
};

function createRotationX(a) {
    var f = new CanvasMatrix4,
        g = Math.sin(a);
    a = Math.cos(a);
    f.m11 = 1;
    f.m21 = 0;
    f.m31 = 0;
    f.m41 = 0;
    f.m12 = 0;
    f.m22 = a;
    f.m32 = g;
    f.m42 = 0;
    f.m13 = 0;
    f.m23 = -g;
    f.m33 = a;
    f.m43 = 0;
    f.m14 = 0;
    f.m24 = 0;
    f.m34 = 0;
    f.m44 = 1;
    return f
}

function createRotationY(a) {
    var f = new CanvasMatrix4,
        g = Math.sin(a);
    a = Math.cos(a);
    f.m11 = a;
    f.m21 = 0;
    f.m31 = -g;
    f.m41 = 0;
    f.m12 = 0;
    f.m22 = 1;
    f.m32 = 0;
    f.m42 = 0;
    f.m13 = g;
    f.m23 = 0;
    f.m33 = a;
    f.m43 = 0;
    f.m14 = 0;
    f.m24 = 0;
    f.m34 = 0;
    f.m44 = 1;
    return f
}

function createRotationZ(a) {
    var f = new CanvasMatrix4,
        g = Math.sin(a);
    a = Math.cos(a);
    f.m11 = a;
    f.m21 = g;
    f.m31 = 0;
    f.m41 = 0;
    f.m12 = -g;
    f.m22 = a;
    f.m32 = 0;
    f.m42 = 0;
    f.m13 = 0;
    f.m23 = 0;
    f.m33 = 1;
    f.m43 = 0;
    f.m14 = 0;
    f.m24 = 0;
    f.m34 = 0;
    f.m44 = 1;
    return f
};

function makeBox(a) {
    var f = new Float32Array([1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, 1, 1, 1, -1, -1, 1, -1, -1, 1, 1, -1, 1, 1, -1, 1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, 1, -1, -1, 1, -1, 1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, 1, -1, 1, 1, -1]),
        g = new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1]),
        h = new Float32Array([1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0,
            1, 0, 0, 1, 0, 1, 1, 0, 1
        ]),
        k = new Uint8Array([0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23]),
        n = {};
    n.normalObject = a.createBuffer();
    a.bindBuffer(a.ARRAY_BUFFER, n.normalObject);
    a.bufferData(a.ARRAY_BUFFER, g, a.STATIC_DRAW);
    n.texCoordObject = a.createBuffer();
    a.bindBuffer(a.ARRAY_BUFFER, n.texCoordObject);
    a.bufferData(a.ARRAY_BUFFER, h, a.STATIC_DRAW);
    n.vertexObject = a.createBuffer();
    a.bindBuffer(a.ARRAY_BUFFER, n.vertexObject);
    a.bufferData(a.ARRAY_BUFFER, f, a.STATIC_DRAW);
    a.bindBuffer(a.ARRAY_BUFFER, null);
    n.indexObject = a.createBuffer();
    a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, n.indexObject);
    a.bufferData(a.ELEMENT_ARRAY_BUFFER, k, a.STATIC_DRAW);
    a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, null);
    n.numIndices = k.length;
    return n
}

function makeSphere(a, f, g, h) {
    for (var k = [], n = [], l = [], t = [], p = 0; p <= g; ++p)
        for (var q = 0; q <= h; ++q) {
            var r = p * Math.PI / g,
                u = 2 * q * Math.PI / h,
                x = Math.sin(r),
                v = Math.cos(u) * x;
            r = Math.cos(r);
            u = Math.sin(u) * x;
            x = 1 - q / h;
            var y = p / g;
            n.push(v);
            n.push(r);
            n.push(u);
            l.push(x);
            l.push(y);
            k.push(f * v);
            k.push(f * r);
            k.push(f * u)
        }
    for (p = 0; p < g; ++p)
        for (q = 0; q < h; ++q) f = p * (h + 1) + q, v = f + h + 1, t.push(f), t.push(v), t.push(f + 1), t.push(v), t.push(v + 1), t.push(f + 1);
    g = {};
    g.normalObject = a.createBuffer();
    a.bindBuffer(a.ARRAY_BUFFER, g.normalObject);
    a.bufferData(a.ARRAY_BUFFER,
        new Float32Array(n), a.STATIC_DRAW);
    g.texCoordObject = a.createBuffer();
    a.bindBuffer(a.ARRAY_BUFFER, g.texCoordObject);
    a.bufferData(a.ARRAY_BUFFER, new Float32Array(l), a.STATIC_DRAW);
    g.vertexObject = a.createBuffer();
    a.bindBuffer(a.ARRAY_BUFFER, g.vertexObject);
    a.bufferData(a.ARRAY_BUFFER, new Float32Array(k), a.STATIC_DRAW);
    g.numIndices = t.length;
    g.indexObject = a.createBuffer();
    a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, g.indexObject);
    a.bufferData(a.ELEMENT_ARRAY_BUFFER, new Uint16Array(t), a.STREAM_DRAW);
    return g
}

function loadImageTexture(a, f) {
    var g = a.createTexture();
    g.image = new Image;
    g.image.onload = function() {
        doLoadImageTexture(a, g.image, g)
    };
    g.image.src = f;
    return g
}

function doLoadImageTexture(a, f, g) {
    a.bindTexture(a.TEXTURE_2D, g);
    a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, !0);
    a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, a.RGBA, a.UNSIGNED_BYTE, f);
    0 == a.getError() && (a.generateMipmap(a.TEXTURE_2D), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.LINEAR), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.LINEAR_MIPMAP_LINEAR), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE));
    a.bindTexture(a.TEXTURE_2D,
        null)
}
Framerate = function(a) {
    this.numFramerates = 10;
    this.framerateUpdateInterval = 500;
    this.id = a;
    this.renderTime = -1;
    this.framerates = [];
    self = this
};
Framerate.prototype.updateFramerate = function() {
    for (var a = 0, f = 0; f < this.framerates.length; ++f) a += this.framerates[f];
    a /= this.framerates.length;
    a = Math.round(a);
    document.getElementById(this.id).innerHTML = "<h4>FPS: " + a + "</h4>"
};
Framerate.prototype.snapshot = function() {
    if (0 > this.renderTime) this.renderTime = (new Date).getTime();
    else {
        var a = (new Date).getTime();
        for (this.framerates.push(1E3 / (a - this.renderTime)); this.framerates.length > this.numFramerates;) this.framerates.shift();
        this.renderTime = a
    }
};

function vec3(a, f, g) {
    this.x = a;
    this.y = f;
    this.z = g
}
vec3.prototype.scale = function(a) {
    this.x *= a;
    this.y *= a;
    this.z *= a
};
vec3.prototype.getAsArray = function() {
    return [this.x, this.y, this.z]
};
vec3.prototype.getAsWebGLFloatArray = function() {
    return new Float32Array(this.getAsArray())
};
vec3.prototype.length = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
};
vec3.prototype.lengthSqrd = function() {
    return dotVec3(this, this)
};
vec3.prototype.normalize = function() {
    length = this.length();
    0 == length ? (this.y = this.x = 0, this.z = 1) : 1 != length && (this.x /= length, this.y /= length, this.z /= length)
};
vec3.prototype.normalized = function() {
    length = this.length();
    var a = new vec3(0, 0, 0);
    0 == length ? a = lookVec() : (a.x = this.x / length, a.y = this.y / length, a.z = this.z / length);
    return a
};
vec3.prototype.negate = function() {
    this.x *= -1;
    this.y *= -1;
    this.z *= -1
};
vec3.prototype.setvec = function(a) {
    this.x = a.x;
    this.y = a.y;
    this.z = a.z
};
vec3.prototype.toString = function() {
    return "(" + this.x + "," + this.y + "," + this.z + ")"
};

function addVec3(a, f) {
    return new vec3(a.x + f.x, a.y + f.y, a.z + f.z)
}

function subVec3(a, f) {
    return new vec3(a.x - f.x, a.y - f.y, a.z - f.z)
}

function dotVec3(a, f) {
    return a.x * f.x + a.y * f.y + a.z * f.z
}

function crossVec3(a, f) {
    return new vec3(a.y * f.z - f.y * a.z, -(a.x * f.z - f.x * a.z), a.x * f.y - f.x * a.y)
}

function lerpVec3(a, f, g) {
    f = subVec3(f, a);
    f.scale(g);
    return addVec3(a, f)
}

function negateVec3(a) {
    var f = new vec3(a.x, a.y, a.z);
    f.x = -1 * a.x;
    f.y = -1 * a.y;
    f.z = -1 * a.z;
    return f
}

function scaleVec3(a, f) {
    a = new vec3(a.x, a.y, a.z);
    a.x *= f;
    a.y *= f;
    a.z *= f;
    return a
}

function zeroVec() {
    return new vec3(0, 0, 0)
}

function rightVec() {
    return new vec3(1, 0, 0)
}

function upVec() {
    return new vec3(0, 1, 0)
}

function lookVec() {
    return new vec3(0, 0, 1)
};

function vec2(a, f) {
    this.x = a;
    this.y = f
}
vec2.prototype.scale = function(a) {
    this.x *= a;
    this.y *= a
};
vec2.prototype.lerp = function(a, f, g) {
    b = subVec2(vecB, a);
    b.scale(g);
    return add(a, b)
};
vec2.prototype.addVec2 = function(a, f) {
    return new Vector2(a.x + f.x, a.y + f.y)
};
vec2.prototype.subVec2 = function(a, f) {
    return new Vector2(a.x - f.x, a.y - f.y)
};
vec2.prototype.zeroVec2 = function() {
    return new vec2(0, 0)
};
vec2.prototype.rightVec2 = function() {
    return new vec2(1, 0)
};
vec2.prototype.upVec2 = function() {
    return new vec2(0, 1)
};

function vec4(a, f, g, h) {
    this.x = a;
    this.y = f;
    this.z = g;
    this.w = h
}
vec4.prototype.getAsArray = function() {
    return [this.x, this.y, this.z, this.w]
};
vec4.prototype.getAsWebGLFloatArray = function() {
    return new Float32Array(this.getAsArray())
};
vec4.prototype.toString = function() {
    return "(" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + ")"
};
vec4.prototype.toURLString = function() {
    var a = (10 * this.x).toFixed(2),
        f = (10 * this.y).toFixed(2),
        g = (10 * this.z).toFixed(2),
        h = (10 * this.w).toFixed(2);
    return a + "," + f + "," + g + "," + h
};
vec4.prototype.setvec = function(a) {
    this.x = a.x;
    this.y = a.y;
    this.z = a.z;
    this.w = a.w
};

function camera() {
    this.view = new CanvasMatrix4;
    this.world = new CanvasMatrix4;
    this.oldWorld = new CanvasMatrix4;
    this.orbitMatrix = new CanvasMatrix4;
    this.position = new vec3(0, 0, 0);
    this.look = new vec3(0, 0, 0);
    this.sticker = new CanvasMatrix4;
    this.orbiting = this.zoomed = !1;
    this.orbitingVec = new vec2(0, 0);
    this.inertialVec = new vec2(0, 0);
    this.stickers = [];
    this.stickersPos = [];
    this.stickersLookAt = [];
    this.stickerTexture = [];
    this.partZoom = 1;
    this.clearstickers()
}
camera.prototype.reset = function() {
    this.view = new CanvasMatrix4;
    this.world = new CanvasMatrix4;
    this.oldWorld = new CanvasMatrix4;
    this.orbitMatrix = new CanvasMatrix4;
    this.position = new vec3(0, 0, 0);
    this.look = new vec3(0, 0, 0);
    this.orbiting = this.zoomed = !1;
    this.setLookAt(new vec3(0, 0, 10), zeroVec(), upVec())
};
camera.prototype.clearstickers = function() {
    for (var a = 0; 9 > a; a++) this.stickers[a] = new CanvasMatrix4, this.stickersPos[a] = new vec3(0, 0, 0), this.stickersLookAt[a] = new vec3(0, 0, 0), this.stickerTexture[a] = g_alphaTex;
    this.currentSticker = 0
};
camera.prototype.copy = function(a) {
    this.view.load(a.view);
    this.world.load(a.world);
    this.oldWorld.load(a.oldWorld);
    this.orbitMatrix.load(a.orbitMatrix);
    this.position.setvec(a.position);
    this.look.setvec(a.look);
    this.sticker.load(a.sticker);
    this.zoomed = a.zoomed;
    for (var f = 0; 9 > f; f++) this.stickers[f].load(a.stickers[f]), this.stickers[f].curScale = 1, this.stickersPos[f].setvec(a.stickersPos[f]), this.stickersLookAt[f].setvec(a.stickersPos[f]), this.stickerTexture[f] = a.stickerTexture[f];
    this.currentSticker = a.currentSticker;
    this.orbiting = !1;
    this.partZoom = a.partZoom;
    this.updateStickerCounter()
};
camera.prototype.updateView = function() {
    this.position.x = this.world.m41;
    this.position.y = this.world.m42;
    this.position.z = this.world.m43;
    this.look.x = this.world.m31;
    this.look.y = this.world.m32;
    this.look.z = this.world.m33;
    tempM = new CanvasMatrix4(this.world);
    tempM.m31 *= -1;
    tempM.m32 *= -1;
    tempM.m33 *= -1;
    tempM.m11 *= -1;
    tempM.m12 *= -1;
    tempM.m13 *= -1;
    this.view.load(tempM);
    this.view.m41 = 0;
    this.view.m42 = 0;
    this.view.m43 = 0;
    this.view.transpose();
    this.view.m41 = -dotVec3(new vec3(tempM.m11, tempM.m12, tempM.m13), new vec3(tempM.m41,
        tempM.m42, tempM.m43));
    this.view.m42 = -dotVec3(new vec3(tempM.m21, tempM.m22, tempM.m23), new vec3(tempM.m41, tempM.m42, tempM.m43));
    this.view.m43 = -dotVec3(new vec3(tempM.m31, tempM.m32, tempM.m33), new vec3(tempM.m41, tempM.m42, tempM.m43))
};
camera.prototype.setLookAt = function(a, f, g) {
    a = new vec3(a.x, a.y, a.z);
    f = subVec3(f, a);
    f.normalize();
    g = crossVec3(g, f);
    g.normalize();
    var h = crossVec3(f, g);
    h.normalize();
    this.world.set(g, h, f, a);
    this.updateView()
};
camera.prototype.pitch = function(a) {
    a = createRotationX(a);
    this.world.multLeft(a);
    this.updateView()
};
camera.prototype.yaw = function(a) {
    a = createRotationY(a);
    this.world.multLeft(a);
    this.updateView()
};
camera.prototype.roll = function(a) {
    a = createRotationZ(a);
    this.world.multLeft(a);
    this.updateView()
};
camera.prototype.translateOnZ = function(a) {
    a = scaleVec3(this.world.zAxisCopy(), a);
    this.world.translate(a.x, a.y, a.z);
    this.updateView()
};
camera.prototype.translateOnX = function(a) {
    a = scaleVec3(this.world.xAxisCopy(), a);
    this.world.translate(a.x, a.y, a.z);
    this.updateView()
};
camera.prototype.translateOnY = function(a) {
    a = scaleVec3(this.world.yAxisCopy(), a);
    this.world.translate(a.x, a.y, a.z);
    this.updateView()
};
camera.prototype.zoom = function() {
    if (this.zoomed || g_collMan.BV.length)(this.zoomed = !this.zoomed) ? (boxMin = g_collMan.BV[0].min, boxMax = g_collMan.BV[0].max, boxCenter = addVec3(boxMin, boxMax), boxCenter.scale(.5), bW = Math.abs(boxMax.x - boxMin.x), bH = Math.abs(boxMax.y - boxMin.y), bD = Math.abs(boxMax.z - boxMin.z), radius = bW > bH ? bW > bD ? bW : bD : bH > bD ? bH : bD, curPos = this.world.wAxisCopy(), zoomVec = subVec3(boxCenter, curPos), zoomVec.normalize(), zoomVec.scale(2 * radius), targetPos = subVec3(boxCenter, zoomVec), this.oldWorld.load(this.world),
        this.setLookAt(targetPos, boxCenter, this.world.yAxisCopy()), this.partZoom = 2 * radius / 10) : (this.world.load(this.oldWorld), this.updateView(), this.partZoom = 1)
};
camera.prototype.mouseLook = function(a) {
    mousePos = getCursorPos();
    mouseDiff = new vec2(0, 0);
    lastMousePos.x == mousePos.x && lastMousePos.y == mousePos.y ? (this.orbiting && (this.inertialVec.x = mousePos.x - this.inertialVec.x, this.inertialVec.y = mousePos.y - this.inertialVec.y), this.orbiting = !1, this.inertialVec.x *= .8, this.inertialVec.y *= .8, mouseDiff.x = this.inertialVec.x, mouseDiff.y = this.inertialVec.y, this.orbitMatrix.load(this.world)) : (this.orbiting || (this.orbiting = !0, this.orbitingVec.x = mousePos.x, this.orbitingVec.y =
        mousePos.y, this.orbitMatrix.load(this.world)), mouseDiff = new vec2(mousePos.x - this.orbitingVec.x, mousePos.y - this.orbitingVec.y), this.inertialVec.x = mousePos.x, this.inertialVec.y = mousePos.y);
    a = 512;
    var f = document.getElementById("canvas");
    f && (a = f.width);
    mouseDiff.scale(3.142 / 180);
    mouseDiff.scale(180 / a);
    mouseDiffDisplay = new vec2(180 * mouseDiff.x, 180 * mouseDiff.y);
    this.world.load(this.orbitMatrix);
    a = this.world.yAxisCopy();
    f = this.world.xAxisCopy();
    this.world.rotate(180 * mouseDiff.y / 3.142, f.x, f.y, f.z);
    this.world.rotate(180 *
        -mouseDiff.x / 3.142, a.x, a.y, a.z);
    this.world.setXAxis(this.world.xAxisCopy().normalized());
    this.world.setYAxis(this.world.yAxisCopy().normalized());
    this.world.setZAxis(this.world.zAxisCopy().normalized());
    this.updateView();
    stickerPos = getStickerPos();
    a = 1 / getStickerZoom() * 2;
    f = new vec3;
    var g = new CanvasMatrix4;
    g.load(this.view);
    g.multLeft(gl.perspectiveMatrix);
    f.setvec(g.vectorMultLeft(new vec4(1.8, 0, 0, 0)));
    f = f.length();
    f = new vec4(-stickerPos.x * f, -stickerPos.y * f, 0, 0);
    f.x += .5 / a;
    f.y -= .5 / a;
    g = this.world.vectorMultLeft(f);
    1 != this.partZoom && (f.y += (this.world.m42 - this.oldWorld.m42) * this.partZoom, f.x += (this.world.m41 - this.oldWorld.m41) * this.partZoom);
    this.stickersPos[this.currentSticker].setvec(this.world.wAxisCopy());
    this.stickersLookAt[this.currentSticker].setvec(g);
    this.buildstickermatrix();
    this.sticker.scale(a);
    this.stickers[this.currentSticker].load(this.sticker);
    this.stickers[this.currentSticker].curScale = a
};
camera.prototype.nextSticker = function() {
    8 > this.currentSticker && this.stickerTexture[this.currentSticker] != g_alphaTex && (this.stickerTexture[this.currentSticker + 1] = this.stickerTexture[this.currentSticker], this.currentSticker++, zoomDirty = !0);
    this.updateStickerCounter()
};
camera.prototype.updateStickerCounter = function() {
    var a = 8 == this.currentSticker ? "<b>FULL</b>" : this.currentSticker + "/8";
    jQuery("numSticker#stickerCounter").html(a)
};
camera.prototype.undosticker = function() {
    this.stickerTexture[this.currentSticker] = g_alphaTex;
    0 < this.currentSticker && this.currentSticker--;
    jQuery("numSticker#stickerCounter").html(this.currentSticker + "/8")
};
camera.prototype.selecttexture = function(a) {
    this.stickerTexture[this.currentSticker] = a
};
camera.prototype.selecttextureindex = function(a) {
    var f = "StampDecal_";
    10 > arr[1] && (f += "0");
    this.selecttexture(g_texMan.getTextureByName(f + (a + "_DM.png")))
};
camera.prototype.clearselection = function() {
    this.stickerTexture[this.currentSticker] = g_alphaTex
};
camera.prototype.buildstickermatrix = function() {
    var a = new CanvasMatrix4,
        f = new CanvasMatrix4;
    a.load(this.world);
    f.load(this.view);
    var g = this.world.yAxisCopy();
    this.setLookAt(this.stickersPos[this.currentSticker], this.stickersLookAt[this.currentSticker], g);
    this.sticker.load(this.view);
    this.world.load(a);
    this.view.load(f)
};
camera.prototype.setstickurl = function(a) {
    a = a.split(",");
    var f = a[0];
    this.currentSticker = 0;
    for (var g = 1, h = 0; h < f; h++) {
        this.selecttexture(g_texMan.getTextureByName(a[g++]));
        this.stickersPos[this.currentSticker].x = a[g++] / 100;
        this.stickersPos[this.currentSticker].y = a[g++] / 100;
        this.stickersPos[this.currentSticker].z = a[g++] / 100;
        var k = a[g++] / 100;
        this.stickersLookAt[this.currentSticker].x = a[g++] / 100;
        this.stickersLookAt[this.currentSticker].y = a[g++] / 100;
        this.stickersLookAt[this.currentSticker].z = a[g++] / 100;
        this.buildstickermatrix();
        this.sticker.scale(k);
        this.stickers[this.currentSticker].load(this.sticker);
        this.stickers[this.currentSticker].curScale = k;
        this.currentSticker++
    }
};
camera.prototype.getstickurl = function() {
    var a = new String;
    a += this.currentSticker;
    for (var f = 0; f < this.currentSticker; f++) a += "," + this.stickerTexture[f].name, a += "," + (100 * this.stickersPos[f].x).toFixed(), a += "," + (100 * this.stickersPos[f].y).toFixed(), a += "," + (100 * this.stickersPos[f].z).toFixed(), a += "," + (100 * this.stickers[f].curScale).toFixed(), a += "," + (100 * this.stickersLookAt[f].x).toFixed(), a += "," + (100 * this.stickersLookAt[f].y).toFixed(), a += "," + (100 * this.stickersLookAt[f].z).toFixed();
    return a
};

function setRandTimer(a) {
    return setInterval(a + "()", randTimer())
}

function randTimer() {
    return 4E3 * Math.random() + 1E3
}

function getRandColor() {
    return new vec4(Math.random(), Math.random(), Math.random(), 1)
}
var lastTex = 0;

function getNextTexture(a) {
    texTable = void 0 != a ? g_texMan.getTextureSetNamesByLayerAndPart(a, getActivePartName()) : g_texMan.getTextureSetNames();
    a = lastTex++ % texTable.length;
    return texTable[a]
}
var lastShader = 0;

function getNextShader() {
    shaderTable = g_shaderMan.getShaderNames();
    var a = lastShader++ % shaderTable.length;
    return shaderTable[a]
}

function unProject(a, f, g, h, k, n) {
    h = new CanvasMatrix4(h);
    var l = [0, 0, 0, 0];
    h.multRight(k);
    if (!h.invert()) return null;
    l[0] = a;
    l[1] = f;
    l[2] = g;
    l[3] = 1;
    l[0] = (l[0] - n[0]) / n[2];
    l[1] = (l[1] - n[1]) / n[3];
    l[0] = 2 * l[0] - 1;
    l[1] = 2 * l[1] - 1;
    l[2] = 2 * l[2] - 1;
    a = h.vectorMultLeft(new vec4(l[0], l[1], l[2], l[3]));
    if (0 == a.w) return null;
    a.x /= a.w;
    a.y /= a.w;
    a.z /= a.w;
    return new vec3(a.x, a.y, a.z)
}

function AABB2LineSegment(a, f, g) {
    c = addVec3(a.min, a.max);
    c.scale(.5);
    e = subVec3(a.max, a.min);
    d = subVec3(g, f);
    m = addVec3(f, g);
    m = subVec3(m, a.min);
    m = subVec3(m, a.max);
    a = Math.abs(d.x);
    if (Math.abs(m.x) > e.x + a) return !1;
    f = Math.abs(d.y);
    if (Math.abs(m.y) > e.y + f) return !1;
    g = Math.abs(d.z);
    if (Math.abs(m.z) > e.z + g) return !1;
    a += 1.192092896E-7;
    f += 1.192092896E-7;
    g += 1.192092896E-7;
    if (Math.abs(m.y * d.z - m.z * d.y) > e.y * g + e.z * f || Math.abs(m.z * d.x - m.x * d.z) > e.x * g + e.z * a || Math.abs(m.x * d.y - m.y * d.x) > e.x * f + e.y * a) return !1;
    debug = 0;
    debug++;
    return !0
}
gLineBuffer = null;

function updateDrawLine(a, f) {
    g_lineShader && (gLineBuffer && gl.deleteBuffer(gLineBuffer), verts = [a.x, a.y, a.z, f.x, f.y, f.z], gLineBuffer = gl.createBuffer(), gl.bindBuffer(gl.ARRAY_BUFFER, gLineBuffer), gl.bufferData(gl.ARRAY_BUFFER, new WebGLFloatArray(verts), gl.STATIC_DRAW))
}

function drawLine(a) {
    g_lineShader && g_u_mvp && gLineBuffer && (gl.useProgram(g_lineShader), gl.uniformMatrix4fv(g_u_mvp, !1, a.getAsWebGLFloatArray()), gl.bindBuffer(gl.ARRAY_BUFFER, gLineBuffer), gl.vertexAttribPointer(0, 3, gl.FLOAT, !1, 0, 0), gl.enableVertexAttribArray(0), gl.drawArrays(gl.LINES, 0, 2), gl.useProgram(null))
}

function hitTest(a, f, g) {
    for (var h = null, k = null, n = 0; n < a.BVL.length; n++)
        if (AABB2LineSegment(a.BVL[n], f, g)) {
            var l = addVec3(a.BVL[n].min, a.BVL[n].max);
            l.scale(.5);
            l = dotVec3(g_cam.world.zAxisCopy(), l);
            if (l < h || null == h) h = l, k = a.BVL[n]
        } return k
}

function drawBVLColor(a, f, g, h, k) {
    renderProcLines(a.renderObj, f, g, h, k)
}

function drawBVL(a) {
    renderProcLines(a.renderObj, 1, 0, 0, 1)
}

function getScreenAlignedQuad() {
    var a = new Float32Array([-1, 1, 0, 1, 1, 0, -1, -1, 0, -1, -1, 0, 1, 1, 0, 1, -1, 0]),
        f = new Float32Array([0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0]),
        g = {};
    g.vertexObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, g.vertexObject);
    gl.bufferData(gl.ARRAY_BUFFER, a, gl.STATIC_DRAW);
    g.texCoordObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, g.texCoordObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(f), gl.STATIC_DRAW);
    return g
}

function initWebGL(a, f, g) {
    a = document.getElementById(a);
    var h;
    try {
        (h = a.getContext("experimental-webgl", !0, !0, !1, !0, !0)) || (h = a.getContext("webgl", !0, !0, !1, !0, !0)), h || (h = a.getContext("webkit-3d", !0, !0, !1, !0, !0)), h || (h = a.getContext("moz-webgl", !0, !0, !1, !0, !0))
    } catch (k) {}
    if (!h) return jQuery("#webGLerror").removeClass("hide"), null;
    h.console = "console" in window ? window.console : {
        log: function() {}
    };
    h.clearColor(f[0], f[1], f[2], f[3]);
    h.clearDepth(g);
    h.depthFunc(h.LESS);
    h.enable(h.DEPTH_TEST);
    return h
}

function loadShader(a, f, g) {
    var h = a.createShader(f);
    if (null == h) return null;
    a.shaderSource(h, g);
    a.compileShader(h);
    return a.getShaderParameter(h, a.COMPILE_STATUS) ? h : (g = a.getShaderInfoLog(h), a.console.log("*** Error compiling shader '" + f + "':" + g), a.deleteShader(h), null)
}

function createShader(a, f, g, h) {
    gl.useProgram(null);
    f = loadShader(a, gl.VERTEX_SHADER, f);
    g = loadShader(a, gl.FRAGMENT_SHADER, g);
    if (!f || !g) return null;
    var k = a.createProgram();
    if (!k) return null;
    a.attachShader(k, f);
    a.attachShader(k, g);
    for (var n in h) a.bindAttribLocation(k, n, h[n]);
    a.linkProgram(k);
    return a.getProgramParameter(k, a.LINK_STATUS) ? k : (h = a.getProgramInfoLog(k), a.console.log("Error in program linking:" + h), a.deleteProgram(k), a.deleteProgram(g), a.deleteProgram(f), null)
}

function getSelectedPrimSet() {
    return g_collMan.BV.length ? [g_collMan.BV[0].primSetRef] : null
}

function setSelectedPrimSet(a) {
    model = getActiveModel();
    null != model && (g_collMan.BV = [], 0 > a || (a > model.mesh.primSets.length && (a = model.mesh.primSets.length - 1), g_collMan.BV.push(model.mesh.BVL[a])))
}

function setActiveLayer(a) {
    g_activeLayer = a
}

function getActiveLayer(a) {
    return g_activeLayer
}

function getActivePartName() {
    switch (g_IntentText[g_IntentSelected]) {
        case "Hair":
            return "Head";
        case "Face":
            return "Head";
        case "Body":
            return "Body";
        case "Legs":
            return "Body";
        default:
            gl.console.log("ERROR: cannot determine the active part")
    }
}

function getTexSlotByPartName() {
    switch (g_IntentText[g_IntentSelected]) {
        case "Hair":
            return TEXTYPE.SET2;
        case "Face":
            return TEXTYPE.SET1;
        case "Body":
            return TEXTYPE.SET2;
        case "Legs":
            return TEXTYPE.SET1;
        default:
            gl.console.log("ERROR: cannot determine the active part")
    }
}

function setActivePartName(a) {
    return g_IntentText[g_IntentSelected]
}

function arrayPeek(a) {
    return a[a.length - 1]
}
TEXTYPE = new __texType;

function __texType() {
    this.DIF1 = 0;
    this.DIF2 = 1;
    this.SPEC1 = 2;
    this.SPEC2 = 3;
    this.NORM1 = 4;
    this.NORM2 = 5;
    this.ENV = 6;
    this.ENVDIFF = 7;
    this.SET1 = 8;
    this.SET2 = 9;
    this.MAX = 10
}

function getTexStack(a, f) {
    switch (a) {
        case TEXTYPE.DIF1:
            return f.material.tex.diffuse1;
        case TEXTYPE.DIF2:
            return f.material.tex.diffuse2;
        case TEXTYPE.SPEC1:
            return f.material.tex.spec1;
        case TEXTYPE.SPEC2:
            return f.material.tex.spec2;
        case TEXTYPE.NORM1:
            return f.material.tex.normal1;
        case TEXTYPE.NORM2:
            return f.material.tex.normal2;
        case TEXTYPE.ENV:
            return f.material.tex.env;
        case TEXTYPE.ENVDIFF:
            return f.material.tex.envDiff;
        case TEXTYPE.SET1:
            return f.material.tex.set1;
        case TEXTYPE.SET2:
            return f.material.tex.set2;
        default:
            return gl.console.log("ERROR: Unknown texture type used when trying to request a texture stack"), null
    }
}

function getActiveModel() {
    return g_activeModel ? g_meshMan.getModelByName(g_activeModel) : null
}

function texturePop(a, f) {
    if (void 0 == f || null == f) return !1;
    for (var g in f) {
        var h = getTexStack(a, f[g]);
        if (h) 1 < h.length && h.pop();
        else return !1
    }
    return !0
}

function texturePush(a, f, g) {
    a = getTexSlotByPartName();
    if (void 0 == f || null == f) return !1;
    g = g_texMan.getTextureSetByName(g);
    if (null == g) return !1;
    for (var h in f) {
        var k = getTexStack(a, f[h]);
        if (k) k.push(g);
        else return !1
    }
    return !0
}

function shaderPop(a) {
    if (void 0 == a || null == a) return !1;
    for (var f in a) 1 < a[f].material.shader.length && (arrayPeek(a[f].material.shader).envMap && a[f].material.tex.env.pop(), a[f].material.shader.pop(), a[f].material.renderObj.pop());
    return !0
}

function shaderPush(a, f, g) {
    if (void 0 == a || null == a) return !1;
    var h = g_shaderMan.getShaderByName(f);
    if (null == f) return !1;
    for (var k in a) a[k].material.renderObj.push(new RenderObject(h.shaderHandle)), a[k].material.shader.push(h), h.initRenderProc(a[k], g);
    return !1
}

function createRenderTargetTexture(a, f) {
    var g = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, g);
    g.width = a;
    g.height = f;
    renderTarget = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, renderTarget);
    try {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, g.width, g.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
    } catch (h) {
        a = new WebGLUnsignedByteArray(g.width * g.height * 4), gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, g.width, g.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, a)
    }
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);
    a = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, a);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, g.width, g.height);
    error = gl.getError(gl.bindFramebuffer(gl.FRAMEBUFFER, g));
    error = gl.getError(gl.bindRenderbuffer(gl.RENDERBUFFER, a));
    error = gl.getError(gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, g.width, g.height));
    gl.bindRenderbuffer(gl.RENDERBUFFER,
        null);
    error = gl.getError(gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, renderTarget, 0));
    error = gl.getError(gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, a));
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    renderTarget.frameBuffer = g;
    return renderTarget
}
var uiToIntentMap = [];
uiToIntentMap.none = 0;
uiToIntentMap.body = 1;
uiToIntentMap.eye = 2;
uiToIntentMap.hair = 3;
uiToIntentMap.shirt = 4;
uiToIntentMap.pants = 5;
uiToIntentMap.sticker = 6;

function mapUIToIntentIndex(a) {
    a = a.split(" ")[0];
    return uiToIntentMap[a]
}

function getBaseURL() {
    debugger;
    var a = location.href;
    a = a.substring(0, a.indexOf("/", 14));
    if (-1 != a.indexOf("http://localhost")) {
        a = location.href;
        var f = a.indexOf(location.pathname);
        f = a.indexOf("/", f + 1);
        return a.substr(0, f) + "/"
    }
    return a + "/"
}

function buildModelURL() {
    debugger;
    return location.href + "?model=" + getActiveModel().name + getActiveModel().mesh.createMaterialURL()
}

function loadMeshFromURL() {
    debugger;
    setActiveModel(urlParam("model"));
    var a = [];
    a.push({
        name: null,
        mat: null,
        set1: null,
        set2: null,
        clr: null,
        shdr: null
    });
    a.push({
        name: null,
        mat: null,
        set1: null,
        set2: null,
        clr: null,
        shdr: null
    });
    for (var f = 0; f < a.length; f++) a[f].name = urlParam(f + "name"), a[f].set1 = urlParam(f + "set1"), a[f].set2 = urlParam(f + "set2"), a[f].clr = urlParam(f + "clr"), a[f].shdr = urlParam(f + "shdr");
    for (var g = getActiveModel().mesh, h = 0; h < g.primSets.length; h++) {
        var k = new TextureSet;
        texSet2 = new TextureSet;
        k = [k, texSet2];
        f = a[h].set1.split("+");
        var n = a[h].set2.split("+");
        n = [f, n];
        for (f = 0; 2 > f; f++) k[f].name = n[f][0], k[f].diff = g_texMan.getTextureByName(n[f][1]), k[f].spec = g_texMan.getTextureByName(n[f][2]), k[f].norm = g_texMan.getTextureByName(n[f][3]), k[f].layer = parseInt(n[f][4]), k[f].partName = n[f][5];
        g.primSets[h].material.tex.set1.push(k[0]);
        g.primSets[h].material.tex.set2.push(k[1]);
        f = a[h].clr.split("+");
        n = f[0].split(",");
        k = f[1].split(",");
        f = f[2].split(",");
        n = new vec4(parseFloat(n[0]) / 10, parseFloat(n[1]) / 10, parseFloat(n[2]) / 10, parseFloat(n[3]) /
            10);
        k = new vec4(parseFloat(k[0]) / 10, parseFloat(k[1]) / 10, parseFloat(k[2]) / 10, parseFloat(k[3]) / 10);
        f = new vec4(parseFloat(f[0]) / 10, parseFloat(f[1]) / 10, parseFloat(f[2]) / 10, parseFloat(f[3]) / 10);
        g.primSets[h].material.fillColor[0].setvec(n);
        g.primSets[h].material.fillColor[1].setvec(k);
        g.primSets[h].material.fillColor[2].setvec(f);
        g.pushShaderToModel(a[0].shdr)
    }
}

function loadStickersFromURL() {
    debugger;
    var a = urlParam("stickers");
    setModelCamera(urlParam("model"));
    g_cam.setstickurl(a)
};

function inputKB(a) {}
var xMouse = 0,
    yMouse = 0;

function mouseDown(a) {
    vp = gl.getParameter(gl.VIEWPORT);
    unProject(a.pageX, vp[3] - a.pageY, 0, g_cam.view, gl.perspectiveMatrix, vp);
    unProject(a.pageX, vp[3] - a.pageY, 1, g_cam.view, gl.perspectiveMatrix, vp);
    xMouse = window.event.clientX;
    yMouse = window.event.clientY;
    return !1
}

function mouseUp(a) {
    5 > Math.abs(window.event.clientX - xMouse) && 5 > Math.abs(window.event.clientY - yMouse) && g_cam.nextSticker();
    return !1
}
stickerCursor = new vec2(0, 0);
cursor = new vec2(0, 0);
lastMousePos = new vec2(0, 0);
firstTime = !0;

function updateCursorPos(a, f) {
    a = a || window.event;
    cursor.x = a.x;
    cursor.y = a.y;
    if (firstTime) firstTime = !1, lastMousePos.x = cursor.x, lastMousePos.y = cursor.y;
    else {
        var g = document.documentElement,
            h = document.body;
        cursor.x = a.clientX + (g.scrollLeft || h.scrollLeft) - g.clientLeft;
        cursor.y = a.clientY + (g.scrollTop || h.scrollTop) - g.clientTop;
        f || (lastMousePos.x = cursor.x, lastMousePos.y = cursor.y)
    }
    a = document.getElementById("canvas");
    f = a.width / 2;
    g = a.height / 2;
    stickerCursor.x = (cursor.x - a.parentNode.offsetLeft - f) / f;
    stickerCursor.y =
        (cursor.y - a.parentNode.offsetTop - g) / g
}
var stickerZoom = 1,
    zoomDirty = !1;

function wheel(a) {
    var f = 0;
    a || (a = window.event);
    a.wheelDelta ? (f = a.wheelDelta / 120, window.opera && (f = -f)) : a.detail && (f = -a.detail / 3);
    0 > f ? (stickerZoom -= .5, 1 > stickerZoom ? stickerZoom = 1 : zoomDirty = !0) : 0 < f && (stickerZoom += .5, zoomDirty = !0, 4 < stickerZoom ? stickerZoom = 4 : zoomDirty = !0);
    a.preventDefault && a.preventDefault();
    a.returnValue = !1
}

function getCursorPos() {
    return cursor
}

function getStickerPos() {
    return stickerCursor
}

function getStickerZoom() {
    return stickerZoom
};
/*
 jCarousel - Riding carousels with jQuery
   http://sorgalla.com/jcarousel/

 Copyright (c) 2006 Jan Sorgalla (http://sorgalla.com)
 Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.

 Built on top of the jQuery library
   http://jquery.com

 Inspired by the "Carousel Component" by Bill Scott
   http://billwscott.com/carousel/
*/
(function(a) {
    a.fn.jcarousel = function(f) {
        if ("string" == typeof f) {
            var g = a(this).data("jcarousel"),
                k = Array.prototype.slice.call(arguments, 1);
            return g[f].apply(g, k)
        }
        return this.each(function() {
            a(this).data("jcarousel", new h(this, f))
        })
    };
    var f = {
            vertical: !1,
            rtl: !1,
            start: 1,
            offset: 1,
            size: null,
            scroll: 3,
            visible: null,
            animation: "normal",
            easing: "swing",
            auto: 0,
            wrap: null,
            initCallback: null,
            reloadCallback: null,
            itemLoadCallback: null,
            itemFirstInCallback: null,
            itemFirstOutCallback: null,
            itemLastInCallback: null,
            itemLastOutCallback: null,
            itemVisibleInCallback: null,
            itemVisibleOutCallback: null,
            buttonNextHTML: "<div></div>",
            buttonPrevHTML: "<div></div>",
            buttonNextEvent: "click",
            buttonPrevEvent: "click",
            buttonNextCallback: null,
            buttonPrevCallback: null,
            itemFallbackDimension: null
        },
        g = !1;
    a(window).bind("load.jcarousel", function() {
        g = !0
    });
    a.jcarousel = function(k, h) {
        this.options = a.extend({}, f, h || {});
        this.locked = !1;
        this.buttonPrev = this.buttonNext = this.list = this.clip = this.container = null;
        h && void 0 !== h.rtl || (this.options.rtl = "rtl" == (a(k).attr("dir") ||
            a("html").attr("dir") || "").toLowerCase());
        this.wh = this.options.vertical ? "height" : "width";
        this.lt = this.options.vertical ? "top" : this.options.rtl ? "right" : "left";
        for (var l = "", n = k.className.split(" "), p = 0; p < n.length; p++)
            if (-1 != n[p].indexOf("jcarousel-skin")) {
                a(k).removeClass(n[p]);
                l = n[p];
                break
            }
        "UL" == k.nodeName.toUpperCase() || "OL" == k.nodeName.toUpperCase() ? (this.list = a(k), this.container = this.list.parent(), this.container.hasClass("jcarousel-clip") ? (this.container.parent().hasClass("jcarousel-container") ||
            (this.container = this.container.wrap("<div></div>")), this.container = this.container.parent()) : this.container.hasClass("jcarousel-container") || (this.container = this.list.wrap("<div></div>").parent())) : (this.container = a(k), this.list = this.container.find("ul,ol").eq(0));
        "" != l && -1 == this.container.parent()[0].className.indexOf("jcarousel-skin") && this.container.wrap('<div class=" ' + l + '"></div>');
        this.clip = this.list.parent();
        this.clip.length && this.clip.hasClass("jcarousel-clip") || (this.clip = this.list.wrap("<div></div>").parent());
        this.buttonNext = a(".jcarousel-next", this.container);
        0 == this.buttonNext.size() && null != this.options.buttonNextHTML && (this.buttonNext = this.clip.after(this.options.buttonNextHTML).next());
        this.buttonNext.addClass(this.className("jcarousel-next"));
        this.buttonPrev = a(".jcarousel-prev", this.container);
        0 == this.buttonPrev.size() && null != this.options.buttonPrevHTML && (this.buttonPrev = this.clip.after(this.options.buttonPrevHTML).next());
        this.buttonPrev.addClass(this.className("jcarousel-prev"));
        this.clip.addClass(this.className("jcarousel-clip")).css({
            overflow: "hidden",
            position: "relative"
        });
        this.list.addClass(this.className("jcarousel-list")).css({
            overflow: "hidden",
            position: "relative",
            top: 0,
            margin: 0,
            padding: 0
        }).css(this.options.rtl ? "right" : "left", 0);
        this.container.addClass(this.className("jcarousel-container")).css({
            position: "relative"
        });
        !this.options.vertical && this.options.rtl && this.container.addClass("jcarousel-direction-rtl").attr("dir", "rtl");
        var q = null != this.options.visible ? Math.ceil(this.clipping() / this.options.visible) : null;
        l = this.list.children("li");
        var r =
            this;
        if (0 < l.size()) {
            var u = 0;
            p = this.options.offset;
            l.each(function() {
                r.format(this, p++);
                u += r.dimension(this, q)
            });
            this.list.css(this.wh, u + 100 + "px");
            h && void 0 !== h.size || (this.options.size = l.size())
        }
        this.container.css("display", "block");
        this.buttonNext.css("display", "block");
        this.buttonPrev.css("display", "block");
        this.funcNext = function() {
            r.next()
        };
        this.funcPrev = function() {
            r.prev()
        };
        this.funcResize = function() {
            r.reload()
        };
        null != this.options.initCallback && this.options.initCallback(this, "init");
        !g && a.browser.safari ?
            (this.buttons(!1, !1), a(window).bind("load.jcarousel", function() {
                r.setup()
            })) : this.setup()
    };
    var h = a.jcarousel;
    h.fn = h.prototype = {
        jcarousel: "0.2.5"
    };
    h.fn.extend = h.extend = a.extend;
    h.fn.extend({
        setup: function() {
            this.prevLast = this.prevFirst = this.last = this.first = null;
            this.animating = !1;
            this.tail = this.timer = null;
            this.inTail = !1;
            if (!this.locked) {
                this.list.css(this.lt, this.pos(this.options.offset) + "px");
                var f = this.pos(this.options.start);
                this.prevFirst = this.prevLast = null;
                this.animate(f, !1);
                a(window).unbind("resize.jcarousel",
                    this.funcResize).bind("resize.jcarousel", this.funcResize)
            }
        },
        reset: function() {
            this.list.empty();
            this.list.css(this.lt, "0px");
            this.list.css(this.wh, "10px");
            null != this.options.initCallback && this.options.initCallback(this, "reset");
            this.setup()
        },
        reload: function() {
            null != this.tail && this.inTail && this.list.css(this.lt, h.intval(this.list.css(this.lt)) + this.tail);
            this.tail = null;
            this.inTail = !1;
            null != this.options.reloadCallback && this.options.reloadCallback(this);
            if (null != this.options.visible) {
                var a = this,
                    f = Math.ceil(this.clipping() /
                        this.options.visible),
                    g = 0,
                    t = 0;
                this.list.children("li").each(function(h) {
                    g += a.dimension(this, f);
                    h + 1 < a.first && (t = g)
                });
                this.list.css(this.wh, g + "px");
                this.list.css(this.lt, -t + "px")
            }
            this.scroll(this.first, !1)
        },
        lock: function() {
            this.locked = !0;
            this.buttons()
        },
        unlock: function() {
            this.locked = !1;
            this.buttons()
        },
        size: function(a) {
            void 0 != a && (this.options.size = a, this.locked || this.buttons());
            return this.options.size
        },
        has: function(a, f) {
            void 0 != f && f || (f = a);
            null !== this.options.size && f > this.options.size && (f = this.options.size);
            for (; a <= f; a++) {
                var g = this.get(a);
                if (!g.length || g.hasClass("jcarousel-item-placeholder")) return !1
            }
            return !0
        },
        get: function(f) {
            return a(".jcarousel-item-" + f, this.list)
        },
        add: function(f, g) {
            var k = this.get(f),
                n = 0,
                p = a(g);
            if (0 == k.length) {
                var q;
                k = this.create(f);
                for (var r = h.intval(f); q = this.get(--r);)
                    if (0 >= r || q.length) {
                        0 >= r ? this.list.prepend(k) : q.after(k);
                        break
                    }
            } else n = this.dimension(k);
            "LI" == p.get(0).nodeName.toUpperCase() ? (k.replaceWith(p), k = p) : k.empty().append(g);
            this.format(k.removeClass(this.className("jcarousel-item-placeholder")),
                f);
            p = null != this.options.visible ? Math.ceil(this.clipping() / this.options.visible) : null;
            n = this.dimension(k, p) - n;
            0 < f && f < this.first && this.list.css(this.lt, h.intval(this.list.css(this.lt)) - n + "px");
            this.list.css(this.wh, h.intval(this.list.css(this.wh)) + n + "px");
            return k
        },
        remove: function(a) {
            var f = this.get(a);
            if (f.length && !(a >= this.first && a <= this.last)) {
                var g = this.dimension(f);
                a < this.first && this.list.css(this.lt, h.intval(this.list.css(this.lt)) + g + "px");
                f.remove();
                this.list.css(this.wh, h.intval(this.list.css(this.wh)) -
                    g + "px")
            }
        },
        next: function() {
            this.stopAuto();
            null == this.tail || this.inTail ? this.scroll("both" != this.options.wrap && "last" != this.options.wrap || null == this.options.size || this.last != this.options.size ? this.first + this.options.scroll : 1) : this.scrollTail(!1)
        },
        prev: function() {
            this.stopAuto();
            null != this.tail && this.inTail ? this.scrollTail(!0) : this.scroll("both" != this.options.wrap && "first" != this.options.wrap || null == this.options.size || 1 != this.first ? this.first - this.options.scroll : this.options.size)
        },
        scrollTail: function(a) {
            if (!this.locked &&
                !this.animating && this.tail) {
                var f = h.intval(this.list.css(this.lt));
                a ? f += this.tail : f -= this.tail;
                this.inTail = !a;
                this.prevFirst = this.first;
                this.prevLast = this.last;
                this.animate(f)
            }
        },
        scroll: function(a, f) {
            this.locked || this.animating || this.animate(this.pos(a), f)
        },
        pos: function(a) {
            var f = h.intval(this.list.css(this.lt));
            if (this.locked || this.animating) return f;
            "circular" != this.options.wrap && (a = 1 > a ? 1 : this.options.size && a > this.options.size ? this.options.size : a);
            for (var g = this.first > a, k = "circular" != this.options.wrap &&
                    1 >= this.first ? 1 : this.first, p = g ? this.get(k) : this.get(this.last), q = g ? k : k - 1, r, u = 0, x, v; g ? --q >= a : ++q < a;) r = this.get(q), x = !r.length, 0 == r.length && (r = this.create(q).addClass(this.className("jcarousel-item-placeholder")), p[g ? "before" : "after"](r), null != this.first && "circular" == this.options.wrap && null !== this.options.size && (0 >= q || q > this.options.size) && (p = this.get(this.index(q)), p.length && (r = this.add(q, p.clone(!0))))), p = r, v = this.dimension(r), x && (u += v), null != this.first && ("circular" == this.options.wrap || 1 <= q && (null ==
                this.options.size || q <= this.options.size)) && (f = g ? f + v : f - v);
            k = this.clipping();
            var y = [],
                w = 0;
            q = a;
            var z = 0;
            for (p = this.get(a - 1); ++w;) {
                r = this.get(q);
                x = !r.length;
                0 == r.length && (r = this.create(q).addClass(this.className("jcarousel-item-placeholder")), 0 == p.length ? this.list.prepend(r) : p[g ? "before" : "after"](r), null != this.first && "circular" == this.options.wrap && null !== this.options.size && (0 >= q || q > this.options.size) && (p = this.get(this.index(q)), p.length && (r = this.add(q, p.clone(!0)))));
                p = r;
                v = this.dimension(r);
                if (0 == v) throw Error("jCarousel: No width/height set for items. This will cause an infinite loop. Aborting...");
                "circular" != this.options.wrap && null !== this.options.size && q > this.options.size ? y.push(r) : x && (u += v);
                z += v;
                if (z >= k) break;
                q++
            }
            for (r = 0; r < y.length; r++) y[r].remove();
            0 < u && (this.list.css(this.wh, this.dimension(this.list) + u + "px"), g && (f -= u, this.list.css(this.lt, h.intval(this.list.css(this.lt)) - u + "px")));
            u = a + w - 1;
            "circular" != this.options.wrap && this.options.size && u > this.options.size && (u = this.options.size);
            if (q > u)
                for (w = 0, q = u, z = 0; ++w;) {
                    r = this.get(q--);
                    if (!r.length) break;
                    z += this.dimension(r);
                    if (z >= k) break
                }
            q = u - w + 1;
            "circular" != this.options.wrap && 1 > q && (q = 1);
            this.inTail && g && (f += this.tail, this.inTail = !1);
            this.tail = null;
            "circular" != this.options.wrap && u == this.options.size && 1 <= u - w + 1 && (g = h.margin(this.get(u), this.options.vertical ? "marginBottom" : "marginRight"), z - g > k && (this.tail = z - k - g));
            for (; a-- > q;) f += this.dimension(this.get(a));
            this.prevFirst = this.first;
            this.prevLast = this.last;
            this.first = q;
            this.last = u;
            return f
        },
        animate: function(a, f) {
            if (!this.locked && !this.animating) {
                this.animating = !0;
                var g = this,
                    h = function() {
                        g.animating = !1;
                        0 == a && g.list.css(g.lt, 0);
                        ("circular" == g.options.wrap || "both" == g.options.wrap || "last" == g.options.wrap || null == g.options.size || g.last < g.options.size) && g.startAuto();
                        g.buttons();
                        g.notify("onAfterAnimation");
                        if ("circular" == g.options.wrap && null !== g.options.size)
                            for (var f = g.prevFirst; f <= g.prevLast; f++) null === f || f >= g.first && f <= g.last || !(1 > f || f > g.options.size) || g.remove(f)
                    };
                this.notify("onBeforeAnimation");
                this.options.animation && 0 != f ? this.list.animate(this.options.vertical ? {
                    top: a
                } : this.options.rtl ? {
                    right: a
                } : {
                    left: a
                }, this.options.animation, this.options.easing, h) : (this.list.css(this.lt, a + "px"), h())
            }
        },
        startAuto: function(a) {
            void 0 != a && (this.options.auto = a);
            if (0 == this.options.auto) return this.stopAuto();
            if (null == this.timer) {
                var f = this;
                this.timer = setTimeout(function() {
                    f.next()
                }, 1E3 * this.options.auto)
            }
        },
        stopAuto: function() {
            null != this.timer && (clearTimeout(this.timer), this.timer = null)
        },
        buttons: function(a, f) {
            if (void 0 == a || null == a) a = !this.locked && 0 !== this.options.size && (this.options.wrap && "first" != this.options.wrap ||
                null == this.options.size || this.last < this.options.size), !(this.locked || this.options.wrap && "first" != this.options.wrap) && null != this.options.size && this.last >= this.options.size && (a = null != this.tail && !this.inTail);
            if (void 0 == f || null == f) f = !this.locked && 0 !== this.options.size && (this.options.wrap && "last" != this.options.wrap || 1 < this.first), this.locked || this.options.wrap && "last" != this.options.wrap || null == this.options.size || 1 != this.first || (f = null != this.tail && this.inTail);
            var g = this;
            this.buttonNext[a ? "bind" : "unbind"](this.options.buttonNextEvent +
                ".jcarousel", this.funcNext)[a ? "removeClass" : "addClass"](this.className("jcarousel-next-disabled")).attr("disabled", a ? !1 : !0);
            this.buttonPrev[f ? "bind" : "unbind"](this.options.buttonPrevEvent + ".jcarousel", this.funcPrev)[f ? "removeClass" : "addClass"](this.className("jcarousel-prev-disabled")).attr("disabled", f ? !1 : !0);
            null != this.options.buttonNextCallback && this.buttonNext.data("jcarouselstate") != a && this.buttonNext.each(function() {
                g.options.buttonNextCallback(g, this, a)
            }).data("jcarouselstate", a);
            null != this.options.buttonPrevCallback &&
                this.buttonPrev.data("jcarouselstate") != f && this.buttonPrev.each(function() {
                    g.options.buttonPrevCallback(g, this, f)
                }).data("jcarouselstate", f)
        },
        notify: function(a) {
            var f = null == this.prevFirst ? "init" : this.prevFirst < this.first ? "next" : "prev";
            this.callback("itemLoadCallback", a, f);
            this.prevFirst !== this.first && (this.callback("itemFirstInCallback", a, f, this.first), this.callback("itemFirstOutCallback", a, f, this.prevFirst));
            this.prevLast !== this.last && (this.callback("itemLastInCallback", a, f, this.last), this.callback("itemLastOutCallback",
                a, f, this.prevLast));
            this.callback("itemVisibleInCallback", a, f, this.first, this.last, this.prevFirst, this.prevLast);
            this.callback("itemVisibleOutCallback", a, f, this.prevFirst, this.prevLast, this.first, this.last)
        },
        callback: function(f, g, h, t, p, q, r) {
            if (void 0 != this.options[f] && ("object" == typeof this.options[f] || "onAfterAnimation" == g)) {
                var k = "object" == typeof this.options[f] ? this.options[f][g] : this.options[f];
                if (a.isFunction(k)) {
                    var l = this;
                    if (void 0 === t) k(l, h, g);
                    else if (void 0 === p) this.get(t).each(function() {
                        k(l,
                            this, t, h, g)
                    });
                    else
                        for (var n = t; n <= p; n++) null === n || n >= q && n <= r || this.get(n).each(function() {
                            k(l, this, n, h, g)
                        })
                }
            }
        },
        create: function(a) {
            return this.format("<li></li>", a)
        },
        format: function(f, g) {
            f = a(f);
            for (var h = f.get(0).className.split(" "), k = 0; k < h.length; k++) - 1 != h[k].indexOf("jcarousel-") && f.removeClass(h[k]);
            f.addClass(this.className("jcarousel-item")).addClass(this.className("jcarousel-item-" + g)).css({
                "float": this.options.rtl ? "right" : "left",
                "list-style": "none"
            }).attr("jcarouselindex", g);
            return f
        },
        className: function(a) {
            return a +
                " " + a + (this.options.vertical ? "-vertical" : "-horizontal")
        },
        dimension: function(f, g) {
            f = void 0 != f.jquery ? f[0] : f;
            var k = this.options.vertical ? (f.offsetHeight || h.intval(this.options.itemFallbackDimension)) + h.margin(f, "marginTop") + h.margin(f, "marginBottom") : (f.offsetWidth || h.intval(this.options.itemFallbackDimension)) + h.margin(f, "marginLeft") + h.margin(f, "marginRight");
            if (void 0 == g || k == g) return k;
            k = this.options.vertical ? g - h.margin(f, "marginTop") - h.margin(f, "marginBottom") : g - h.margin(f, "marginLeft") - h.margin(f,
                "marginRight");
            a(f).css(this.wh, k + "px");
            return this.dimension(f)
        },
        clipping: function() {
            return this.options.vertical ? this.clip[0].offsetHeight - h.intval(this.clip.css("borderTopWidth")) - h.intval(this.clip.css("borderBottomWidth")) : this.clip[0].offsetWidth - h.intval(this.clip.css("borderLeftWidth")) - h.intval(this.clip.css("borderRightWidth"))
        },
        index: function(a, f) {
            void 0 == f && (f = this.options.size);
            return Math.round(((a - 1) / f - Math.floor((a - 1) / f)) * f) + 1
        }
    });
    h.extend({
        defaults: function(g) {
            return a.extend(f, g || {})
        },
        margin: function(f, g) {
            if (!f) return 0;
            var k = void 0 != f.jquery ? f[0] : f;
            if ("marginRight" == g && a.browser.safari) {
                f = {
                    display: "block",
                    "float": "none",
                    width: "auto"
                };
                var n, p;
                a.swap(k, f, function() {
                    n = k.offsetWidth
                });
                f.marginRight = 0;
                a.swap(k, f, function() {
                    p = k.offsetWidth
                });
                return p - n
            }
            return h.intval(a.css(k, g))
        },
        intval: function(a) {
            a = parseInt(a);
            return isNaN(a) ? 0 : a
        }
    })
})(jQuery);
jQuery(document).ready(function() {
    function a() {
        jQuery("#loadingMenu").addClass("hide");
        jQuery("#optionsMenu").addClass("hide");
        jQuery("#pageContainer").removeClass("dim");
        n("#tools");
        jQuery("#tools").removeClass("hide");
        jQuery("#tools").addClass("slide-enter-left");
        window.setTimeout(function() {
            jQuery("#tools").removeClass("hide");
            jQuery("#tools").addClass("slide-enter-left")
        }, 200);
        window.setTimeout(function() {
            jQuery("#colorPalette").removeClass("hide");
            jQuery("#colorPalette").addClass("slide-enter-left");
            jQuery("#assets").removeClass("hide");
            jQuery("#assets").addClass("slide-enter-right")
        }, 500);
        window.setTimeout(function() {
            jQuery("#decals").addClass("transparent");
            jQuery("#decals").removeClass("hide");
            jQuery("#decals").addClass("fall-enter");
            h("body")
        }, 1E3);
        window.setTimeout(function() {
            jQuery("#decals li").removeClass("fall-enter");
            start()
        }, 2E3);
        window.setTimeout(function() {
                jQuery("#controlArea").addClass("transparent");
                jQuery("#controlArea").removeClass("hide");
                jQuery("#controlArea").addClass("canvas-enter")
            },
            2300)
    }

    function f(a, f) {
        var h = jQuery(a);
        a = a.className;
        var k = jQuery("#canvas");
        g(h.parent());
        k.removeClass("target pointer move resize");
        k.addClass(f);
        "options" != a ? apiUseToolSelected(a) : (jQuery("#tools").addClass("hide"), jQuery("#decals").addClass("hide"), jQuery("#assets").addClass("hide"), jQuery("#colorPalette").addClass("hide"), jQuery("#pageContainer").addClass("dim"), jQuery("#controlArea").addClass("hide"), jQuery("#controlArea").removeClass("show"), jQuery("#long-link").val(createModelURL()), jQuery("#optionsMenu").removeClass("hide"),
            jQuery("#optionsMenu").addClass("popupMenu"))
    }

    function g(a) {
        a = jQuery(a);
        a.children().each(function(a) {
            jQuery(this).hasClass("selected") && jQuery(this).removeClass("selected")
        })
    }

    function h(a) {
        var f = jQuery("#" + a + "Assets");
        a = jQuery("#" + a + "Assets ul");
        var h = jQuery("#assets");
        g("#assets");
        h.children(".jcarousel-skin-patterns").each(function() {
            jQuery("img").addClass("fade-in")
        });
        f.addClass("selected");
        a.hasClass("jcarousel-list") || a.jcarousel({
            vertical: !0,
            scroll: 4,
            wrap: "circular"
        })
    }

    function k(a, f) {
        f = jQuery(a);
        a = a.id;
        f.hasClass("selected") || (g(f.parent()), f.addClass("selected"), n(a), apiSelectIntent(a), h(a))
    }

    function n(a) {
        jQuery("#decals #sticker");
        var f = jQuery("#tools .undo"),
            g = jQuery("#tools .blank");
        "sticker" == a ? (f.removeClass("hide"), g.removeClass("show"), f.addClass("show"), g.addClass("hide")) : (f.addClass("hide"), g.addClass("show"), f.removeClass("show"), g.removeClass("hide"))
    }

    function l() {
        jQuery("#colorPalette").hasClass("hide") && jQuery("#colorPalette").removeClass("hide")
    }
    document.body.onselectstart =
        function() {
            return !1
        };
    jQuery("#loadingMenu img").click(function() {
        setActiveModel(this.id);
        a()
    });
    preload();
    var t = !0;
    urlParam("model") && (t = !1);
    t ? (jQuery("#pageContainer").addClass("dim"), jQuery("#loadingMenu").removeClass("hide")) : a();
    jQuery("#tools").draggable({
        handle: "h3",
        containment: "#pageContainer"
    });
    jQuery("#colorPalette").draggable({
        handle: "h3",
        containment: "#pageContainer"
    });
    jQuery("li.stamp").click(function() {
        f(this, "target")
    });
    jQuery("li.move").click(function() {
        f(this, "move")
    });
    jQuery("li.shader").click(function() {
        f(this,
            "target")
    });
    jQuery("li.undo").click(function() {
        f(this, "pointer")
    });
    jQuery("li.fill").click(function() {
        f(this, "target")
    });
    jQuery("li.zoom").click(function() {
        f(this, "move")
    });
    jQuery("li.options").click(function() {
        f(this, "pointer")
    });
    jQuery("li.doll1").click(function() {
        f(this, "pickMale")
    });
    jQuery("li.doll2").click(function() {
        f(this, "pickFemale")
    });
    jQuery("li.cameraReset").click(function() {
        f(this, "reset")
    });
    jQuery("li#body").click(function() {
        k(this);
        l()
    });
    jQuery("li#eye").click(function() {
        k(this);
        l()
    });
    jQuery("li#hair").click(function() {
        k(this);
        l()
    });
    jQuery("li#shirt").click(function() {
        k(this);
        l()
    });
    jQuery("li#pants").click(function() {
        k(this);
        l()
    });
    jQuery("li#sticker").click(function() {
        k(this);
        jQuery("#colorPalette").addClass("fade-out");
        jQuery("#colorPalette").addClass("hide")
    });
    jQuery("#assets ul li").click(function() {
        var a = jQuery(this),
            f = this.id;
        g(a.parent());
        a.addClass("selected");
        apiPushMaterial(f)
    });
    jQuery("#optionsMenu #restart").click(function () {
        debugger;
        location.reload(!0)
    });
    jQuery("#optionsMenu a").click(function() {
        apiSetGraphicsQuality(this.id);
        a();
        jQuery("#controlArea").removeClass("hide");
        jQuery("#controlArea").addClass("show")
    });
    jQuery("#optionsMenu #close").click(function() {
        jQuery("#controlArea").removeClass("hide");
        a()
    })
});

function _$(a, f) {
    return ("object" == typeof f ? f : document).getElementById(a)
}

function _$S(a) {
    if (a = _$(a)) return a.style
}

function abPos(a) {
    a = "object" == typeof a ? a : _$(a);
    for (var f = {
            X: 0,
            Y: 0
        }; null != a;) f.X += a.offsetLeft, f.Y += a.offsetTop, a = a.offsetParent;
    return f
}

function agent(a) {
    return Math.max(navigator.userAgent.toLowerCase().indexOf(a), 0)
}

function isset(a) {
    return "undefined" == typeof a || 0 == a.length ? !1 : !0
}

function toggle(a, f, g) {
    a = _$S(a);
    a.display = f ? f : "none" == a.display ? "block" : "none";
    g && (a.left = g[0], a.top = g[1])
}

function XY(a, f) {
    a = agent("msie") ? {
        X: a.clientX + document.body.scrollLeft,
        Y: a.clientY + document.body.scrollTop
    } : {
        X: a.pageX,
        Y: a.pageY
    };
    return f ? a[f] : a
}

function zero(a) {
    return isNaN(a = parseFloat(a)) ? 0 : a
}

function zindex(a) {
    a.style.zIndex = zINDEX++
}
Picker = {
    stop: 1,
    core: function(a, f, g, h, k) {
        function n(f, h, n) {
            p = XY(n);
            var r = [p.X + f, p.Y + h];
            k && k(r);
            if ("mCur" == a) {
                f = parseInt(_$S("mSpec").width);
                h = f / 2;
                n = h / 2;
                var u = r[0] - h - 3,
                    v = f - r[1] - h + 31;
                r = Math.sqrt(Math.pow(u, 2) + Math.pow(v, 2));
                u = Math.atan2(u, v) / (2 * Math.PI);
                hsv = {
                    H: 0 < u ? 360 * u : 360 * u + 360,
                    S: r < n ? r / n * 100 : 100,
                    V: r >= n ? 100 * Math.max(0, 1 - (r - n) / (h - n)) : 100
                };
                color.cords(f);
                apiSetColor(color.HSV_RGB(hsv));
                jQuery("div.north").css("background-color", "#" + color.HSV_HEX(hsv))
            } else if ("mSize" == a) f = Math.max(Math.max(r[0], r[1]) +
                q, 75), color.cords(f), _$S("mini").height = f + 28 + "px", _$S("mini").width = f + 20 + "px", _$S("mSpec").height = f + "px", _$S("mSpec").width = f + "px";
            else {
                g && (r = [l(r[0], g[0], g[2]), l(r[1], g[1], g[3])]);
                if (!g || g[0]) t.left = r[0] + "px";
                if (!g || g[1]) t.top = r[1] + "px"
            }
        }

        function l(a, f, g) {
            return Math.max(isNaN(g) ? 0 : g, isNaN(f) ? a : Math.min(f, a))
        }
        if (Picker.stop) {
            Picker.stop = "";
            var t = _$S(a),
                p = XY(f);
            h || zindex(_$(a));
            "mCur" == a && (h = abPos(_$(a).parentNode), n(-(h.X - 5), -(h.Y - 28), f));
            if ("mSize" == a) var q = parseInt(_$S("mSpec").height),
                r = -XY(f).X,
                u = -XY(f).Y;
            else r = zero(t.left) - p.X, u = zero(t.top) - p.Y;
            document.onmousemove = function(a) {
                Picker.stop || n(r, u, a)
            };
            document.onmouseup = function() {
                Picker.stop = 1;
                document.onmousemove = "";
                document.onmouseup = ""
            }
        }
    },
    hsv: {
        H: 0,
        S: 0,
        V: 100
    }
};
zINDEX = 2;
color = {
    cords: function(a) {
        a /= 2;
        var f = hsv.H / 360 * 2 * Math.PI,
            g = (hsv.S + (100 - hsv.V)) / 100 * (a / 2);
        _$S("mCur").left = Math.round(Math.abs(Math.round(Math.sin(f) * g) + a + 3)) + "px";
        _$S("mCur").top = Math.round(Math.abs(Math.round(Math.cos(f) * g) - a - 21)) + "px"
    },
    HEX: function(a) {
        a = Math.round(Math.min(Math.max(0, a), 255));
        return "0123456789ABCDEF".charAt((a - a % 16) / 16) + "0123456789ABCDEF".charAt(a % 16)
    },
    RGB_HEX: function(a) {
        var f = color.HEX;
        return f(a.R) + f(a.G) + f(a.B)
    },
    HSV_RGB: function(a) {
        var f = a.S / 100;
        var g = a.V / 100,
            h = a.H / 360;
        if (0 <
            f) {
            1 <= h && (h = 0);
            h *= 6;
            F = h - Math.floor(h);
            a = Math.round(255 * g * (1 - f));
            var k = Math.round(255 * g * (1 - f * F));
            f = Math.round(255 * g * (1 - f * (1 - F)));
            g = Math.round(255 * g);
            switch (Math.floor(h)) {
                case 0:
                    var n = g;
                    var l = f;
                    k = a;
                    break;
                case 1:
                    n = k;
                    l = g;
                    k = a;
                    break;
                case 2:
                    n = a;
                    l = g;
                    k = f;
                    break;
                case 3:
                    n = a;
                    l = k;
                    k = g;
                    break;
                case 4:
                    n = f;
                    l = a;
                    k = g;
                    break;
                case 5:
                    n = g, l = a
            }
            return {
                R: n ? n : 0,
                G: l ? l : 0,
                B: k ? k : 0,
                A: 255
            }
        }
        return {
            R: g = Math.round(255 * g),
            G: g,
            B: g,
            A: 255
        }
    },
    HSV_HEX: function(a) {
        return color.RGB_HEX(color.HSV_RGB(a))
    }
};
g_cam = new camera;
g_width = document.getElementById("canvas").width;
g_height = document.getElementById("canvas").height;
g_camMoveSpeed = 25;
gl = null;
g_worldObjects = [];
g_collMan = new CollisionManager;
g_meshMan = new MeshManager;
g_texMan = new TextureManager;
g_shaderMan = new ShaderManager;
g_mouseDown = !1;
g_alphaTex = g_defaultTex = null;
g_hiQu = !0;
g_IntentSelected = 1;
g_IntentText = "None Skin Face Hair Body Legs Stickers".split(" ");

function tick() {
    draw(gl);
    mouse = new vec2(0, 0);
    mouse = getCursorPos()
}

function preload() {
    gl = preinit()
}

function start() {
    document.onkeydown = inputKB;
    element = document.getElementById("pageContainer");
    element.onmousemove = function(a) {
        updateCursorPos(a, g_mouseDown)
    };
    element.onmouseup = function(a) {
        g_mouseDown = !1;
        return mouseUp(a)
    };
    init();
    framerate = new Framerate("fps");
    setInterval("tick()", 25)
};

function urlParam(a) {
    debugger;
    return (a = (new RegExp("[\\?&]" + a + "=([^&#]*)")).exec(window.location.href)) ? a[1] || 0 : 0
}

function shortenURL(a) {
    jQuery.getJSON("http://api.bit.ly/shorten?version=2.0.1&longUrl=" + a + "&login=humanengines&apiKey=R_909ee310e09db4e8837a3109b81bf984&history=0&format=json&callback=?", function(f) {
        set_short_url_val(f.results[a].shortUrl)
    })
}

function set_url_vals() {
    var a = jQuery("#long-link").val();
    shortenURL(a)
}

function set_short_url_val(a) {
    jQuery("#bitly").val(a)
};