var isPressed=false;
var isEnder=false;

var localAge=0;
var lastAge=0;

function init(entity, model) {
    var bones=[
        model.getBone("right_wing"),
        model.getBone("left_wing")
    ];
    lastAge=entity.getAge();
    localAge=entity.getAge();
    //model.getBone("body_c").physicalize(0, 5, 0.8, 0, 0);
}

function tick(entity, model) {
    var bones=[
        model.getBone("right_wing"),
        model.getBone("left_wing"),
        model.getBone("body_c")
    ];
    var v=Math.pow(Math.pow(entity.getMotionX(),2)+Math.pow(entity.getMotionZ(),2),1/2);
    localAge+=  Math.min(Math.max((entity.getAge()-lastAge)*v*2,(entity.getAge()-lastAge)*0.12),(entity.getAge()-lastAge)*0.6);
    lastAge=entity.getAge();
    bones[0].setRotationY(Math.cos(localAge) * 15 - 40);
    bones[1].setRotationY(-Math.cos(localAge) * 15 + 40);
    bones[2].setRotationX(Math.min(v*200,65));
    if(entity.isCustomKeyDown(0)&&!isPressed)
    {
        isPressed=true;
        var texture = isEnder ? "allay_texture" : "allay_textureCorrupt";
        model.setTexture("Allay",texture);
        isEnder=!isEnder;
    }
    else if(!entity.isCustomKeyDown(0)&&isPressed)
        isPressed=false;
    
}