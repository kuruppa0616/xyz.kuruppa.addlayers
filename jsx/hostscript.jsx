var myActiveItem;
var selectedLayer;
var solidColor = [0, 0, 0];

//現在アクティブなプロジェクトとレイヤーを取得
function getStates() {
    try {
        myActiveItem = app.project.activeItem;
        selectedLayer = app.project.activeItem.selectedLayers;
    } catch (e) {
        alert("コンポを選択して")
        exit();
    }

}
//1ノードカメラ作成
function addOneNodeCam(threeD) {
    app.beginUndoGroup("AddLayers");
    getStates();
    var newCam = myActiveItem.layers.addCamera("1nodeCam", [0, 0]);
    newCam = setFromSelectedLayer(newCam, threeD);
    //カメラPosition設定
    newCam.position.setValue([myActiveItem.width / 2, myActiveItem.height / 2, -1777.7778]);
    //1ノードカメラに設定
    newCam.pointOfInterest.expression = "transform.position"
    app.endUndoGroup();
}

//2ノードカメラ作成
function addTwoNodeCam(threeD) {
    app.beginUndoGroup("AddLayers");
    getStates();
    var newCam = myActiveItem.layers.addCamera("2nodeCam", [0, 0]);
    newCam = setFromSelectedLayer(newCam, threeD);
    //カメラPosition設定
    newCam.position.setValue([myActiveItem.width / 2, myActiveItem.height / 2, -1777.7778]);
    newCam.pointOfInterest.setValue([myActiveItem.width / 2, myActiveItem.height / 2, 0]);
    app.endUndoGroup();
}

//平面作成
function addSolid(threeD) {
    app.beginUndoGroup("AddLayers");
    getStates();
    var newSolid = myActiveItem.layers.addSolid(solidColor, "solid", myActiveItem.width, myActiveItem.height, myActiveItem.pixelAspect);
    //newSolid.blendingMode =  BlendingMode.SCREEN;
    newSolid = setFromSelectedLayer(newSolid, threeD);
    app.endUndoGroup();
}
// ヌル作成
function addNull(threeD) {
    app.beginUndoGroup("AddLayers");
    getStates();
    var newNull = myActiveItem.layers.addNull();
    newNull = setFromSelectedLayer(newNull, threeD);
    app.endUndoGroup();
}
// テキスト作成
function addText(threeD) {
    app.beginUndoGroup("AddLayers");
    getStates();
    var newText = myActiveItem.layers.addText();
    newText = setFromSelectedLayer(newText, threeD);
    app.endUndoGroup();
}

function addText2(text) {
    app.beginUndoGroup("AddLayers");
    getStates();
    var newText = myActiveItem.layers.addBoxText([200, 200], new TextDocument(text));
    newText = setFromSelectedLayer(newText, false);
    app.endUndoGroup();

}
// ライト作成
function addLight() {
    app.beginUndoGroup("AddLayers");
    getStates();
    var newLight = myActiveItem.layers.addLight("light", [myActiveItem.width / 2, myActiveItem.height / 2]);
    newLight = setFromSelectedLayer(newLight, false);
    app.endUndoGroup();
}
// シェイプ作成
function addShape(threeD) {
    app.beginUndoGroup("AddLayers");
    getStates();
    var newShape = myActiveItem.layers.addShape();
    newShape = setFromSelectedLayer(newShape, threeD);
    app.endUndoGroup();
}
// 調整レイヤー作成
function addAdjustment(threeD) {
    app.beginUndoGroup("AddLayers");
    getStates();
    var newAdjustment = myActiveItem.layers.addSolid(solidColor, "Adjustment", myActiveItem.width, myActiveItem.height, myActiveItem.pixelAspect);
    newAdjustment = setFromSelectedLayer(newAdjustment, threeD);
    newAdjustment.adjustmentLayer = true;
    newAdjustment.label = 5;
    app.endUndoGroup();
}

//OpticalFlaresを適用した平面作成
function addOpticalFlares() {
    app.beginUndoGroup("AddLayers");
    getStates();
    var newSolid = myActiveItem.layers.addSolid(solidColor, "OpticalFlares", myActiveItem.width, myActiveItem.height, myActiveItem.pixelAspect);
    newSolid.blendingMode = BlendingMode.SCREEN;

    //プラグインが導入されていない、エラー画面を表示して生成した平面を削除する
    try {
        newSolid.property("ADBE Effect Parade").addProperty("VIDEOCOPILOT OpticalFlares");
    } catch (e) {
        alert("OpticalFlaresが導入されていません。Andrewに貢ぎましょう")
        newSolid.remove();
    }
    newSolid = setFromSelectedLayer(newSolid, false);
    app.endUndoGroup();

}
//Element3Dを適用した平面作成
function addElement3D() {
    app.beginUndoGroup("AddLayers");
    getStates();
    var newSolid = myActiveItem.layers.addSolid(solidColor, "E3D", myActiveItem.width, myActiveItem.height, myActiveItem.pixelAspect);

    //プラグインが導入されていない、エラー画面を表示して生成した平面を削除する
    try {
        newSolid.property("ADBE Effect Parade").addProperty("VIDEOCOPILOT 3DArray");
    } catch (e) {
        alert("Element3Dが導入されていません。Andrewに貢ぎましょう")
        newSolid.remove();
    }

    newSolid = setFromSelectedLayer(newSolid, false);
    app.endUndoGroup();
}
//Particularを適用した平面作成
function addParticular() {
    app.beginUndoGroup("AddLayers");
    getStates();
    var newSolid = myActiveItem.layers.addSolid(solidColor, "Particular", myActiveItem.width, myActiveItem.height, myActiveItem.pixelAspect);

    //プラグインが導入されていない、エラー画面を表示して生成した平面を削除する
    try {
        newSolid.property("ADBE Effect Parade").addProperty("tc Particular");
    } catch (e) {
        alert("Particularが導入されていません。Red Giantに貢ぎましょう")
        newSolid.remove();
    }

    newSolid = setFromSelectedLayer(newSolid, false);
    app.endUndoGroup();
}

//レイヤーを選択している場合、その上にデュレーションに合わせ作成
//threeDがtrueの場合3Dレイヤーに変更
function setFromSelectedLayer(item, threeD) {
    if (selectedLayer[0] !== undefined) {
        item.inPoint = selectedLayer[0].inPoint;
        item.outPoint = selectedLayer[0].outPoint;
        item.moveBefore(selectedLayer[0]);
    }
    if (threeD) {
        item.threeDLayer = true;
    }
    return item;
}


