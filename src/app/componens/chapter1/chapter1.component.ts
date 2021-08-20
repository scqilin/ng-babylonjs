import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as BABYLON from 'babylonjs';

@Component({
  selector: 'app-chapter1',
  templateUrl: './chapter1.component.html',
  styleUrls: ['./chapter1.component.css']
})
export class Chapter1Component implements OnInit {
  @ViewChild('renderCanvas') renderCanvas: any;
  constructor() { }
  
  ngOnInit(): void {
    
  }
  ngAfterViewInit(): void {
   
      this.initchar();

  }
  initchar(){
  
    var canvas: any = this.renderCanvas.nativeElement;
  
    var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
   
    var createScene = function () {
     
      var scene = new BABYLON.Scene(engine);
      
      var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 3, -6), scene);
      
      camera.setTarget(BABYLON.Vector3.Zero());
      
      camera.attachControl(canvas, false);
      
      const groundMat = new BABYLON.StandardMaterial("groundMat",scene);
      groundMat.diffuseTexture = new BABYLON.Texture("./assets/img/grasslight-big.jpg", scene);
      
      var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
      
      var sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 1, scene, false, BABYLON.Mesh.FRONTSIDE);
      sphere.position.y = 1.5;

      var ground = BABYLON.Mesh.CreateGround('ground1', 4, 4, 2, scene, false);
      ground.material = groundMat;
      const box = BABYLON.MeshBuilder.CreateBox("box", {size:1});
      const boxMat = new BABYLON.StandardMaterial("boxMat",scene);
      boxMat.diffuseTexture = new BABYLON.Texture("./assets/img/brick_diffuse.jpg", scene);
      box.material = boxMat;
      box.position.y = 0.5
     
      setInterval(() => {
        box.rotation.y += 0.01
      }, 30);

      return scene;
    }
    
    var scene = createScene();
    
    engine.runRenderLoop(function () {
      scene.render();
    });
    
  }

}
