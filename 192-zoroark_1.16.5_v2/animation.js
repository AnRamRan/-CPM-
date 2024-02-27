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
var walkingtest;
var iswalking;
var isrealywalking;
var lastlimb;
var isslowingdown;
var body_angle;
var conv = 0.95;
var walking_timer;
var left_arm;
var right_arm;
var left_leg;

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
	model.getBone("maine3").physicalize(1,0.9,0.9,0.8,0.4);
	model.getBone("maine4").physicalize(0.8,0.7,0.99,0.8,0.3);
	model.getBone("maine5").physicalize(0.8,0.1,0.99,0.2,0.3);
	model.getBone("mainepearl").physicalize(0.8,0.3,1,0.1,0.4);
	model.getBone("endmaine").physicalize(0.8,0.1,1,0.4,0.1);
	head = model.getBone("head_c");
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
	walkingtest = entity.getLimbSwing();
	iswalking = false;
	isrealywalking = false;
	lastlimb = 0;
	isslowingdown = false;
	walking_timer = 0;
	left_arm = model.getBone("left_arm");
	left_leg = model.getBone("left_leg");
	right_arm = model.getBone("right_arm");
}

function update(entity, model) {
	walking_timer = (walking_timer + (entity.getLimbSwing()-lastlimb)*4/3*entity.getAnimSpeed())%10;
	lastlimb = entity.getLimbSwing();
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
			animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.125,[50,0,0],0.25,[-10,0,0],0.375,[-52.5,0,0],0.5,[0,0,0]],rleg1,-37.5,0,0);
			animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.125,[-57.5,0,0],0.1667,[-10,0,0],0.2083,[2.5,0,0],0.25,[25,0,0],0.2917,[25,0,0],0.375,[10,0,0],0.5,[0,0,0]],rleg2,105,0,0);
			animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.125,[37.5,0,0],0.1667,[13.33,0,0],0.2083,[-5.84,0,0],0.25,[0,0,0],0.2917,[6.66,0,0],0.375,[57.5,0,0],0.5,[0,0,0]],rleg3,-67.5,0,0);
			animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.0833,[-13.05,0,0],0.125,[2.92,0,0],0.1667,[-6.94,0,0],0.25,[-12.66,0,0],0.375,[12.5,0,0],0.4167,[10.83,0,0],0.5,[0,0,0]],rpaw,30,0,0);
			animation_rotation_walk(entity,walking_timer,[0.0,[-10,0,0],0.125,[-52.5,0,0],0.25,[0,0,0],0.375,[50,0,0],0.5,[-10,0,0]],lleg1,-37.5,0,0);
			animation_rotation_walk(entity,walking_timer,[0.0,[25,0,0],0.0417,[25,0,0],0.125,[10,0,0],0.25,[0,0,0],0.375,[-57.5,0,0],0.4167,[-10,0,0],0.4583,[2.5,0,0],0.5,[25,0,0]],lleg2,105,0,0);
			animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.0417,[6.66,0,0],0.125,[57.5,0,0],0.25,[0,0,0],0.375,[37.5,0,0],0.4167,[13.33,0,0],0.4583,[-5.84,0,0],0.5,[0,0,0]],lleg3,-67.5,0,0);
			animation_rotation_walk(entity,walking_timer,[0.0,[-12.66,0,0],0.125,[12.5,0,0],0.1667,[10.83,0,0],0.25,[0,0,0],0.3333,[-13.05,0,0],0.375,[2.92,0,0],0.4167,[-6.94,0,0],0.5,[-12.66,0,0]],lpaw,30,0,0);
			animation_position_walk(entity,walking_timer,[0.0,[0,0,0],0.125,[0,1,0],0.1667,[0,0,0],0.375,[0,1,-1],0.4167,[0,0,-1],0.5,[0,0,0]],rleg1,0,0,0);
			animation_position_walk(entity,walking_timer,[0.0,[0,0,0],0.125,[0,1,-1],0.1667,[0,0,-1],0.25,[0,0,0],0.375,[0,1,0],0.4167,[0,0,0],0.5,[0,0,0]],lleg1,0,0,0);
			animation_position_walk(entity,walking_timer,[0.0,[0,0.2,0],0.125,[0.0987,0.5,-0.1736],0.1667,[0.0658,0,-0.7522],0.25,[0,0.2,0],0.375,[0.0987,1,0.1736],0.4167,[0.0658,0,0.7522],0.5[0,0.2,0]],left_arm_c,0,0,0);
			animation_position_walk(entity,walking_timer,[0.0,[0,0.2,0],0.125,[-0.0987,0.5,0.1736],0.1667,[-0.0658,0,0.7522],0.25,[0,0.2,0],0.375,[-0.0987,1,-0.1736],0.4167,[-0.0658,0,-0.7522],0.5[0,0.2,0]],right_arm_c,0,0,0);
			left_arm_c.setPositionX(Math.abs(Math.sin(0.175*body_angle)));
			left_arm_c.setPositionZ(-1*Math.sin(0.175*body_angle));
			right_arm_c.setPositionX(-1*Math.abs(Math.sin(0.175*body_angle)));
			right_arm_c.setPositionZ(Math.sin(0.175*body_angle));
		}
		else
		{
			animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.125,[50,0,0],0.25,[-10,0,0],0.375,[-52.5,0,0],0.5,[0,0,0]],rleg1,-17.5,0,0);
			animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.125,[-57.5,0,0],0.1667,[-10,0,0],0.2083,[2.5,0,0],0.25,[25,0,0],0.2917,[25,0,0],0.375,[10,0,0],0.5,[0,0,0]],rleg2,65,0,0);
			animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.125,[37.5,0,0],0.1667,[13.33,0,0],0.2083,[-5.84,0,0],0.25,[0,0,0],0.2917,[6.66,0,0],0.375,[57.5,0,0],0.5,[0,0,0]],rleg3,-47.5,0,0);
			animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.0833,[-13.05,0,0],0.125,[2.92,0,0],0.1667,[-6.94,0,0],0.25,[-12.66,0,0],0.375,[12.5,0,0],0.4167,[10.83,0,0],0.5,[0,0,0]],rpaw,30,0,0);
			animation_rotation_walk(entity,walking_timer,[0.0,[-10,0,0],0.125,[-52.5,0,0],0.25,[0,0,0],0.375,[50,0,0],0.5,[-10,0,0]],lleg1,-17.5,0,0);
			animation_rotation_walk(entity,walking_timer,[0.0,[25,0,0],0.0417,[25,0,0],0.125,[10,0,0],0.25,[0,0,0],0.375,[-57.5,0,0],0.4167,[-10,0,0],0.4583,[2.5,0,0],0.5,[25,0,0]],lleg2,65,0,0);
			animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.0417,[6.66,0,0],0.125,[57.5,0,0],0.25,[0,0,0],0.375,[37.5,0,0],0.4167,[13.33,0,0],0.4583,[-5.84,0,0],0.5,[0,0,0]],lleg3,-47.5,0,0);
			animation_rotation_walk(entity,walking_timer,[0.0,[-12.66,0,0],0.125,[12.5,0,0],0.1667,[10.83,0,0],0.25,[0,0,0],0.3333,[-13.05,0,0],0.375,[2.92,0,0],0.4167,[-6.94,0,0],0.5,[-12.66,0,0]],lpaw,30,0,0);
			animation_position_walk(entity,walking_timer,[0.0,[0,0,0],0.125,[0,1,0],0.1667,[0,0,0],0.375,[0,1,-1],0.4167,[0,0,-1],0.5,[0,0,0]],rleg1,0,0,0);
			animation_position_walk(entity,walking_timer,[0.0,[0,0,0],0.125,[0,1,-1],0.1667,[0,0,-1],0.25,[0,0,0],0.375,[0,1,0],0.4167,[0,0,0],0.5,[0,0,0]],lleg1,0,0,0);
			animation_position_walk(entity,walking_timer,[0.0,[0,0.2,0],0.125,[0.0987,0.5,-0.1736],0.1667,[0.0658,0,-0.7522],0.25,[0,0.2,0],0.375,[0.0987,1,0.1736],0.4167,[0.0658,0,0.7522],0.5[0,0.2,0]],left_arm_c,0,0,0);
			animation_position_walk(entity,walking_timer,[0.0,[0,0.2,0],0.125,[-0.0987,0.5,0.1736],0.1667,[-0.0658,0,0.7522],0.25,[0,0.2,0],0.375,[-0.0987,1,-0.1736],0.4167,[-0.0658,0,-0.7522],0.5[0,0.2,0]],right_arm_c,0,0,0);
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
		rleg1.setRotation(-17.5, 0,0);
		rleg2.setRotation(65, 0, 0);
		rleg3.setRotation(-47.5, 0,0);
		lleg1.setRotation(-17.5, 0,0);
		lleg2.setRotation(65, 0, 0);
		lleg3.setRotation(-47.5, 0,0);
		rpaw.setRotation(30, 0,0);
		lpaw.setRotation(30, 0,0);
	}
	if (entity.getPose() == "crouching" && !isrealywalking) {
		rleg1.setRotation(-37.5,0,0);
		rleg2.setRotation(105,0, 0);
		rleg3.setRotation(-67.5, 0,0);
		lleg1.setRotation(-37.5,0,0);
		lleg2.setRotation(105,0, 0);
		lleg3.setRotation(-67.5, 0,0);
		rpaw.setRotation(30, 0,0);
		lpaw.setRotation(30, 0,0);
	}
	if (entity.isRiding() && !isrealywalking) {
		rleg1.setRotation(-57.5,0,-20);
		rleg2.setRotation(145,0, 0);
		rleg3.setRotation(-87.5, 0,0);
		rpaw.setRotation(110, 0,0);
		rpaw.setPositionZ(-1.6);
		lleg1.setRotation(-57.5,0,20);
		lleg2.setRotation(145,0, 0);
		lleg3.setRotation(-87.5, 0,0);
		lpaw.setRotation(110, 0,0);
		lpaw.setPositionZ(-1.6);
	}
	else {
		rpaw.setPositionZ(0);
		lpaw.setPositionZ(0);
	}
}

function tick(entity, model) {
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