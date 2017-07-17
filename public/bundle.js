(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){


var d = [];
var num = 0;
var sum = 40;
var falled = 0;
var des;
var camPos;
var increment = 10;
var flag;
var rx, ry, rz;
var myDiv;
var ax, ay, az;
var distance = 140;
var rotateOfCam;
var rotateCamIndex;
var distOfRotate;

function setup() {
    $("#intro").click(function() {
        if ($("#introDiv").css("display") == "none") {
            $("#introDiv").css('display', 'block')
        } else {
            $("#introDiv").css('display', 'none')
        }
    })
    $("#introImg").click(function() {
        if ($("#introDiv").css("display") == "none") {
            $("#introDiv").css('display', 'block')
        } else {
            $("#introDiv").css('display', 'none')
        }
    })
    rotateOfCam = 0;
    distOfRotate = 0;
    rotateCamIndex = 0;
    createCanvas(window.innerWidth, window.innerHeight, WEBGL);
    // rr = createDiv('this is some text');
    // aa = createDiv('this is some text');
    flag = false;
    des = createVector(0, 0, 0)
    camPos = createVector(0, -200, -300)
    for (var i = 0; i < sum; i++) {
        d.push(new domino(0, 0, i, num))
        num += 1;
    }
    d[0].falling = false;
    // d[1].falling = true;
    // button = createButton('SwitchO On');
    // button.position(19, height-39);
    // button.mouseClicked(SwitchOn);
    // button.mousePressed(SwitchOff);
    rx = 0
    ry = 0
    rz = 0
    ax = 0
    ay = 0
    az = 0
    print(myDiv)
}

function SwitchOn() {
    flag = !flag
}

// function SwitchOff() {
//     flag = false
// }


window.ondevicemotion = function(event) {
    // for (var i = 0; i < particles.length; i++) {
    //     particles[i].acc.x = event.accelerationIncludingGravity.x;
    //     particles[i].acc.y = event.accelerationIncludingGravity.y;
    // }
    accelerationX = event.accelerationIncludingGravity.x;
    accelerationY = event.accelerationIncludingGravity.y;
    accelerationZ = event.accelerationIncludingGravity.z;
    rX = event.rotationRate.alpha;
    rY = event.rotationRate.beta;
    rZ = event.rotationRate.gamma;
    rx = rX
    ry = rY
    rz = rZ
    ax = accelerationX;
    ay = accelerationY
    az = accelerationZ
}

function draw() {
    //Control----------------------------------------------------
    // pointLight(200, 200, 200, 100,400,-100);
    ambientLight(198);
    // if (mouseIsPressed === true) {
    //     flag = true
    //     d[0].falling = true;
    // } else {
    //     flag = false;
    // }
    if (flag && increment <= 15) {
        increment += 0.2;
    } else if (!flag) {
        increment = 5
    }
    if (ay > -4 && ay < 1) {
        flag = true
        d[0].falling = true;
    } else {
        flag = false;
    }
    rotateOfCam = -Math.atan(-Math.cos(falled * 0.2)) / 3;
    //------------------------------------------------
    // aa.html(Math.floor(ax) + " " + Math.floor(ay) + " " + Math.floor(az));
    background(200);
    // rotateX(PI );
    rotateX(PI / 7);
    distOfRotate = rotateOfCam - rotateCamIndex;
    rotateCamIndex += distOfRotate * 0.05

    // rotateY(d[falled].camAngle);
    rotateY(rotateCamIndex);
    camera(camPos.x, camPos.y - 150, camPos.z);
    for (var i = 0; i < d.length; i++) {

        d[i].update()
        if (d[i].id == falled) {
            if (flag == true) {
                d[i].falling = true;
            }
        }
    }

    if (d.length < 40) {
        d.push(new domino(0, 0, num, num))
        num += 1;
    }
    des.z = -falled * distance
    des.x = 300 * sin(falled * 0.2);
    push()
    translate(0, 0, des.z);
    // sphere(100);
    pop()
    var temp = p5.Vector.sub(des, camPos)
    if (camPos.dist(des) > 1)
        camPos.add(temp.mult(0.09));
    // print(d[0].distToCam)
    // print(falled + ' ' + d[d.length - 1].id + "flag " + flag)
}

function domino(x, y, z, id) {

    this.id = id;
    this.camAngle = -Math.atan(-Math.cos(falled * 0.2)) / 3;
    this.angle = 0;
    this.falling = false;
    this.x = x;
    this.y = y;
    this.z = z;
    this.isDeleting = false;
    this.distToCam = Math.sqrt(
        (this.x - camPos.x) * (this.x - camPos.x) +
        (this.y - 100 - camPos.y + 150) * (this.y - 100 - camPos.y + 150) +
        (-this.z * distance - camPos.z) * (-this.z * distance - camPos.z)
    );
    this.update = function() {
        this.camAngle = -Math.atan(-Math.cos(this.id * 0.2)) / 3;
        ambientMaterial(this.distToCam / 6 - 50);
        this.distToCam = Math.sqrt(
            (this.x - camPos.x) * (this.x - camPos.x) +
            (this.y - 100 - camPos.y + 150) * (this.y - 100 - camPos.y + 150) +
            (-this.z * distance - camPos.z) * (-this.z * distance - camPos.z)
        );
        push()
        translate(this.x, this.y - 100, -this.z * distance)
        if (this.falling && this.angle < 70) {
            this.angle += increment;
        } else if (this.angle >= 30 && (!this.isDeleting)) {
            falled += 1;
            setTimeout(function() {
                d.shift();
            }, 500)
            this.isDeleting = true;
        }
        rotateY(Math.atan(-Math.cos(id * 0.2)) / 2);
        rotateX(-0.02 * this.angle);
        translate(300 * Math.sin(id * 0.2), -100, 0)
        box(100, 200, 10);
        pop()
    }
}

},{}]},{},[1]);
