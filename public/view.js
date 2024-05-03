document.addEventListener("DOMContentLoaded", function() {
    
    const urlParams = new URLSearchParams(window.location.search);
    const imageUrl = urlParams.get('image');
    const soundUrl = urlParams.get('SoundID');
    console.log(imageUrl,soundUrl);
    if(imageUrl) {
        document.getElementById('selected-image').src = decodeURIComponent(imageUrl);
    } else {
        console.error('No image specified.');
    }

    // Initialize p5 visualization and music playback
    new p5(function (p) {
        let song;
        let symmetry = 16;
        let angle = 360 / symmetry;
        let c=0;
        let lastVol=0;
        let pmx=0;
        let pmy=0;
        p.preload = function() {
            song = p.loadSound(soundUrl); // Replace with your music file path
        };

        p.setup = function() {
            p.createCanvas(p.windowWidth*0.7, p.windowWidth*0.7).parent('p5-canvas');
            p.fft = new p5.FFT();
            p.angleMode(p.DEGREES);
            p.amp = new p5.Amplitude()
        };
        p.mousePressed = function() {
            if(!song.isPlaying()){
            }else{
                p.save(p.month()+"_"+p.day()+"_"+p.hour()+":"+p.minute()+":"+p.second());
            }
        }
        
        document.getElementById('play-button').addEventListener('click', function() {
            if (song.isPlaying()) {
                song.pause();
                isPlaying = false;
            } else {
                song.loop();
                isPlaying = true;
            }
        });
        p.draw = function() {
            // p.background(0);
            let spectrum = p.fft.analyze();
            let vol = p.amp.getLevel();
            console.log(p.cos(c));
            let len=p.map(vol,0,0.4,0,p.width/2);
            p.noStroke();
            p.push();
            p.translate(p.width / 2, p.height / 2);
            let mx = len*p.cos(c);
            let my = len*p.sin(c) ;
            p.stroke(p.random(130, 225), p.random(130, 225), p.random(150, 225));
            for (let i = 0; i < symmetry; i++) {
                p.rotate(angle);
                var ds = p.dist(mx, my, pmx, pmy);
                let sw = p.map(ds, 0, 8, 18, 5);
                p.strokeWeight(sw);
                p.line(mx, my, pmx, pmy);
                p.push();
                p.scale(1, -1);
                p.line(mx, my, pmx, pmy);
                p.pop();
            }
            lastVol=vol;
            c=c+p.map(spectrum[0],0,255,5,15);
            c=c%360;
            pmx=mx;
            pmy=my;
            p.pop();
        };
    });
});
