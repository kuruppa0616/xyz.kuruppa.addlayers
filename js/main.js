const csInterface = new CSInterface();

function init() {
    themeManager.init();

}

function addText2D() {
    csInterface.evalScript('addText(false)');
}

function addText3D() {
    csInterface.evalScript('addText(true)');
}

function addSolid2D() {
    csInterface.evalScript('addSolid(false)');
}

function addSolid3D() {
    csInterface.evalScript('addSolid(true)');
}

function addAdjustment2D() {
    csInterface.evalScript('addAdjustment(false)');
}

function addAdjustment3D() {
    csInterface.evalScript('addAdjustment(true)');
}

function addNull2D() {
    csInterface.evalScript('addNull(false)');
}

function addNull3D() {
    csInterface.evalScript('addNull(true)');
}

function addShape2D() {
    csInterface.evalScript('addShape(false)');
}

function addShape3D() {
    csInterface.evalScript('addShape(true)');
}

function addLight() {
    csInterface.evalScript('addLight()');
}

function addaddOpticalFlares() {
    csInterface.evalScript('addOpticalFlares()');
}

function addElement3D() {
    csInterface.evalScript('addElement3D()');
}

function addParticular() {
    csInterface.evalScript('addParticular()');
}

function addOneNodeCam() {
    csInterface.evalScript('addOneNodeCam()');
}

function addTwoNodeCam() {
    csInterface.evalScript('addTwoNodeCam()');
}

init();