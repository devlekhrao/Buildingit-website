import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface ThreeSimulationProps {
  activeVenture: string;
  onVentureApproach: (ventureId: string | null) => void;
}

export default function ThreeSimulation({ activeVenture, onVentureApproach }: ThreeSimulationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const keysPressed = useRef<Record<string, boolean>>({});
  const [controlsInfo, setControlsInfo] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  useEffect(() => {
    if (!containerRef.current) return;

    // --- SCENE SETUP ---
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f0b08); // Deep Matte Copper Charcoal
    scene.fog = new THREE.FogExp2(0x0f0b08, 0.04);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 5, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);

    // --- LIGHTS ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff3e0, 0.9); // Warm golden sun light
    dirLight.position.set(10, 20, 10);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 40;
    const d = 15;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;
    scene.add(dirLight);

    // Core Ecosystem Central Light (Intense Safety Orange)
    const coreLight = new THREE.PointLight(0xff5500, 2.5, 20);
    coreLight.position.set(0, 3, 0);
    scene.add(coreLight);

    // --- GROUND & GRASS ---
    const groundSize = 40;
    const groundGeo = new THREE.PlaneGeometry(groundSize, groundSize);
    const groundMat = new THREE.MeshStandardMaterial({ 
      color: 0x140f0c, // Dark coppery soil
      roughness: 0.9,
      metalness: 0.1
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Custom Shader Grass (Swaying Amber Field)
    const grassCount = 6000;
    const grassGeo = new THREE.InstancedBufferGeometry();
    
    // Base blade geometry (simple triangle)
    const bladeWidth = 0.12;
    const bladeHeight = 0.6;
    const basePositions = new Float32Array([
      -bladeWidth / 2, 0, 0,
      bladeWidth / 2, 0, 0,
      0, bladeHeight, 0
    ]);
    grassGeo.setAttribute("position", new THREE.BufferAttribute(basePositions, 3));

    // Instanced attributes
    const instOffsets = new Float32Array(grassCount * 3);
    const instScales = new Float32Array(grassCount);
    const instRotations = new Float32Array(grassCount);

    for (let i = 0; i < grassCount; i++) {
      let x = (Math.random() - 0.5) * groundSize;
      let z = (Math.random() - 0.5) * groundSize;
      
      while (Math.sqrt(x*x + z*z) < 2) {
        x = (Math.random() - 0.5) * groundSize;
        z = (Math.random() - 0.5) * groundSize;
      }

      instOffsets[i * 3] = x;
      instOffsets[i * 3 + 1] = 0;
      instOffsets[i * 3 + 2] = z;

      instScales[i] = 0.6 + Math.random() * 0.8;
      instRotations[i] = Math.random() * Math.PI * 2;
    }

    grassGeo.setAttribute("offset", new THREE.InstancedBufferAttribute(instOffsets, 3));
    grassGeo.setAttribute("scaleY", new THREE.InstancedBufferAttribute(instScales, 1));
    grassGeo.setAttribute("rotation", new THREE.InstancedBufferAttribute(instRotations, 1));

    // Grass Shader Material (Industrial Amber Sway)
    const grassMat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        windSpeed: { value: 1.5 },
        coreColor: { value: new THREE.Color(0x1a0a03) }, // Dark bronze/amber base
        tipColor: { value: new THREE.Color(0xff6600) },  // Intense Safety Orange tips
      },
      vertexShader: `
        uniform float time;
        uniform float windSpeed;
        attribute vec3 offset;
        attribute float scaleY;
        attribute float rotation;
        varying vec3 vPosition;
        varying float vHeightPercent;

        void main() {
          float c = cos(rotation);
          float s = sin(rotation);
          vec3 pos = position;
          
          pos.y *= scaleY;

          float rx = pos.x * c - pos.z * s;
          float rz = pos.x * s + pos.z * c;
          pos.x = rx;
          pos.z = rz;

          float heightPercent = position.y / 0.6;
          vHeightPercent = heightPercent;

          float sway = sin(time * windSpeed + offset.x * 0.5 + offset.z * 0.5) * 0.15 * heightPercent * scaleY;
          pos.x += sway;
          pos.z += sway * 0.5;

          vec3 finalPos = pos + offset;
          vPosition = finalPos;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 coreColor;
        uniform vec3 tipColor;
        varying vec3 vPosition;
        varying float vHeightPercent;

        void main() {
          vec3 col = mix(coreColor, tipColor, vHeightPercent);
          col *= 0.6 + 0.4 * vHeightPercent;
          gl_FragColor = vec4(col, 1.0);
        }
      `,
      side: THREE.DoubleSide
    });

    const grassMesh = new THREE.Mesh(grassGeo, grassMat);
    scene.add(grassMesh);

    // --- VENTURE MONOLITHS (Glowing Copper Towers) ---
    const ventures = [
      { id: "purplebat", name: "SilveBat", x: -6, z: -6, color: 0xff4400 }, // Deep Orange
      { id: "first-feedback", name: "FirstFeedback", x: 6, z: -6, color: 0xffaa00 }, // Warm Amber
      { id: "zx", name: "ZX", x: -6, z: 6, color: 0xff6600 }, // Safety Orange
      { id: "pillar", name: "Pillar", x: 6, z: 6, color: 0xff2200 }, // Copper Red
      { id: "grid", name: "Grid", x: 0, z: -10, color: 0xff8800 }, // Vivid Orange
    ];

    const monoliths: THREE.Group[] = [];

    ventures.forEach((v) => {
      const group = new THREE.Group();
      group.position.set(v.x, 0, v.z);

      // Main monolith tower
      const geo = new THREE.BoxGeometry(1.2, 4, 1.2);
      const mat = new THREE.MeshStandardMaterial({
        color: 0x1f140e, // Dark copper metallic
        roughness: 0.4,
        metalness: 0.9,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.y = 2;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);

      // Glowing emblem core
      const glowGeo = new THREE.BoxGeometry(1.25, 0.4, 1.25);
      const glowMat = new THREE.MeshBasicMaterial({
        color: v.color,
      });
      const glowMesh = new THREE.Mesh(glowGeo, glowMat);
      glowMesh.position.y = 3;
      group.add(glowMesh);

      // Point light emitted by monolith
      const light = new THREE.PointLight(v.color, 1.8, 8);
      light.position.set(0, 3, 0);
      group.add(light);

      scene.add(group);
      monoliths.push(group);
    });

    // --- THE CONTROLLABLE HOVER-ROBOT (Industrial Matte Grey & Copper) ---
    const robot = new THREE.Group();
    robot.position.set(0, 0.8, 3);
    scene.add(robot);

    // Robot Body
    const bodyGeo = new THREE.SphereGeometry(0.5, 16, 16);
    bodyGeo.scale(1, 1.2, 1);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x2e2520, // Matte Gunmetal Charcoal
      roughness: 0.4,
      metalness: 0.8
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.castShadow = true;
    body.receiveShadow = true;
    robot.add(body);

    // Glowing Visor (Vivid Safety Orange Eye)
    const visorGeo = new THREE.BoxGeometry(0.6, 0.15, 0.3);
    const visorMat = new THREE.MeshBasicMaterial({ color: 0xff5500 });
    const visor = new THREE.Mesh(visorGeo, visorMat);
    visor.position.set(0, 0.2, 0.4);
    robot.add(visor);

    // Hover Thruster ring
    const ringGeo = new THREE.TorusGeometry(0.3, 0.08, 8, 24);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0x1a1512, roughness: 0.8 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -0.6;
    robot.add(ring);

    // Hover Thruster Light (Orange Jet Flame glow)
    const thrusterLight = new THREE.PointLight(0xff4400, 1.5, 3);
    thrusterLight.position.set(0, -0.8, 0);
    robot.add(thrusterLight);

    // --- KEYBOARD CONTROLS ---
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = true;
      updateControlsInfo();
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false;
      updateControlsInfo();
    };

    const updateControlsInfo = () => {
      setControlsInfo({
        forward: !!(keysPressed.current["w"] || keysPressed.current["arrowup"]),
        backward: !!(keysPressed.current["s"] || keysPressed.current["arrowdown"]),
        left: !!(keysPressed.current["a"] || keysPressed.current["arrowleft"]),
        right: !!(keysPressed.current["d"] || keysPressed.current["arrowright"]),
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // --- ANIMATION LOOP ---
    const clock = new THREE.Clock();
    let currentApproachId: string | null = null;

    const animate = () => {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Update grass wind time uniform
      grassMat.uniforms.time.value = elapsedTime;

      // --- ROBOT MOVEMENT PHYSICS ---
      const speed = 4.5;
      const rotSpeed = 3.0;
      
      let moveForward = 0;
      if (keysPressed.current["w"] || keysPressed.current["arrowup"]) moveForward += 1;
      if (keysPressed.current["s"] || keysPressed.current["arrowdown"]) moveForward -= 1;

      let rotateDir = 0;
      if (keysPressed.current["a"] || keysPressed.current["arrowleft"]) rotateDir += 1;
      if (keysPressed.current["d"] || keysPressed.current["arrowright"]) rotateDir -= 1;

      if (rotateDir !== 0) {
        robot.rotation.y += rotateDir * rotSpeed * delta;
      }

      if (moveForward !== 0) {
        const direction = new THREE.Vector3(0, 0, 1);
        direction.applyQuaternion(robot.quaternion);
        robot.position.addScaledVector(direction, moveForward * speed * delta);
      }

      const limit = groundSize / 2 - 1;
      robot.position.x = Math.max(-limit, Math.min(limit, robot.position.x));
      robot.position.z = Math.max(-limit, Math.min(limit, robot.position.z));

      robot.position.y = 0.8 + Math.sin(elapsedTime * 3) * 0.1;
      body.rotation.y = Math.sin(elapsedTime * 1.5) * 0.05;

      thrusterLight.intensity = 1.2 + Math.sin(elapsedTime * 10) * 0.4;

      // --- DYNAMIC CAMERA TRACKING ---
      const targetCamPos = new THREE.Vector3(0, 3, -5);
      targetCamPos.applyQuaternion(robot.quaternion);
      targetCamPos.add(robot.position);

      camera.position.lerp(targetCamPos, 4 * delta);
      camera.lookAt(robot.position.clone().add(new THREE.Vector3(0, 0.5, 0)));

      // --- APPROACH CHECKER ---
      let closestVenture: string | null = null;
      let minDistance = 3.0;

      ventures.forEach((v) => {
        const dx = robot.position.x - v.x;
        const dz = robot.position.z - v.z;
        const dist = Math.sqrt(dx*dx + dz*dz);
        if (dist < minDistance) {
          closestVenture = v.id;
          minDistance = dist;
        }
      });

      if (closestVenture !== currentApproachId) {
        currentApproachId = closestVenture;
        onVentureApproach(currentApproachId);
      }

      renderer.render(scene, camera);
    };

    animate();

    // --- RESIZE EVENT ---
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // --- CLEANUP ---
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("resize", handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const triggerControl = (key: string, pressed: boolean) => {
    keysPressed.current[key] = pressed;
    const event = new KeyboardEvent(pressed ? "keydown" : "keyup", { key });
    window.dispatchEvent(event);
  };

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full absolute inset-0" />

      {/* HUD Overlay */}
      <div className="absolute top-4 left-4 font-mono text-[9px] text-foreground/40 space-y-1 pointer-events-none bg-background/40 backdrop-blur-md p-3 border border-border/30">
        <div className="text-primary font-bold">ROBOT STATUS: ACTIVE</div>
        <div>SYS_ENGINE: THREE_JS_WEBGL</div>
        <div>AMBER_GRASS: 6,000 BLADES</div>
        <div>BOUNDS: 40x40 METERS</div>
      </div>

      {/* On-screen controls */}
      <div className="absolute bottom-6 right-6 flex flex-col items-center gap-2 bg-background/60 backdrop-blur-md p-4 border border-border/40 shadow-xl">
        <div className="text-[9px] font-mono uppercase tracking-widest text-foreground/50 mb-1 font-bold">Control Pad</div>
        
        {/* Forward */}
        <button 
          onMouseDown={() => triggerControl("w", true)}
          onMouseUp={() => triggerControl("w", false)}
          onTouchStart={() => triggerControl("w", true)}
          onTouchEnd={() => triggerControl("w", false)}
          className={`w-10 h-10 border flex items-center justify-center font-mono text-xs font-bold transition-all select-none ${
            controlsInfo.forward ? "bg-primary text-primary-foreground border-primary" : "bg-card/40 text-foreground border-border/60"
          }`}
        >
          ▲
        </button>

        <div className="flex gap-2">
          {/* Left */}
          <button 
            onMouseDown={() => triggerControl("a", true)}
            onMouseUp={() => triggerControl("a", false)}
            onTouchStart={() => triggerControl("a", true)}
            onTouchEnd={() => triggerControl("a", false)}
            className={`w-10 h-10 border flex items-center justify-center font-mono text-xs font-bold transition-all select-none ${
              controlsInfo.left ? "bg-primary text-primary-foreground border-primary" : "bg-card/40 text-foreground border-border/60"
            }`}
          >
            ◀
          </button>

          {/* Backward */}
          <button 
            onMouseDown={() => triggerControl("s", true)}
            onMouseUp={() => triggerControl("s", false)}
            onTouchStart={() => triggerControl("s", true)}
            onTouchEnd={() => triggerControl("s", false)}
            className={`w-10 h-10 border flex items-center justify-center font-mono text-xs font-bold transition-all select-none ${
              controlsInfo.backward ? "bg-primary text-primary-foreground border-primary" : "bg-card/40 text-foreground border-border/60"
            }`}
          >
            ▼
          </button>

          {/* Right */}
          <button 
            onMouseDown={() => triggerControl("d", true)}
            onMouseUp={() => triggerControl("d", false)}
            onTouchStart={() => triggerControl("d", true)}
            onTouchEnd={() => triggerControl("d", false)}
            className={`w-10 h-10 border flex items-center justify-center font-mono text-xs font-bold transition-all select-none ${
              controlsInfo.right ? "bg-primary text-primary-foreground border-primary" : "bg-card/40 text-foreground border-border/60"
            }`}
          >
            ▶
          </button>
        </div>

        <div className="text-[8px] font-mono text-foreground/40 mt-2">WASD / ARROWS SUPPORTED</div>
      </div>
    </div>
  );
}
