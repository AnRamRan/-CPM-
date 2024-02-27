// OPTION :
// liste of different textures to be swap with custom keys, up to 16 textures, (first texture with key 1 , 2nd with key 2 and so on)
// the first 5 texture have special effects for emotion:
//1st texture is the defult one, 2nd is when demage are taken, 3rd : sad, 4th : angry, 5th: surprised. the other don't have custom ear modification

var textures = ["proto_tex","screen","proto_tex_sad","proto_tex_angry","proto_tex_shock"];


// all variables
	//pointer to bones
var head;
var rleg1;
var rleg2;
var rleg3;
var lleg1;
var lleg2;
var lleg3;
var lpaw;
var rpaw;
var body_c;
var head_c;
var left_arm_c;
var right_arm_c;
var left_ear;
var right_ear;
var left_arm;
var right_arm;
var left_leg;

	//varibles to handle walking animation
var walkingtest;
var startwalk;
var isrealywalking;
var lastlimb;
var isslowingdown;
var startslowdown;
var swing;
var body_angle;
var state;
var conv = 0.95;
var walking_timer;

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


function amplitude(entity,side)
{
	if(side == "left" & !entity.getLeftHandItem().isEmpty())
	{
		return -20;
	}
	if(side == "right" & !entity.getRightHandItem().isEmpty())
	{
		return -20;
	}
	if(entity.isSprinting())
	{
		return -50;
	}
	if(entity.isCrouching())
	{
		return -25;
	}
	return -40;
}

function offset(entity,side)
{
	if(side == "left" & !entity.getLeftHandItem().isEmpty())
	{
		return -20;
	}
	if(side == "right" & !entity.getRightHandItem().isEmpty())
	{
		return -20;
	}
	return 0;
}

//modifed version of DearFox's interpolation tool
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

function init(entity, model) 
{
	model.getBone("left_ear_floof").physicalize(3,1,0.9,0.5,0);
	model.getBone("right_ear_floof").physicalize(3,1,0.9,0.5,0);
	model.getBone("tail_1").physicalize(1,0.9,0.8,0.2,0.1);
	model.getBone("tail_2").physicalize(2,0.9,0.99,0.3,0.1);
	model.getBone("tail_3").physicalize(1,0.9,0.99,0.3,0.3);
	rleg1 = model.getBone("rleg1");
	rleg2 = model.getBone("rleg2");
	rleg3 = model.getBone("rleg3");
	lleg1 = model.getBone("lleg1");
	lleg2 = model.getBone("lleg2");
	lleg3 = model.getBone("lleg3");
	lpaw = model.getBone("lpaw");
	rpaw = model.getBone("rpaw");
	body_c = model.getBone("body_c");
	head_c = model.getBone("head_c");
	left_arm_c = model.getBone("left_arm_c");
	right_arm_c = model.getBone("right_arm_c");
	left_ear = model.getBone("left_ear");
	right_ear = model.getBone("right_ear");
	left_arm = model.getBone("left_arm");
	left_leg = model.getBone("left_leg");
	right_arm = model.getBone("right_arm");
	walkingtest = entity.getLimbSwing();
	isrealywalking = false;
	lastlimb = 0;
	isslowingdown = false;
	swing = 0;
	state = 0;
	walking_timer = 0;
}

function update(entity, model) {
	walking_timer = (walking_timer + (entity.getAnimPosition() - lastlimb)*4/3*entity.getAnimSpeed())%10;
	lastlimb = entity.getAnimPosition();
		body_angle = Math.sin(walking_timer*2*Math.PI/10);
		body_c.setRotationY(10*body_angle);
	if(left_arm.getRotationY() == 0 && isrealywalking)
	{
		left_arm_c.setRotationY(body_angle);
		left_arm_c.setRotationX(-amplitude(entity, "left")*Math.sin(walking_timer*3.14/5)-left_arm.getRotationX() + offset(entity, "left"));
		
	}
	else
	{
		left_arm_c.setRotationY(0);
		left_arm_c.setRotationX(0);
	}
	if(right_arm.getRotationY() == 0 && isrealywalking)
	{
		right_arm_c.setRotationY(body_angle);
		right_arm_c.setRotationX(amplitude(entity, "right")*Math.sin(walking_timer*3.14/5)-right_arm.getRotationX() + offset(entity, "right"));
		
	}
	else
	{
		right_arm_c.setRotationY(0);
		right_arm_c.setRotationX(0);
	}
		animation_position_walk(entity,walking_timer,[0.0,[0,0.4,0],0.125,[0,1,0],0.1667,[0,0,0],0.375,[0,1,0],0.4167,[0,0,0],0.5,[0,0.4,0]],body_c,0,0,0);
		animation_position_walk(entity,walking_timer,[0.0,[0,0.4,0],0.125,[0,1,0],0.1667,[0,0,0],0.375,[0,1,0],0.4167,[0,0,0],0.5,[0,0.4,0]],head_c,0,0,0);
		if(entity.isCrouching())
		{
			animation_rotation_walk(entity,walking_timer,[0.0,[-10,0,0],0.125,[-45,0,0],0.1667,[-30,0,0],0.25,[0,0,0],0.375,[45,0,0],0.5,[-10,0,0]],lleg1,-32.5,0,0);
			animation_position_walk(entity,walking_timer,[0.0,[0,0.4,0],0.125,[0,1,-1],0.1667,[0,0,-1],0.25,[0,0,0],0.375,[0,1,0],0.4167,[0,0,0],0.5,[0,0.4,0]],lleg1,0,-0.25,3.9);
			animation_rotation_walk(entity,walking_timer,[0.0,[25,0,0],0.0417,[25,0,0],0.125,[10,0,0],0.1667,[1.67,0,0],0.25,[0,0,0],0.375,[-67.5,0,0],0.4167,[-10,0,0],0.4583,[10,0,0],0.5,[25,0,0]],lleg2,117.5,0,0);
			animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.0417,[6.66,0,0],0.125,[57.5,0,0],0.25,[0,0,0],0.375,[37.5,0,0],0.4167,[13.33,0,0],0.4583,[-5.84,0,0],0.5,[0,0,0]],lleg3,-80,0,0);
			animation_rotation_walk(entity,walking_timer,[0.0,[-12.66,0,0],0.125,[12.5,0,0],0.1667,[5.83,0,0],0.25,[0,0,0],0.3333,[-13.05,0,0],0.375,[15.42,0,0],0.4167,[-6.94,0,0],0.5,[-12.66,0,0]],lpaw,15,0,0);
			animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.125,[45,0,0],0.25,[-10,0,0],0.375,[-45,0,0],0.4167,[-30,0,0],0.5,[0,0,0]],rleg1,-32.5,0,0);
			animation_position_walk(entity,walking_timer,[0.0,[0,0.4,0],0.125,[0,1,0],0.1667,[0,0,0],0.375,[0,1,0],0.4167,[0,0,0],0.5,[0,0.4,0]],rleg1,0,-0.25,3.9);
			animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.125,[-67.5,0,0],0.1667,[-10,0,0],0.2083,[10,0,0],0.25,[25,0,0],0.2917,[25,0,0],0.375,[10,0,0],0.4167,[1.67,0,0],0.5,[0,0,0]],rleg2,117.5,0,0);
			animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.125,[37.5,0,0],0.1667,[13.33,0,0],0.2083,[-5.84,0,0],0.25,[0,0,0],0.2917,[6.66,0,0],0.375,[57.5,0,0],0.5,[0,0,0]],rleg3,-80,0,0);
			animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.0833,[-13.05,0,0],0.125,[15.42,0,0],0.1667,[-6.94,0,0],0.25,[-12.66,0,0],0.375,[12.5,0,0],0.4167,[5.83,0,0],0.5,[0,0,0]],rpaw,15,0,0);
			animation_position_walk(entity,walking_timer,[0.0,[0,0.4,0],0.125,[0,1,0],0.1667,[0,0,0],0.375,[0,1,0],0.4167,[0,0,0],0.5,[0,0.4,0]],left_arm_c,0,0,0);
			animation_position_walk(entity,walking_timer,[0.0,[0,0.4,0],0.125,[0,1,0],0.1667,[0,0,0],0.375,[0,1,0],0.4167,[0,0,0],0.5,[0,0.4,0]],right_arm_c,0,0,0);
			left_arm_c.setPositionX(Math.abs(Math.sin(0.175*body_angle)));
			left_arm_c.setPositionZ(-1*Math.sin(0.175*body_angle));
			right_arm_c.setPositionX(-1*Math.abs(Math.sin(0.175*body_angle)));
			right_arm_c.setPositionZ(Math.sin(0.175*body_angle));
		}
		else
		{
			animation_rotation_walk(entity,walking_timer,[0.0,[-10,0,0],0.125,[-45,0,0],0.1667,[-30,0,0],0.25,[0,0,0],0.375,[45,0,0],0.5,[-10,0,0]],lleg1,-12.5,0,0);
			animation_position_walk(entity,walking_timer,[0.0,[0,0.4,0],0.125,[0,1,-1],0.1667,[0,0,-1],0.25,[0,0,0],0.375,[0,1,0],0.4167,[0,0,0],[0,0.4,0]],lleg1,0,0,0);
			animation_rotation_walk(entity,walking_timer,[0.0,[25,0,0],0.0417,[25,0,0],0.125,[10,0,0],0.1667,[1.67,0,0],0.25,[0,0,0],0.375,[-67.5,0,0],0.4167,[-10,0,0],0.4583,[10,0,0],0.5,[25,0,0]],lleg2,77.5,0,0);
			animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.0417,[6.66,0,0],0.125,[57.5,0,0],0.25,[0,0,0],0.375,[37.5,0,0],0.4167,[13.33,0,0],0.4583,[-5.84,0,0],0.5,[0,0,0]],lleg3,-60,0,0);
			animation_rotation_walk(entity,walking_timer,[0.0,[-12.66,0,0],0.125,[12.5,0,0],0.1667,[5.83,0,0],0.25,[0,0,0],0.3333,[-13.05,0,0],0.375,[15.42,0,0],0.4167,[-6.94,0,0],0.5,[-12.66,0,0]],lpaw,15,0,0);
			animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.125,[45,0,0],0.25,[-10,0,0],0.375,[-45,0,0],0.4167,[-30,0,0],0.5,[0,0,0]],rleg1,-12.5,0,0);
			animation_position_walk(entity,walking_timer,[0.0,[0,0.4,0],0.125,[0,1,0],0.1667,[0,0,0],0.375,[0,1,0],0.4167,[0,0,0],0.5,[0,0.4,0]],rleg1,0,0,0);
			animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.125,[-67.5,0,0],0.1667,[-10,0,0],0.2083,[10,0,0],0.25,[25,0,0],0.2917,[25,0,0],0.375,[10,0,0],0.4167,[1.67,0,0],0.5,[0,0,0]],rleg2,77.5,0,0);
			animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.125,[37.5,0,0],0.1667,[13.33,0,0],0.2083,[-5.84,0,0],0.25,[0,0,0],0.2917,[6.66,0,0],0.375,[57.5,0,0],0.5,[0,0,0]],rleg3,-60,0,0);
			animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.0833,[-13.05,0,0],0.125,[15.42,0,0],0.1667,[-6.94,0,0],0.25,[-12.66,0,0],0.375,[12.5,0,0],0.4167,[5.83,0,0],0.5,[0,0,0]],rpaw,15,0,0);
			animation_position_walk(entity,walking_timer,[0.0,[0,0.4,0],0.125,[0,1,0],0.1667,[0,0,0],0.375,[0,1,0],0.4167,[0,0,0],0.5,[0,0.4,0]],left_arm_c,0,0,0);
			animation_position_walk(entity,walking_timer,[0.0,[0,0.4,0],0.125,[0,1,0],0.1667,[0,0,0],0.375,[0,1,0],0.4167,[0,0,0],0.5,[0,0.4,0]],right_arm_c,0,0,0);
			left_arm_c.setPositionX(Math.abs(Math.sin(0.175*body_angle)));
			left_arm_c.setPositionZ(-1*Math.sin(0.175*body_angle));
			right_arm_c.setPositionX(-1*Math.abs(Math.sin(0.175*body_angle)));
			right_arm_c.setPositionZ(Math.sin(0.175*body_angle));
		}
	if(isslowingdown)
	{
		if(Math.abs(walking_timer - 5)< 2.5)
		{
			walking_timer = (conv*walking_timer + 2.5-conv*5)% 5 + 2.5;
		}
		else if(walking_timer<= 2.5)
		{
			walking_timer = (conv*walking_timer + 2.5)% 5 - 2.5;
		}
		else
		{
			walking_timer = (conv*walking_timer + 2.5 - conv*10)% 5 + 7.5;
		}
	}
	if(!isrealywalking)
	{
		body_c.setRotation(0,0,0);
		body_c.setPosition(0,0,0);
		head_c.setPosition(0,0,0);
		model.getBone("right_leg_c").setRotationX(0);
		model.getBone("left_leg_c").setRotationX(0);
	}
	else
	{
		model.getBone("right_leg_c").setRotationX(left_leg.getRotationX());
		model.getBone("left_leg_c").setRotationX(-left_leg.getRotationX());
	}
	if (entity.getPose() == "standing" && !isrealywalking) {
		rleg1.setRotation(-12.5, 0,0);
		rleg2.setRotation(77.5, 0, 0);
		rleg3.setRotation(-60, 0,0);
		lleg1.setRotation(-12.5, 0,0);
		lleg2.setRotation(77.5, 0, 0);
		lleg3.setRotation(-60, 0,0);
		rpaw.setRotation(15, 0,0);
		lpaw.setRotation(15, 0,0);
	}
	if (entity.getPose() == "crouching" && !isrealywalking) {
		rleg1.setRotation(-32.5,0,0);
		rleg2.setRotation(117.5,0, 0);
		rleg3.setRotation(-80, 0,0);
		lleg1.setRotation(-32.5,0,0);
		lleg2.setRotation(117.5,0, 0);
		lleg3.setRotation(-80, 0,0);
		rpaw.setRotation(15, 0,0);
		lpaw.setRotation(15, 0,0);
	}
	if (entity.isRiding() && !isrealywalking) {
		rleg1.setRotation(-52.5,0,-20);
		rleg2.setRotation(157.5,0, 0);
		rleg3.setRotation(-1000, 0,0);
		rpaw.setRotation(95, 0,0);
		rpaw.setPositionZ(-1.6);
		lleg1.setRotation(-52.5,0,20);
		lleg2.setRotation(157.5,0, 0);
		lleg3.setRotation(-100, 0,0);
		lpaw.setRotation(95, 0,0);
		lpaw.setPositionZ(-1.6);
	}
}


function tick(entity, model) {
		model.getBone("tail_1").setRotationY(20*Math.cos(swing/10));
		swing = swing + 1;
		if(entity.isCrouching()) {swing = swing + 1;}
		for (var i = 0; i < Math.min(textures.length, 16); i++) {
			if (entity.isCustomKeyDown(i)) {state = i;};
		}
		model.setTexture("protogen.geo", textures[state]);
		if(entity.isHurt() & textures.length > 1) {	model.setTexture("protogen.geo", textures[1]);}
		switch(state)
		{
			case 2:
				left_ear.setRotation(-2.5,2.5,120);
				right_ear.setRotation(-2.5,-2.5,-120);
				left_ear.setPosition(2,6.5,2);
				right_ear.setPosition(-2,6.5,2);
				break;
			case 3:
				left_ear.setRotation(-75,2.5,75);
				right_ear.setRotation(-75,-2.5,-75);
				left_ear.setPosition(3,8,1);
				right_ear.setPosition(-3,8,1);
				break;
			case 4:
				left_ear.setRotation(-2.5,25,0);
				right_ear.setRotation(-2.5,-25,0);
				left_ear.setPosition(2,8,0);
				right_ear.setPosition(-2,8,0);
				break;
			default:
				left_ear.setRotation(-42,15,10);
				right_ear.setRotation(-42,-15,-10);
				left_ear.setPosition(3,8,0);
				right_ear.setPosition(-3,8,0);
		}
	if(!isrealywalking & (entity.getLimbSwing() - walkingtest)>0.2 &!( entity.isRiding()) &!(entity.getPose() == "swimming"))
	{
		isrealywalking = true;
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
}