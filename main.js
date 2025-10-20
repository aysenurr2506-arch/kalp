// Temel sahne bileşenlerini ayarlama
let scene, camera, renderer, heartObject;

function init() {
    // 1. Sahne (Scene) Oluşturma
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // Siyah arka plan

    // 2. Kamera (Camera) Oluşturma
    // PerspectiveCamera: FOV (görüş açısı), Aspect Ratio, Near, Far
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // 3. Renderer (Görüntüleyici) Oluşturma
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);

    // Kalp şeklini (Heart Shape) tanımlama
    const heartShape = new THREE.Shape();
    const x = 0, y = 0;

    // Standart bir kalp şeklinin matematiksel çizimi
    heartShape.moveTo(x + 0.25, y + 0.25);
    heartShape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
    heartShape.bezierCurveTo(x - 0.3, y, x - 0.3, y + 0.35, x - 0.3, y + 0.35);
    heartShape.bezierCurveTo(x - 0.3, y + 0.55, x - 0.15, y + 0.65, x, y + 0.85);
    heartShape.bezierCurveTo(x + 0.15, y + 0.65, x + 0.3, y + 0.55, x + 0.3, y + 0.35);
    heartShape.bezierCurveTo(x + 0.3, y + 0.35, x + 0.3, y, x + 0.25, y + 0.25);

    // Geometriyi (Geometry) oluşturma (Kalınlık eklemek için ExtrudeGeometry)
    const geometry = new THREE.ExtrudeGeometry(heartShape, {
        depth: 0.5,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 2,
        bevelSize: 0.1,
        bevelThickness: 0.1
    });
    
    // Malzeme (Material) oluşturma (Kırmızı çizgiler için "wireframe" kullanıyoruz)
    const material = new THREE.MeshBasicMaterial({
        color: 0xff0000, // Kırmızı
        wireframe: true, // Çizgiler (teller) halinde göster
        transparent: true,
        opacity: 0.8
    });

    // Mesh'i (Nesneyi) oluşturma ve sahneye ekleme
    heartObject = new THREE.Mesh(geometry, material);
    heartObject.scale.set(3, 3, 3); // Kalbi biraz büyütme
    scene.add(heartObject);

    // Pencere yeniden boyutlandığında sahneyi ayarlama
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animasyon döngüsü (Ana işlev)
function animate() {
    requestAnimationFrame(animate);

    // Kalbe dönme animasyonu ekleme
    heartObject.rotation.x += 0.005;
    heartObject.rotation.y += 0.01;
    
    renderer.render(scene, camera);
}

// Başlat
init();
animate();
