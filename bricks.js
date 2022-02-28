var createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI/2 , Math.PI/2, 20, BABYLON.Vector3.Zero(), scene);
    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

    var mat = new BABYLON.StandardMaterial("mat", scene);
    var texture = new BABYLON.Texture("textures/albedo.png", scene);
    mat.diffuseTexture = texture;

    const eqTexture = new BABYLON.EquiRectangularCubeTexture('textures/equirectangular.jpg', scene, 2);

    const groundmat = new BABYLON.PBRMaterial("groundmetal", scene);
    groundmat.reflectionTexture = eqTexture;
    groundmat.refractionTexture = eqTexture;
    groundmat.microSurface = 1.0;
    groundmat.reflectivityColor = new BABYLON.Color3(0.05, 0.8, 0.86);
    groundmat.albedoColor = new BABYLON.Color3(0.06, 0.64, 0.79);

    const ground = BABYLON.MeshBuilder.CreateGround("ground", {height: 20.5, width: 20.5, subdivisions: 10});
    ground.position.y -= 0.5;
    ground.material = groundmat;

    const bord1 = BABYLON.MeshBuilder.CreateBox("box", {});
    bord1.position.z -= 10.5;
    bord1.scaling =  new BABYLON.Vector3(20, 1, 1)
    bord1.material = groundmat;

    const bord2 = BABYLON.MeshBuilder.CreateBox("box", {});
    bord2.position.z += 10.5;
    bord2.scaling =  new BABYLON.Vector3(20, 1, 1)
    bord2.material = groundmat;

    const bord3 = BABYLON.MeshBuilder.CreateBox("box", {});
    bord3.position.x -= 10.5;
    bord3.scaling =  new BABYLON.Vector3(1, 1, 22)
    bord3.material = groundmat;

    const bord4 = BABYLON.MeshBuilder.CreateBox("box", {});
    bord4.position.x += 10.5;
    bord4.scaling =  new BABYLON.Vector3(1, 1, 22)
    bord4.material = groundmat;

    const metal = new BABYLON.PBRMaterial("metal", scene);
        metal.reflectionTexture = texture;
        metal.microSurface = 0.96;
        metal.reflectivityColor = new BABYLON.Color3(0.85, 0.85, 0.85);
        metal.albedoColor = new BABYLON.Color3(0.01, 0.01, 0.01);
        
    var fireMaterial = new BABYLON.StandardMaterial("fontainSculptur2", scene);
    var fireTexture = new BABYLON.FireProceduralTexture("fire", 256, scene);
    fireMaterial.diffuseTexture = fireTexture;
    fireMaterial.opacityTexture = fireTexture;

    snake_list = [];
    //snake_list[0] = BABYLON.MeshBuilder.CreateBox("box", {height: 1, width: 1, depth: 1});
    //snake_list[0].material = fireMaterial;

    const metalball = new BABYLON.PBRMaterial("metalball", scene);
    metalball.reflectionTexture = eqTexture;
    metalball.refractionTexture = eqTexture;
    metalball.microSurface = 1.0;
    metalball.reflectivityColor = new BABYLON.Color3(0.93, 0.46, 0.02);
    metalball.albedoColor = new BABYLON.Color3(1, 0, 0);

    let rack = BABYLON.Mesh.CreateSphere("sphereMetal", 48, 1.0, scene);
    rack.material = metalball;
    rack.scaling = new BABYLON.Vector3(8.0, 1.0, 0.5);
    rack.position.x = 0.0;
    rack.position.z = -9.5;

    const metalballr = new BABYLON.PBRMaterial("metalballr", scene);
    metalballr.reflectionTexture = eqTexture;
    metalballr.refractionTexture = eqTexture;
    metalballr.microSurface = 1.0;
    metalballr.reflectivityColor = new BABYLON.Color3(1, 0, 0);
    metalballr.albedoColor = new BABYLON.Color3(1, 0, 0);

    var xb = -8.0;
    var zb = 9.5;
    let NB_BRICKS = 100;
    bricks = [];
    for(var i = 0;i < NB_BRICKS;i++){
        let brick = BABYLON.Mesh.CreateSphere("sphereMetal", 48, 1.0, scene);
        brick.material = metalballr;
        brick.scaling = new BABYLON.Vector3(4.0, 1.0, 0.5);
        brick.position.x = xb;
        brick.position.z = zb;
        bricks.push(brick);
        
        xb += 4.0;
        if(xb > 8.5){
            zb -= 0.50;
            xb = -8.0;
        }

    }
    
    let ball = BABYLON.Mesh.CreateSphere("sphereBall", 48, 1.0, scene);
    ball.material = metalballr;
    ball.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
    ball.position.x = 0;
    ball.position.z = -5.0;

    /****debug ball  */
    /*let ball2 = BABYLON.Mesh.CreateSphere("sphereBall2", 48, 1.0, scene);
    ball2.material = metalballr;
    ball2.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);*/
    


    /**************keyborad */
    const dsm = new BABYLON.DeviceSourceManager(engine);
  


    /*********************************** */

    /*********************Text************ */
    // Create and configure textblock with instructions
    const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    const controlsText = new BABYLON.GUI.TextBlock();
    controlsText.text = "Score : 0";
    controlsText.color = "white";
    controlsText.fontStyle = "bold";
    controlsText.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    controlsText.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    controlsText.fontSize = 24;
    advancedTexture.addControl(controlsText);

    //win
    const winText = new BABYLON.GUI.TextBlock();
    winText.text = "Gagné";
    winText.color = "white";
    winText.fontStyle = "bold";
    winText.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    winText.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    winText.fontSize = 50;

    const loseText = new BABYLON.GUI.TextBlock();
    loseText.text = "Perdu";
    loseText.color = "white";
    loseText.fontStyle = "bold";
    loseText.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    loseText.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    loseText.fontSize = 50;

    /******************************************** */

    /*********************game variable ****** */
    RX = 0;
    RZ = -9.5;
    R_height = 0.5;
    R_width = 8.0;
    rack_X = 0;
    rack_speed = 1.0;
    lastt = 0, lastt2 = 0, startt = 0;
    ecartt = 100;
    BX = 2;
    BZ = -4.0;
    BX_speed = 1;
    BZ_speed = 1;
    BZ_spin = 0.25;
    B_Dir = 4;
    B_contact = 0;
    B_count = 0;
    game_play = false;
    game_end = 1;
    score = 0;
    /**************************************** */

    scene.onKeyboardObservable.add((kbInfo) => {
        switch (kbInfo.type) {
            case BABYLON.KeyboardEventTypes.KEYDOWN:
            //console.log("KEY DOWN: ", kbInfo.event.key);
                switch(kbInfo.event.key){
                    case 'q':
                        rack_X = -rack_speed;
                        
                        break;
                    case 'd':
                        rack_X = rack_speed;
                       
                        break;

                }
            break;
            case BABYLON.KeyboardEventTypes.KEYUP:
            //console.log("KEY UP: ", kbInfo.event.code);
                switch(kbInfo.event.key){
                    case 'q':
                        rack_X = 0;
                        break;
                    case 'd':
                        rack_X = 0;
                        break;

                }
            break;
        }
        });

    scene.registerBeforeRender(() => {
        
        var t = Date.now() - lastt;
       
        //RX = BX;
        RX += rack_X * t/50;
        if(rack.position.x < -8.5)
            RX = -8.5;
        if(rack.position.x > 8.5)
            RX = 8.5; 
        rack.position.x = RX;

        
        

        lastt = Date.now();

      
        
        

        if (dsm.getDeviceSource(BABYLON.DeviceType.Keyboard)) {
           
            if (dsm.getDeviceSource(BABYLON.DeviceType.Keyboard).getInput(97) == 1) {
                ecartt = 100;
            }
            if (dsm.getDeviceSource(BABYLON.DeviceType.Keyboard).getInput(98) == 1) {//left
                ecartt = 75;
            }
            if (dsm.getDeviceSource(BABYLON.DeviceType.Keyboard).getInput(99) == 1) {//right
                ecartt = 50;
            }
            if (dsm.getDeviceSource(BABYLON.DeviceType.Keyboard).getInput(32) == 1) {
                if(game_end){
                    game_play = true;
                    game_end = 0;
                    startt = Date.now();
                }
            }
            if (dsm.getDeviceSource(BABYLON.DeviceType.Keyboard).getInput(82) == 1) {
                
                var xb = -8.0;
                var zb = 9.5;
                               
                for(var i = 0;i < NB_BRICKS;i++){
                    if(bricks[i] == null){
                        let brick = BABYLON.Mesh.CreateSphere("sphereMetal", 48, 1.0, scene);
                        brick.material = metalballr;
                        brick.scaling = new BABYLON.Vector3(4.0, 1.0, 0.5);
                        brick.position.x = xb;
                        brick.position.z = zb;
                        bricks[i] = brick;
                    }
                    
                    xb += 4.0;
                    if(xb > 8.5){
                        zb -= 0.5;
                        xb = -8.0;
                    }

                }

                R_height = 0.5;
                R_width = 8.0;
                BX = 2;
                BZ = -4.0;
                B_Dir = 4;
                game_play = false;
                game_end = 1;
                B_count = 0;
                score = 0;
                advancedTexture.removeControl(loseText);
                advancedTexture.removeControl(winText);
                 
            }
        }

    });

   
    scene.registerAfterRender(()=>{

        var t = Date.now() - lastt2;

        if(game_play){
            B_contact = 0;
            for(var i = 0;i < NB_BRICKS;i++){
                if(bricks[i] != null){
                    if(bricks[i].intersectsMesh(ball, false)){
                        bricks[i].dispose();
                        bricks[i] = null;

                        var bd = Math.random() * 4.0;
                        if(bd >= 0 && bd < 1){
                            B_Dir = 1;
                        }
                        else if(bd >= 1 && bd < 2){
                            B_Dir = 2;
                        }
                        else if(bd >= 2 && bd < 3){
                            B_Dir = 3;
                        }
                        else if(bd >= 3 && bd < 4){
                            B_Dir = 4;
                        }
                       
                        if (B_Dir == 1)
                            B_Dir = 4;
                        else if(B_Dir == 2)
                            B_Dir = 3;
                        else if (B_Dir == 3){
                            B_Dir = 2
                            
                        }
                        else if(B_Dir == 4)
                            B_Dir = 1

                        score += 100;
                        controlsText.text = "Score : " + score;
                        B_count++;
                        if(B_count == NB_BRICKS){
                            advancedTexture.addControl(winText);
                            game_end = 1;
                            B_count = 0;

                            t = (Date.now()-startt);
                            bonust = t > 120000 ? 120000 : t;
                            console.log(t);
                            score += Math.floor((120000-bonust)*80000/100000);
                            controlsText.text = "Score : " + score;
                        }

                        break;
                    }

                }


            }


           
                if(BZ < -9.5){
                    BZ = -9.5;
                    if (B_Dir == 1)
                        B_Dir = 4;
                    else if(B_Dir == 2)
                        B_Dir = 3;
                }
                else if(BZ > 9.5){
                    BZ = 9.5;
                    if (B_Dir == 3){
                        B_Dir = 2
                        //console.log(2);
                    }
                    else if(B_Dir == 4)
                        B_Dir = 1
                }
                if(BX < -9.5){
                    BX = -9.5;
                    if (B_Dir == 1)
                        B_Dir = 2
                    else if (B_Dir == 4)
                        B_Dir = 3
                }
                else if(BX > 9.5){	
                    BX = 9.5;	
                    if (B_Dir == 2)
                        B_Dir = 1
                    else if (B_Dir == 3)
                        B_Dir = 4
                }
            

            if(B_Dir == 1){
                BX += -BX_speed* t/ecartt ;
                BZ += -(BZ_speed + BZ_spin)* t/ecartt ;
            }	
            else if(B_Dir == 2){
                BX += BX_speed* t/ecartt;
                BZ += -(BZ_speed + BZ_spin)* t/ecartt;
            }	
            else if(B_Dir == 3){
                BX += BX_speed* t/ecartt;
                BZ += (BZ_speed + BZ_spin)* t/ecartt;
            }	
            else if(B_Dir == 4){
                BX += -BX_speed* t/ecartt;
                BZ += (BZ_speed + BZ_spin)* t/ecartt;
            }
            else if(B_Dir == 5){
                BX += 0;
                BZ += 0;
            }
                
            

        //console.log(BX + ' ' + BZ);
            //console.log('Bdir ' + B_Dir + ' ' + (-BX_speed* t/50));
            ball.position.x = BX;
            ball.position.z = BZ;

        
        }

        //ball2.position.x = RX-R_width/2;
        //ball2.position.z =-9.5 + R_height;

        if (BZ  < (-9.5 + 0.25) && !game_end){
			if (BX >= (RX-R_width/1.75) && BX <= (RX+R_width/1.75)){
				BY_speed = 1.0
				BY_spin = Math.random()*3.0;
				BX_spin = Math.random()*3.0;
				
            }
			else{
				B_Dir = 5
				game_play = false;
                game_end = 1;
                advancedTexture.addControl(loseText);
            }

        }
        
        lastt2 = Date.now();

        

    });





    return scene;
};
