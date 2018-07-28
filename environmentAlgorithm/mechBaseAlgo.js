var createMechBase = function(scene){

    var roof1 = new BABYLON.StandardMaterial("texture3", scene);
    roof1.diffuseTexture = new BABYLON.Texture("https://rawcdn.githack.com/eddicke/chat-example/master/assets/textures/4ab67d7440051fc6392793a6e73d43e8--floor-texture-d-texture.jpg", scene);
    roof1.diffuseTexture.uScale = 15.0; //Repeat 5 times on the Vertical Axes
    roof1.diffuseTexture.vScale = 15.0; //Repeat 5 times on the Horizontal Axes

    var floormat = new BABYLON.StandardMaterial("texture3", scene);
    floormat.diffuseTexture = new BABYLON.Texture("https://rawcdn.githack.com/eddicke/chat-example/master/assets/textures/11733.jpg", scene);
    floormat.diffuseTexture.uScale = 15.0; //Repeat 5 times on the Vertical Axes
    floormat.diffuseTexture.vScale = 15.0; //Repeat 5 times on the Horizontal Axes

    //Define a material
    var f = new BABYLON.StandardMaterial("material0", scene);
    f.diffuseColor = new BABYLON.Color3(0.75, 0, 0);
    // f.diffuseTexture=new BABYLON.Texture("nugget.png",scene);
    var ba = new BABYLON.StandardMaterial("material1", scene);
    ba.diffuseColor = new BABYLON.Color3(0, 0, 0.75);
    var l = new BABYLON.StandardMaterial("material2", scene);
    l.diffuseColor = new BABYLON.Color3(0, 0.75, 0.75);
    var r = new BABYLON.StandardMaterial("material3", scene);
    r.diffuseColor = new BABYLON.Color3(0, 0, 0.75);
    var t = new BABYLON.StandardMaterial("material4", scene);
    t.diffuseColor = new BABYLON.Color3(0, 0.75, 0);
    var bo = new BABYLON.StandardMaterial("material5", scene);
    bo.diffuseColor = new BABYLON.Color3(1, 1, 0);
    //put into one
    var multi = new BABYLON.MultiMaterial("nuggetman", scene);
    multi.subMaterials.push(floormat);
    multi.subMaterials.push(ba);
    multi.subMaterials.push(l);
    multi.subMaterials.push(floormat);
    multi.subMaterials.push(t);
    multi.subMaterials.push(roof1);

    var mat = new BABYLON.StandardMaterial("mat1", scene);
    mat.alpha = 1.0;
    mat.diffuseColor = new BABYLON.Color3(0.5, 0.5, 1.0);
    var roof1 = new BABYLON.StandardMaterial("texture3", scene);
    roof1.diffuseTexture = new BABYLON.Texture("https://rawcdn.githack.com/eddicke/chat-example/master/assets/textures/4ab67d7440051fc6392793a6e73d43e8--floor-texture-d-texture.jpg", scene);
    roof1.diffuseTexture.uScale = 15.0; //Repeat 5 times on the Vertical Axes
    roof1.diffuseTexture.vScale = 15.0; //Repeat 5 times on the Horizontal Axes

    var floormat = new BABYLON.StandardMaterial("texture3", scene);
    floormat.diffuseTexture = new BABYLON.Texture("https://rawcdn.githack.com/eddicke/chat-example/master/assets/textures/11733.jpg", scene);
    floormat.diffuseTexture.uScale = 15.0; //Repeat 5 times on the Vertical Axes
    floormat.diffuseTexture.vScale = 15.0; //Repeat 5 times on the Horizontal Axes

    var wallmat = new BABYLON.StandardMaterial("texture3", scene);
    wallmat.diffuseTexture = new BABYLON.Texture("https://rawcdn.githack.com/eddicke/chat-example/master/assets/textures/techwall.png", scene);
var mechBase = new BABYLON.Mesh("mechBaseContainer", scene)
  var polygons = [];
        var rotations = [];

        for (var p in POLYHEDRA) {

            var polyhedron = POLYHEDRA[p];
            polygons.push(polyhedron)
            console.log(polygons[2])


        }
        var box = new BABYLON.Mesh.CreateBox("b", 48, scene)
        var polygon = BABYLON.MeshBuilder.CreatePolyhedron("nm", {
            custom: polygons[22],
            size: 20
        }, scene);
        polygon.convertToFlatShadedMesh();
        polygon.material = mat;
        box.visibility = .5
        polygon.position.y = 17
        var box2 = new BABYLON.Mesh.CreateBox("b", 48, scene)
        //box2.scaling.set(3.5, .02, 3.5);
        box2.scaling.y = .02
        box2.position.y = 70

        var floor = new BABYLON.Mesh.CreateGround("floor", 6, 6, 2, scene)
        floor.position.y = 34
        floor.scaling.set(27, 4, 27)
        floor.checkCollisions = true;
        floor.material = floormat
        floor.parent = mechBase

        var polygon2 = BABYLON.MeshBuilder.CreatePolyhedron("nm", {
            custom: polygons[22],
            size: 11
        }, scene);
        polygon2.convertToFlatShadedMesh();
        polygon2.material = mat;
        polygon2.rotation.x = 6.699999999999984
        polygon2.rotation.z = 24.95000000000022
        polygon2.position.y = 70
        polygon.rotation.x = 6.699999999999984
        polygon.rotation.z = 24.95000000000022

        var bCSG2 = BABYLON.CSG.FromMesh(box2);
        var aCSG2 = BABYLON.CSG.FromMesh(polygon2);

        var subCSG2 = bCSG2.subtract(aCSG2);
        var base2 = subCSG2.toMesh("csg2", mat, scene);
        base2.scaling.set(3, .2, 3);
        base2.material = roof1

        base2.parent = mechBase
        scene.removeMesh(box2);
        scene.removeMesh(polygon2);
        var bCSG = BABYLON.CSG.FromMesh(box);
        var aCSG = BABYLON.CSG.FromMesh(polygon);

        var subCSG = bCSG.subtract(aCSG);
        var base3 = subCSG.toMesh("csg2", mat, scene);
        base3.checkCollisions = true
        base3.scaling.set(4, 4, 4);
        base3.material = wallmat
        scene.removeMesh(box);
        scene.removeMesh(polygon);
        base2.checkCollisions = true


        var doorways = []
        var doorway1 = new BABYLON.Mesh.CreateBox("entrance", 5, scene)
        doorway1.position.set(74.76132432330792, 41.60067844661461, -2.8924575864059854)
        doorway1.scaling.set(14, 4, 14)
        doorways.push(doorway1)
        var doorway2 = new BABYLON.Mesh.CreateBox("entrance", 5, scene)
        doorway2.position.set(74.76132432330792, 11.60067844661461, -2.8924575864059854)
        doorway2.scaling.set(14, 4, 24)
            doorways.push(doorway2)
        var entrance = new BABYLON.Mesh.MergeMeshes(doorways)
        
        
        
        var bCSG = BABYLON.CSG.FromMesh(base3);
        var aCSG = BABYLON.CSG.FromMesh(entrance);

        var subCSG = bCSG.subtract(aCSG);
        var newWall = subCSG.toMesh("csg2", mat, scene);
        newWall.checkCollisions = true
        newWall.scaling.set(4, 4, 4);
        newWall.material = wallmat
        scene.removeMesh(base3);
        scene.removeMesh(entrance);
        newWall.parent = mechBase

        var createSpawnPoint = function() {
            var box = new BABYLON.Mesh.CreateBox("b", 1.3, scene)
            box.position.z = -.5
            var polygon = BABYLON.MeshBuilder.CreatePolyhedron("nm", {
                custom: polygons[16],
                size: 1
            }, scene);
            polygon.convertToFlatShadedMesh();

            var aCSG = BABYLON.CSG.FromMesh(box);
            var bCSG = BABYLON.CSG.FromMesh(polygon);

            var subCSG = bCSG.subtract(aCSG);
            var base = subCSG.toMesh("csg2", mat, scene);
            scene.removeMesh(box)
            polygon.scaling.set(.87, .87, .87)
            polygon.visibility = .5
            polygon.parent = base
            return base
        }

        var spawnpoint = new createSpawnPoint()
        spawnpoint.scaling.set(20, 20, 20)
        spawnpoint.position.set(1.3491115696702272, 44, 64.65881072193218)

        var spawnpoint2 = new createSpawnPoint()
        spawnpoint2.scaling.set(20, 20, 20)
        spawnpoint2.position.set(1.3491115696702272, 44, -64.65881072193218)
        spawnpoint2.rotation.y = Math.PI

        spawnpoint.parent = mechBase
        spawnpoint2.parent = mechBase
        return mechBase;
}
