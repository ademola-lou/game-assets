var growthMapURL = 'https://cdn.rawgit.com/Pryme8/Pryme8.github.io/57985182/cloudAssets/textures/fixed-growth-map.png';

function randomBetween(min, max) {
    if (min < 0) {
        return min + Math.random() * (Math.abs(min)+max);
    }else {
        return min + Math.random() * max;
    }
}


vertFX =
`precision highp float;
//Attributes
attribute vec3 position;

attribute vec2 posRef;
attribute vec2 uv;

attribute float bladeLengthRef;
attribute vec2 uvRef;
attribute vec4 deformRef;

// Uniforms
uniform mat4 worldViewProjection;

uniform sampler2D growthMap;
uniform vec2 zoneSize;
uniform float bladeHeight;
uniform vec3 offset;

uniform float time;

// Varying
varying vec4 vPosition;
varying vec2 vUV;
varying vec2 vUVRef;
varying float vBladePer;

vec2 rotate (float x, float y, float r) {
		float c = cos(r);
		float s = sin(r);
		return vec2(x * c - y * s, x * s + y * c);
	}

void main() {
    vec4 growth = texture(growthMap, uvRef);
    float invBladePer = 1.0-bladeLengthRef;
    vec4 p = vec4( position, 1. );
    p.x *= 1.0 - pow(invBladePer, 3.2);
    p.xy *= growth.x*deformRef.x;
    float lean = deformRef.z + 0.4 * (sin(4.0) + cos(4.0));
    p.z = (1.0 - (lean * (invBladePer * invBladePer)))*growth.x;
    
    p.xz = rotate(p.x, p.z, deformRef.y*180.);    
    p.xz += posRef;

    float wind = (sin(time) + cos(time));
    p.x += (1.0 - (wind * (invBladePer * invBladePer )))*growth.x;


    vPosition = p;
    vUV = uv;
    vUVRef = uvRef;
    vBladePer = bladeLengthRef;

    gl_Position = worldViewProjection * p;

}`;

fragFX = 
`precision highp float;

uniform mat4 worldView;

varying vec4 vPosition;
varying vec2 vUV;
varying vec2 vUVRef;
varying float vBladePer;

uniform sampler2D growthMap;
uniform vec2 zoneSize;
uniform float bladeHeight;

uniform float time;

void main(void) {
    vec3 base = vec3(1.0, vUVRef.x, vUVRef.y);
    vec4 growth =  texture2D(growthMap, vUVRef);
    if(growth.r == 0.0 )discard;
    gl_FragColor = vec4( vec3( 0.0, 1.0-vBladePer, 0.0), 1.0);
}`;

BABYLON.Effect.ShadersStore['grassVertexShader'] = vertFX;
BABYLON.Effect.ShadersStore['grassFragmentShader'] = fragFX;

GRASS = function(args, scene){
    args = args || {};
    args.bladeHeight = args.bladeHeight || 1;
    args.bladeWidth = args.bladeWidth || 0.1;
    args.zoneSize = args.zoneSize || new BABYLON.Vector2(10,10);
    this.scene = scene;

    this.grasses = []
    this.args = args;

    this.init();

return this;
}


GRASS.prototype = {
    init: function(){
        this.Distribute(this.CreateBaseStrip());
    },
    CreateBaseStrip : function(){
        var args = this.args;
        var scene = this.scene;
        var width =  args.bladeWidth || 1;
	    var height = args.bladeHeight || 1;
	    var width_half = width / 2;
	    var height_half = height / 2;
	    var gridX = Math.floor( args.bladeXsegs ) || 1;
	    var gridY = Math.floor( args.bladeYsegs ) || 1;
	    var gridX1 = gridX + 1;
	    var gridY1 = gridY + 1;
	    var segment_width = width / gridX;
	    var segment_height = height / gridY;
	    var ix, iy;
	    // buffers
        var vDat = new BABYLON.VertexData();
	    var indices = vDat.indices = [];
	    var positions = vDat.positions = [];
	    var normals = vDat.normals = [];
	    var uvs = vDat.uvs = [];

        // generate vertices, normals and uvs
	    for ( iy = 0; iy < gridY1; iy ++ ) {
		    var y = iy * segment_height - height_half;
		    for ( ix = 0; ix < gridX1; ix ++ ) {
			    var x = ix * segment_width - width_half;
			    positions.push( x, - y, 0);
			    normals.push( 0, 0, 1 );
			    uvs.push( ix / gridX );
			    uvs.push( 1 - ( iy / gridY ) );
		    }
	    }
        // indices
	    for ( iy = 0; iy < gridY; iy ++ ) {
		    for ( ix = 0; ix < gridX; ix ++ ) {
			    var a = ix + gridX1 * iy;
			    var b = ix + gridX1 * ( iy + 1 );
			    var c = ( ix + 1 ) + gridX1 * ( iy + 1 );
			    var d = ( ix + 1 ) + gridX1 * iy;
			    // faces
			        indices.push( a, b, d, b, c, d);
			        indices.push( d, c, b, d, b, a);                 
		    }
	    }

        var mesh = new BABYLON.Mesh('', scene);
        vDat.applyToMesh(mesh);
        mesh.position.y = height_half;
        mesh.bakeCurrentTransformIntoVertices();

        return mesh;
    },
    Distribute : function(mesh){

        var scene = this.scene;
        mesh.setEnabled(false);
        var meshes = [];        
        var density = this.args.density || 0.2;
        var xp,yp;
        var temp;

        var uvRef = [];
        var deformRef = [];
        var posRef = [];
        var bladeLengthRef = [];

        var gridX = Math.floor( this.args.bladeXsegs ) || 1;
	    var gridY = Math.floor( this.args.bladeYsegs ) || 1;

        var mx = this.args.zoneSize.x,
            my = this.args.zoneSize.y;


        for(var y=0; y<my; y+=density){
            for(var x=0; x<mx; x+=density){
                xp = x-(mx*0.5);yp = y-(my*0.5);
                temp = mesh.clone('temp');
                //temp.position.x = xp;
                //temp.position.z = yp;
                //SET ATTRIBUTE DATA~
                var _scale = randomBetween(0.5, 1.5);
                var _rotate = randomBetween(0, 1);
                var _curve = randomBetween(0.2, 0.8);

                for(var segY=0; segY<=gridY; segY++){
                    var bladePer = 0;
                    if(segY>0){bladePer = segY/gridY};
                    for(var segX=0; segX<=gridX; segX++){                        
                        posRef.push(xp,yp); 
                        uvRef.push(x/mx,y/my);                       
                        deformRef.push(_scale, _rotate, _curve, 0);
                        bladeLengthRef.push(bladePer)
                    }      
                }

                meshes.push(temp);
            }
        }
      

        mesh.dispose();
        mesh = BABYLON.Mesh.MergeMeshes(meshes);
        
        var posRefBuffer = new BABYLON.Buffer(engine, posRef, false, 2);
        mesh.setVerticesBuffer(posRefBuffer.createVertexBuffer("posRef", 0, 2));
        
        var uvRefBuffer = new BABYLON.Buffer(engine, uvRef, false, 2);
        mesh.setVerticesBuffer(uvRefBuffer.createVertexBuffer("uvRef", 0, 2));
        
        var bladeLengthRefBuffer = new BABYLON.Buffer(engine, bladeLengthRef, false, 1);
        mesh.setVerticesBuffer(bladeLengthRefBuffer.createVertexBuffer("bladeLengthRef", 0, 1));

        var deformRefBuffer = new BABYLON.Buffer(engine, deformRef, false, 4);
        mesh.setVerticesBuffer(deformRefBuffer.createVertexBuffer("deformRef", 0, 4));



        console.log(mesh);

        var grassMat = new BABYLON.ShaderMaterial("grass", scene, {
            vertexElement: "grass",
            fragmentElement: "grass",
        },
        {
            attributes: ["position", "uv", "posRef", "bladeLengthRef", "uvRef", "deformRef"],
            samplers:['growthMap'],
            uniforms: ["worldViewProjection", "time", "zoneSize", "bladeHeight"]
        });


        this._time = 0;
        grassMat.setTexture('growthMap', new BABYLON.Texture(growthMapURL, scene));
        grassMat.setVector2('zoneSize', this.args.zoneSize);
        grassMat.setFloat('bladeHeight', this.args.bladeHeight);

        var self = this;
        scene.registerBeforeRender(()=>{
            grassMat.setFloat('time', self._time);
            self._time += self.scene._engine._deltaTime*0.0008;
        });

        mesh.material = grassMat;
       
       this.grasses.push(mesh)
        var _bb = new BABYLON.Mesh.CreateBox('tempBox', 1, scene);
        _bb.scaling = new BABYLON.Vector3(this.args.zoneSize.x, this.args.bladeHeight*2.0, this.args.zoneSize.y);
        _bb.position.y = (this.args.bladeHeight*2.0)*0.5;
        _bb.bakeCurrentTransformIntoVertices();

        mesh._boundingInfo = _bb._boundingInfo;
        _bb.dispose();        

    }
}
