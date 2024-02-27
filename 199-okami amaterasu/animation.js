// all variables
	//pointer to bones
var tail_1;
var issun;
var head_c;
var head;
var top_maw;
var bot_maw;
var full_model;

	//weapons
var mirror;
var mirror_anim;
var bullet;
var bulletcolar;
var sword;
var sword_anim;
var the_ring;
var weapon;
var body_sword;
var sword_tex = ["wooden_sword", "stone_sword", "iron_sword", "golden_sword", "diamond_sword", "netherite_sword"];

	//all leg bones
var left_front_leg_c;
var left_front_leg_2;
var left_front_paw;
var right_front_leg_c;
var right_front_leg_2;
var right_front_paw;
var left_back_leg_c;
var left_back_leg_2;
var left_back_leg_3;
var left_back_paw;
var right_back_leg_c;
var right_back_leg_2;
var right_back_leg_3;
var right_back_paw;

var left_front_leg;

	//varibles to handle walking animation
var walkingtest;
var isrealywalking;
var lastlimb;
var isslowingdown;
var swing;
var rotation;
var body_angle;
var state;
var conv = 0.95;
var walking_timer;
var counter_rotation;
var swing_timer;

//when running, you go 1.33 faster
function speed(entity)
{
	if(entity.isSprinting())
	{
		return 1.33;
	}
	else
	{
		return 1;
	}
}

function animation_position_walk(entity,anim_moment,frame,bone,original_positionX,original_positionY,original_positionZ){
    for (var i=0; i<frame.length-2;i=i+2){
        if (anim_moment>=(frame[i]*20)&&anim_moment<=(frame[i+2]*20)){
			var res_1 = frame[i+1][0]+(anim_moment-(frame[i]*20))*(frame[i+3][0]-frame[i+1][0])/((frame[i+2]*20)-(frame[i]*20));
            var res_2 = frame[i+1][1]+(anim_moment-(frame[i]*20))*(frame[i+3][1]-frame[i+1][1])/((frame[i+2]*20)-(frame[i]*20));
            var res_3 = frame[i+1][2]+(anim_moment-(frame[i]*20))*(frame[i+3][2]-frame[i+1][2])/((frame[i+2]*20)-(frame[i]*20));
            bone.setPosition(res_1+original_positionX,res_2+original_positionY,res_3+original_positionZ);
        }
    }
}

function animation_rotation_walk(entity,anim_moment,frame,bone,original_positionX,original_positionY,original_positionZ){
    for (var i=0; i<frame.length-2;i=i+2){
        if (anim_moment>=(frame[i]*20)&&anim_moment<=(frame[i+2]*20)){
			var res_1 = frame[i+1][0]+(anim_moment-(frame[i]*20))*(frame[i+3][0]-frame[i+1][0])/((frame[i+2]*20)-(frame[i]*20));
            var res_2 = frame[i+1][1]+(anim_moment-(frame[i]*20))*(frame[i+3][1]-frame[i+1][1])/((frame[i+2]*20)-(frame[i]*20));
            var res_3 = frame[i+1][2]+(anim_moment-(frame[i]*20))*(frame[i+3][2]-frame[i+1][2])/((frame[i+2]*20)-(frame[i]*20));
            bone.setRotation(res_1+original_positionX,res_2+original_positionY,res_3+original_positionZ);
        }
    }
}
function animation_catmullrom_rotation(entity,anim_moment,frame,total_time,bone,original_positionX,original_positionY,original_positionZ){
    for (var i=0; i<frame.length-2;i=i+2){
        if (anim_moment>=(frame[i]*20)&&anim_moment<=(frame[i+2]*20)){
			var t = (anim_moment-(frame[i]*20))/(frame[i+2]*20-frame[i]*20)
            var res_1 = frame[i+1][0][0]*Math.pow(t, 3) + frame[i+1][0][1]*Math.pow(t, 2) + frame[i+1][0][2]*t + frame[i+1][0][3];
            var res_2 = frame[i+1][1][0]*Math.pow(t, 3) + frame[i+1][1][1]*Math.pow(t, 2) + frame[i+1][1][2]*t + frame[i+1][1][3];
            var res_3 = frame[i+1][2][0]*Math.pow(t, 3) + frame[i+1][2][1]*Math.pow(t, 2) + frame[i+1][2][2]*t + frame[i+1][2][3];
            bone.setRotation(res_1+original_positionX,res_2+original_positionY,res_3+original_positionZ);
        }
    }
}
function animation_catmullrom_position(entity,anim_moment,frame,total_time,bone,original_positionX,original_positionY,original_positionZ){
    for (var i=0; i<frame.length-2;i=i+2){
        if (anim_moment>=(frame[i]*20)&&anim_moment<=(frame[i+2]*20)){
            var t = (anim_moment-(frame[i]*20))/(frame[i+2]*20-frame[i]*20)
            var res_1 = frame[i+1][0][0]*Math.pow(t, 3) + frame[i+1][0][1]*Math.pow(t, 2) + frame[i+1][0][2]*t + frame[i+1][0][3];
            var res_2 = frame[i+1][1][0]*Math.pow(t, 3) + frame[i+1][1][1]*Math.pow(t, 2) + frame[i+1][1][2]*t + frame[i+1][1][3];
            var res_3 = frame[i+1][2][0]*Math.pow(t, 3) + frame[i+1][2][1]*Math.pow(t, 2) + frame[i+1][2][2]*t + frame[i+1][2][3];
            bone.setPosition(res_1+original_positionX,res_2+original_positionY,res_3+original_positionZ);
        }
    }
}

function init(entity, model) 
{
	model.getBone("left_front_fluff").physicalize(0,1,0.5,0,0.1);
	model.getBone("right_front_fluff").physicalize(0,1,0.5,0,0.1);
	model.getBone("left_front_fluff_2").physicalize(0,1,0.5,0,0.1);
	model.getBone("right_front_fluff_2").physicalize(0,1,0.5,0,0.1);
	model.getBone("left_back_fluff").physicalize(0,1,0.5,0,0.1);
	model.getBone("right_back_fluff").physicalize(0,1,0.5,0,0.1);
	model.getBone("tail_1").physicalize(1,0.9,0.8,0.2,0.2);
	model.getBone("tail_2").physicalize(2,0.9,0.99,0.3,0.2);
	model.getBone("tail_3").physicalize(1,0.9,0.99,0.3,0.3);
	model.getBone("tail_4").physicalize(1,0.9,0.99,0.3,0.3);
	left_front_leg_c = model.getBone("left_front_leg_c");
	left_front_leg_2 = model.getBone("left_front_leg_2");
	left_front_paw = model.getBone("left_front_paw");
	right_front_leg_c = model.getBone("right_front_leg_c");
	right_front_leg_2 = model.getBone("right_front_leg_2");
	right_front_paw = model.getBone("right_front_paw");
	left_back_leg_c = model.getBone("left_back_leg_c");
	left_back_leg_2 = model.getBone("left_back_leg_2");
	left_back_leg_3 = model.getBone("left_back_leg_3");
	left_back_paw = model.getBone("left_back_paw");
	right_back_leg_c = model.getBone("right_back_leg_c");
	right_back_leg_2 = model.getBone("right_back_leg_2");
	right_back_leg_3 = model.getBone("right_back_leg_3");
	right_back_paw = model.getBone("right_back_paw");
	left_front_leg = model.getBone("left_leg");
	tail_1 = model.getBone("tail_1");
	mirror = model.getBone("mirror");
	mirror_anim = model.getBone("mirror_anim");
	bullet = model.getBone("bullet");
	bulletcolar = model.getBone("bulletcolar");
	bullet.setVisible(false);
	bulletcolar.setVisible(false);
	sword = model.getBone("sword");
	sword_anim = model.getBone("sword_anim");
	body_sword = model.getBone("body_sword");
	the_ring = model.getBone("the_ring");
	sword.setVisible(false);
	issun = model.getParticle("issun_par");
	head_c = model.getBone("head_c");
	head = model.getBone("head");
	top_maw = model.getBone("top_maw");
	bot_maw = model.getBone("bot_maw");
	full_model = model.getBone("full_model");
	model.getBone("main_item").setScale(0.5);
	model.getBone("off_item").setScale(0.5);
	walkingtest = entity.getLimbSwing();
	isrealywalking = false;
	lastlimb = 0;
	isslowingdown = false;
	walking_timer = 0;
	swing = 0;
	state = 0;
	rotation = 0;
	counter_rotation = 0;
	swing_timer = 0;
	weapon = -1;
	buffer = true;
}

function update(entity, model) {
		walking_timer = (walking_timer + (entity.getLimbSwing()-lastlimb)*4/3*speed(entity))%10;
		lastlimb = entity.getLimbSwing();
		counter_rotation = left_front_leg.getRotationX()
		
	if(entity.getPose() != "crouching")
	{
		left_front_paw.setPositionY(-6);
		right_front_paw.setPositionY(-6);
		animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.125,[33.75,0,0],0.25,[-17.5,0,0],0.3333,[-36.67,0,0],0.3542,[-27.09,0,0],0.5,[0,0,0]],left_back_leg_c,-10,0,0);
animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.125,[-40,0,0],0.1458,[-15,0,0],0.1875,[14,0,0],0.25,[20,0,0],0.3333,[-4.17,0,0],0.3542,[-41.15,0,0],0.5,[0,0,0]],left_back_leg_2,-25,0,0);
animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.125,[38.75,0,0],0.1875,[3.13,0,0],0.25,[-2.5,0,0],0.3333,[28.33,0,0],0.3542,[47.29,0,0],0.5,[0,0,0]],left_back_leg_3,25,0,0);
animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.125,[17.5,0,0],0.1458,[-2.92,0,0],0.1875,[-21.75,0,0],0.25,[0,0,0],0.3333,[30,0,0],0.3542,[43.75,0,0],0.5,[0,0,0]],left_back_paw,10,0,0);
animation_rotation_walk(entity,walking_timer,[0.0,[7.5,0,0],0.125,[-28.75,0,0],0.25,[0,0,0],0.3333,[40,0,0],0.3542,[45.94,0,0],0.5,[7.5,0,0]],left_front_leg_c,7.5,0,0);
animation_rotation_walk(entity,walking_timer,[0.0,[-35,0,0],0.125,[12.5,0,0],0.25,[0,0,0],0.3333,[-11.67,0,0],0.3542,[-29.59,0,0],0.5,[-35,0,0]],left_front_leg_2,-17.5,0,0);
animation_rotation_walk(entity,walking_timer,[0.0,[30,0,0],0.1458,[37.5,0,0],0.25,[0,0,0],0.3333,[10,0,0],0.3542,[-7.5,0,0],0.5,[30,0,0]],left_front_paw,10,0,0);
animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.125,[40,0,0],0.1458,[45.94,0,0],0.25,[7.5,0,0],0.3333,[-28.75,0,0],0.5,[0,0,0]],right_front_leg_c,7.5,0,0);
animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.125,[-11.67,0,0],0.1458,[-29.59,0,0],0.25,[-35,0,0],0.3333,[12.5,0,0],0.5,[0,0,0]],right_front_leg_2,-17.5,0,0);
animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.125,[10,0,0],0.1458,[-7.5,0,0],0.25,[30,0,0],0.3542,[37.5,0,0],0.5,[0,0,0]],right_front_paw,10,0,0);
animation_rotation_walk(entity,walking_timer,[0.0,[-17.5,0,0],0.125,[-36.67,0,0],0.1458,[-27.09,0,0],0.25,[0,0,0],0.3333,[33.75,0,0],0.5,[-17.5,0,0]],right_back_leg_c,-10,0,0);
animation_rotation_walk(entity,walking_timer,[0.0,[20,0,0],0.125,[-4.17,0,0],0.1458,[-41.15,0,0],0.25,[0,0,0],0.3333,[-40,0,0],0.3542,[-15,0,0],0.3958,[14,0,0],0.5,[20,0,0]],right_back_leg_2,-25,0,0);
animation_rotation_walk(entity,walking_timer,[0.0,[-2.5,0,0],0.125,[8.33,0,0],0.1458,[47.29,0,0],0.25,[0,0,0],0.3333,[38.75,0,0],0.3958,[3.13,0,0],0.5,[-2.5,0,0]],right_back_leg_3,25,0,0);
animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.125,[30,0,0],0.1458,[43.75,0,0],0.25,[0,0,0],0.3333,[17.5,0,0],0.3542,[-2.92,0,0],0.3958,[-21.75,0,0],0.5,[0,0,0]],right_back_paw,10,0,0);
	}
	else
	{
		left_front_paw.setPositionY(-6.5);
		right_front_paw.setPositionY(-6.5);
		animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.125,[33.75,0,0],0.25,[-17.5,0,0],0.3333,[-36.67,0,0],0.3542,[-27.09,0,0],0.5,[0,0,0]],left_back_leg_c,-70,0,0);
animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.125,[-40,0,0],0.1458,[-15,0,0],0.1875,[14,0,0],0.25,[20,0,0],0.3333,[-4.17,0,0],0.3542,[-41.15,0,0],0.5,[0,0,0]],left_back_leg_2,40,0,0);
animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.125,[38.75,0,0],0.1875,[3.13,0,0],0.25,[-2.5,0,0],0.3333,[28.33,0,0],0.3542,[47.29,0,0],0.5,[0,0,0]],left_back_leg_3,42.5,0,0);
animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.125,[17.5,0,0],0.1458,[-2.92,0,0],0.1875,[-21.75,0,0],0.25,[0,0,0],0.3333,[30,0,0],0.3542,[43.75,0,0],0.5,[0,0,0]],left_back_paw,-32.5,0,0);
animation_rotation_walk(entity,walking_timer,[0.0,[7.5,0,0],0.125,[-28.75,0,0],0.25,[0,0,0],0.3333,[40,0,0],0.3542,[45.94,0,0],0.5,[7.5,0,0]],left_front_leg_c,72.5,0,0);
animation_rotation_walk(entity,walking_timer,[0.0,[-35,0,0],0.125,[12.5,0,0],0.25,[0,0,0],0.3333,[-11.67,0,0],0.3542,[-29.59,0,0],0.5,[-35,0,0]],left_front_leg_2,-110,0,0);
animation_rotation_walk(entity,walking_timer,[0.0,[30,0,0],0.1458,[37.5,0,0],0.25,[0,0,0],0.3333,[10,0,0],0.3542,[-7.5,0,0],0.5,[30,0,0]],left_front_paw,37.5,0,0);
animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.125,[40,0,0],0.1458,[45.94,0,0],0.25,[7.5,0,0],0.3333,[-28.75,0,0],0.5,[0,0,0]],right_front_leg_c,72.5,0,0);
animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.125,[-11.67,0,0],0.1458,[-29.59,0,0],0.25,[-35,0,0],0.3333,[12.5,0,0],0.5,[0,0,0]],right_front_leg_2,-110,0,0);
animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.125,[10,0,0],0.1458,[-7.5,0,0],0.25,[30,0,0],0.3542,[37.5,0,0],0.5,[0,0,0]],right_front_paw,37.5,0,0);
animation_rotation_walk(entity,walking_timer,[0.0,[-17.5,0,0],0.125,[-36.67,0,0],0.1458,[-27.09,0,0],0.25,[0,0,0],0.3333,[33.75,0,0],0.5,[-17.5,0,0]],right_back_leg_c,-70,0,0);
animation_rotation_walk(entity,walking_timer,[0.0,[20,0,0],0.125,[-4.17,0,0],0.1458,[-41.15,0,0],0.25,[0,0,0],0.3333,[-40,0,0],0.3542,[-15,0,0],0.3958,[14,0,0],0.5,[20,0,0]],right_back_leg_2,40,0,0);
animation_rotation_walk(entity,walking_timer,[0.0,[-2.5,0,0],0.125,[8.33,0,0],0.1458,[47.29,0,0],0.25,[0,0,0],0.3333,[38.75,0,0],0.3958,[3.13,0,0],0.5,[-2.5,0,0]],right_back_leg_3,42.5,0,0);
animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.125,[30,0,0],0.1458,[43.75,0,0],0.25,[0,0,0],0.3333,[17.5,0,0],0.3542,[-2.92,0,0],0.3958,[-21.75,0,0],0.5,[0,0,0]],right_back_paw,-32.5,0,0);
	}
	if(isslowingdown)
	{
		if(Math.abs(walking_timer - 5)< 2.5)
		{
			walking_timer = ((conv*walking_timer + 2.5-conv*5)% 5 + 2.5);
		}
		else if(walking_timer<= 2.5)
		{
			walking_timer = ((conv*walking_timer + 2.5)% 5 - 2.5);
		}
		else
		{
			walking_timer = ((conv*walking_timer + 2.5 - conv*10)% 5 + 7.5);
		}
	}
	if(entity.getPose() == "standing" && !isrealywalking)
	{
		left_front_leg_c.setRotationX(7.5);
		left_front_leg_2.setRotationX(-17.5);
		left_front_paw.setRotationX(10);
		right_front_leg_c.setRotationX(7.5);
		right_front_leg_2.setRotationX(-17.5);
		right_front_paw.setRotationX(10);
		left_back_leg_c.setRotationX(-10);
		left_back_leg_2.setRotationX(-25);
		left_back_leg_3.setRotationX(25);
		left_back_paw.setRotationX(10);
		right_back_leg_c.setRotationX(-10);
		right_back_leg_2.setRotationX(-25);
		right_back_leg_3.setRotationX(25);
		right_back_paw.setRotationX(10);
	}
	if(entity.getPose() == "crouching" && !isrealywalking)
	{
		left_front_leg_c.setRotationX(72.5);
		left_front_leg_2.setRotationX(-110);
		left_front_paw.setRotationX(37.5);
		right_front_leg_c.setRotationX(72.5);
		right_front_leg_2.setRotationX(-110);
		right_front_paw.setRotationX(37.5);
		left_back_leg_c.setRotationX(-70);
		left_back_leg_2.setRotationX(40);
		left_back_leg_3.setRotationX(42.5);
		left_back_paw.setRotationX(-32.5);
		right_back_leg_c.setRotationX(-70);
		right_back_leg_2.setRotationX(40);
		right_back_leg_3.setRotationX(42.5);
		right_back_paw.setRotationX(-32.5);
	}
	swing_timer = 20*entity.getSwingProgress()*0.6042;
	animation_rotation_walk(entity,swing_timer,[0.0,[0,0,0],0.2083,[-30,-57.5,0],0.3125,[15,0,0],0.4167,[32.5,55,-12.5],0.6042,[0,0,0]],head_c,entity.getHeadPitch()*(entity.getPose() != "swimming"),entity.getHeadYaw(),0);
	animation_catmullrom_rotation(entity,swing_timer,[0,[[ 7.061895432759762, 4.195414508760706,-3.7573099415204703, 0],[ 87.39837646451383, -116.49194371597584,1.5935672514619976, 0],[ 0, 0,0, 0]],0.2083,[[ -19.58419971195391, 24.16839942390782,12.915800288046087, 7.5],[ -43.34020105616897, 57.93040211233796,15.409798943831017, -27.5],[ 0, 0,0, 0]],0.3125,[[ 16.9837412867101, -31.983741286710107,2.5000000000000053, 25],[ 43.53637412867102, -72.28637412867103,1.25000000000001, 2.5],[ 0, 0,0, 0]],0.4167,[[ 2.6976424279992655, 3.7255678286404406,-18.923210256639706, 12.5],[ -71.45033212018706, 119.32753798270322,-22.87720586251616, -25],[ 0, 0,0, 0]],0.60417,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]],0.60417,mirror_anim,0,0,0);
animation_catmullrom_position(entity,swing_timer,[0,[[ -27.752646170769218, 27.51872804211424,14.233918128654974, 0],[ 14.697669460663821, -6.744453086394813,-3.9532163742690085, 0],[ -15.660998612205502, 11.333513232088542,8.32748538011696, 0]],0.2083,[[ 7.503360537686028, -14.506721075372056,-6.996639462313972, 14],[ -21.668159846375413, 27.336319692750834,13.331840153624581, 4],[ 10.501920153624576, -15.503840307249154,-7.998079846375421, 4]],0.3125,[[ 6.7245333333333335, -6.22453333333333,-13.500000000000004, 0],[ 18.65864198377329, -34.65864198377329,3.0000000000000053, 23],[ -2.6018801965489673, 8.10188019654897,-7.5000000000000036, -9]],0.4167,[[ -23.58020315806069, 46.97271755345415,-10.392514395393462, -13],[ -2.1648349069317785, 10.773324619431863,-18.608489712500084, 10],[ -12.88920695443151, 22.273108459737948,1.6160984946935626, -11]],0.60417,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]],0.60417,mirror,0,0,4.5);
	bullet.setRotation(entity.getHeadPitch(), 0, -entity.getHeadYaw());
	animation_catmullrom_rotation(entity,swing_timer,[0,[[ 7.061895432759762, 4.195414508760706,-3.7573099415204703, 0],[ 87.39837646451383, -116.49194371597584,1.5935672514619976, 0],[ 0, 0,0, 0]],0.2083,[[ -19.58419971195391, 24.16839942390782,12.915800288046087, 7.5],[ -43.34020105616897, 57.93040211233796,15.409798943831017, -27.5],[ 0, 0,0, 0]],0.3125,[[ 16.9837412867101, -31.983741286710107,2.5000000000000053, 25],[ 43.53637412867102, -72.28637412867103,1.25000000000001, 2.5],[ 0, 0,0, 0]],0.4167,[[ 2.6976424279992655, 3.7255678286404406,-18.923210256639706, 12.5],[ -71.45033212018706, 119.32753798270322,-22.87720586251616, -25],[ 0, 0,0, 0]],0.60417,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]],0.60417,sword_anim,0,0,0);
animation_catmullrom_position(entity,swing_timer,[0,[[ -27.752646170769218, 27.51872804211424,14.233918128654974, 0],[ 14.697669460663821, -6.744453086394813,-3.9532163742690085, 0],[ -15.660998612205502, 11.333513232088542,8.32748538011696, 0]],0.2083,[[ 7.503360537686028, -14.506721075372056,-6.996639462313972, 14],[ -21.668159846375413, 27.336319692750834,13.331840153624581, 4],[ 10.501920153624576, -15.503840307249154,-7.998079846375421, 4]],0.3125,[[ 6.7245333333333335, -6.22453333333333,-13.500000000000004, 0],[ 18.65864198377329, -34.65864198377329,3.0000000000000053, 23],[ -2.6018801965489673, 8.10188019654897,-7.5000000000000036, -9]],0.4167,[[ -23.58020315806069, 46.97271755345415,-10.392514395393462, -13],[ -2.1648349069317785, 10.773324619431863,-18.608489712500084, 10],[ -12.88920695443151, 22.273108459737948,1.6160984946935626, -11]],0.60417,[[0,0,0,0],[0,0,0,0],[0,0,0,0]]],0.60417,sword,0,3*(entity.getPose() == "swimming"),4.5+2*(entity.getPose() == "swimming"));
	sword.setRotationZ(-1*swing_timer*40+37.5);
	the_ring.setRotationZ(rotation);
	mirror.setVisible(weapon == -1);
	bullet.setVisible(weapon == -2);
	bulletcolar.setVisible(weapon == -2);
	sword.setVisible(weapon >= 0);
	if (weapon >= 0) {
		model.setTexture("sword.geo", sword_tex[weapon]);
	};
	switch(entity.getRightHandItem().getItem()) {
		case "minecraft:bow" : weapon = -2;
		break;
		
		case "minecraft:wooden_sword": weapon = 0;
		break;
		
		case "minecraft:stone_sword": weapon = 1;
		break;
		
		case "minecraft:iron_sword": weapon = 2;
		break;
		
		case "minecraft:golden_sword" : weapon = 3;
		break;
		
		case "minecraft:diamond_sword": weapon =4;
		break;
		
		case "minecraft:netherite_sword": weapon = 5;
		break;
		
		default: weapon = -1;
	};
	full_model.setRotationX(-90*(entity.getPose() == "swimming"));
	body_sword.setRotationX(90*(entity.getPose() != "swimming"));
}


function tick(entity, model) {
	model.getBone("tail_1").setRotationZ(20*Math.cos(swing/10));
	swing = (swing + 1);
	rotation= (rotation + 1)%360;
	mirror.setRotationZ(rotation);
	bulletcolar.setRotationY(rotation);
	if(entity.isCrouching()) {swing = swing + 1;};
		if(!isrealywalking & (entity.getLimbSwing() - walkingtest)>0.2 &!( entity.isRiding()) &!(entity.getPose() == "swimming"))
		{
			isrealywalking = true;
			walking_timer = 0;
		}
		if(!isslowingdown & entity.getLimbSwing() - walkingtest < 0.2 & isrealywalking)
		{
			isslowingdown = true;
		}
		if(((walking_timer < 0.05 | Math.abs(walking_timer - 5) < 0.05 | (10- walking_timer < 0.05)) & isslowingdown) | ( entity.isRiding()) |(entity.getPose() == "swimming"))
		{
			isslowingdown = false;
			isrealywalking = false;
			body_angle = 0;
		}
		if(entity.getLimbSwing() - walkingtest>0.1 & isslowingdown)
		{
			isslowingdown = false;
		}
		walkingtest = entity.getLimbSwing();
	if(entity.getLeftHandItem().isEmpty()){
		top_maw.setRotationX(0);
		bot_maw.setRotationX(0);
	}
	else{
		top_maw.setRotationX(-15);
		bot_maw.setRotationX(15);
	}
	if(entity.isCustomKeyDown(0)& buffer) {
	issun.setDensity(0.05-issun.getDensity());
	buffer = false;
	}
	if(!entity.isCustomKeyDown(0)) { buffer = true}
}