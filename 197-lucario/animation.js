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
var walking_bump;

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
	head = model.getBone("head_c");
	rleg1 = model.getBone("right_leg_1");
	rleg2 = model.getBone("right_leg_2");
	rleg3 = model.getBone("right_leg_3");
	lleg1 = model.getBone("left_leg_1");
	lleg2 = model.getBone("left_leg_2");
	lleg3 = model.getBone("left_leg_3");
	lpaw = model.getBone("left_paw");
	rpaw = model.getBone("right_paw");
	body_c = model.getBone("body_c");
	head_c = model.getBone("head_c");
	left_arm_c = model.getBone("left_arm_c");
	right_arm_c = model.getBone("right_arm_c");
	model.getBone("tails").physicalize(1, 0.5, 0.9, 0.2, 0.2);
	model.getBone("top_left_thing").physicalize(1, 0.5, 0.9, 0.2, 0.2);
	model.getBone("top_right_thing").physicalize(1, 0.5, 0.9, 0.2, 0.2);
	model.getBone("bot_left_thing").physicalize(1, 0.5, 0.9, 0.2, 0.2);
	model.getBone("bot_right_thing").physicalize(1, 0.5, 0.9, 0.2, 0.2);
	walkingtest = entity.getLimbSwing();
	iswalking = false;
	isrealywalking = false;
	lastlimb = 0;
	isslowingdown = false;
	walking_timer = 0;
	left_arm = model.getBone("left_arm");
	left_leg = model.getBone("left_leg");
	right_arm = model.getBone("right_arm");
	walking_bump = 0;
}

function update(entity, model) {
	walking_timer = (walking_timer + (entity.getLimbSwing()-lastlimb)*4/3*entity.getAnimSpeed())%10;
	lastlimb = entity.getLimbSwing();
	body_angle = Math.sin(walking_timer*2*Math.PI/10);
	walking_bump = Math.abs(Math.sin(walking_timer*2*Math.PI/10+0.41))*isrealywalking;
	body_c.setRotationY(10*body_angle);
	body_c.setPositionY(walking_bump);
	head_c.setPositionY(walking_bump);
	lleg1.setPositionY(walking_bump);
	rleg1.setPositionY(walking_bump);
	if(left_arm.getRotationY() == 0 && isrealywalking && !model.isFirstPerson())
	{
		left_arm_c.setRotationY(body_angle);
		left_arm_c.setRotationX(-amplitude(entity, "left")*Math.sin(walking_timer*3.14/5)*(1-entity.isSprinting())-left_arm.getRotationX() + offset(entity, "left") +37.5*entity.isSprinting());
		if(entity.isSprinting()) {left_arm_c.setRotationZ(-7.5);}
		else {left_arm_c.setRotationZ(0);};
		
	}
	else
	{
		left_arm_c.setRotationY(0);
		left_arm_c.setRotationX(0);
		left_arm_c.setRotationZ(0);
	}
	if(right_arm.getRotationY() == 0 && isrealywalking && !model.isFirstPerson())
	{
		right_arm_c.setRotationY(body_angle);
		right_arm_c.setRotationX(amplitude(entity, "right")*Math.sin(walking_timer*3.14/5)*(1-entity.isSprinting())-right_arm.getRotationX() + offset(entity, "right") +37.5*entity.isSprinting());
		if(entity.isSprinting()) {right_arm_c.setRotationZ(7.5);}
		else {right_arm_c.setRotationZ(0);};
	}
	else
	{
		right_arm_c.setRotationY(0);
		right_arm_c.setRotationX(0);
		right_arm_c.setRotationZ(0);
	}
	if(entity.isCrouching())
	{
			animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.125,[50,0,0],0.25,[-10,0,0],0.375,[-52.5,0,0],0.5,[0,0,0]],rleg1,-25,0,0);
			animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.125,[-57.5,0,0],0.1667,[-10,0,0],0.2083,[2.5,0,0],0.25,[25,0,0],0.2917,[25,0,0],0.375,[10,0,0],0.5,[0,0,0]],rleg2,97.5,0,0);
			animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.125,[37.5,0,0],0.1667,[13.33,0,0],0.2083,[-5.84,0,0],0.25,[0,0,0],0.2917,[6.66,0,0],0.375,[57.5,0,0],0.5,[0,0,0]],rleg3,-85,0,0);
			animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.0833,[-13.05,0,0],0.125,[2.92,0,0],0.1667,[-6.94,0,0],0.25,[-12.66,0,0],0.375,[12.5,0,0],0.4167,[10.83,0,0],0.5,[0,0,0]],rpaw,12.5,0,0);
			animation_rotation_walk(entity,walking_timer,[0.0,[-10,0,0],0.125,[-52.5,0,0],0.25,[0,0,0],0.375,[50,0,0],0.5,[-10,0,0]],lleg1,-25,0,0);
			animation_rotation_walk(entity,walking_timer,[0.0,[25,0,0],0.0417,[25,0,0],0.125,[10,0,0],0.25,[0,0,0],0.375,[-57.5,0,0],0.4167,[-10,0,0],0.4583,[2.5,0,0],0.5,[25,0,0]],lleg2,97.5,0,0);
			animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.0417,[6.66,0,0],0.125,[57.5,0,0],0.25,[0,0,0],0.375,[37.5,0,0],0.4167,[13.33,0,0],0.4583,[-5.84,0,0],0.5,[0,0,0]],lleg3,-85,0,0);
			animation_rotation_walk(entity,walking_timer,[0.0,[-12.66,0,0],0.125,[12.5,0,0],0.1667,[10.83,0,0],0.25,[0,0,0],0.3333,[-13.05,0,0],0.375,[2.92,0,0],0.4167,[-6.94,0,0],0.5,[-12.66,0,0]],lpaw,12.5,0,0);
			left_arm_c.setPosition(Math.abs(Math.sin(0.175*body_angle)), walking_bump, -1*Math.sin(0.175*body_angle));
			right_arm_c.setPosition(-1*Math.abs(Math.sin(0.175*body_angle)), walking_bump, Math.sin(0.175*body_angle));
		}
		else
		{
			if(entity.isSprinting()&& isrealywalking)
			{
				animation_rotation_walk(entity,walking_timer,[0.0,[-10,0,0],0.1667,[-25,0,0],0.2083,[-22.5,0,0],0.25,[0,0,0],0.3333,[20,0,0],0.375,[20,0,0],0.5,[-10,0,0]],lleg1,-5,0,0);
				animation_rotation_walk(entity,walking_timer,[0.0,[21.67,0,0],0.1667,[12.5,0,0],0.2083,[7.5,0,0],0.25,[0,0,0],0.3333,[-22.5,0,0],0.375,[-15,0,0],0.4167,[7.5,0,0],0.5,[21.67,0,0]],lleg2,57.5,0,0);
				animation_rotation_walk(entity,walking_timer,[0.0,[1.67,0,0],0.1667,[-2.5,0,0],0.2083,[2.5,0,0],0.25,[0,0,0],0.3333,[15,0,0],0.375,[27.5,0,0],0.4167,[0,0,0],0.5,[1.67,0,0]],lleg3,-65,0,0);
				animation_rotation_walk(entity,walking_timer,[0.0,[-13.33,0,0],0.1667,[12.5,0,0],0.2083,[25,0,0],0.25,[0,0,0],0.375,[12.5,0,0],0.4167,[-15,0,0],0.5,[-13.33,0,0]],lpaw,12.5,0,0);
				animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.0833,[20,0,0],0.125,[20,0,0],0.25,[-10,0,0],0.4167,[-25,0,0],0.5,[0,0,0]],rleg1,-5,0,0);
				animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.0833,[-22.5,0,0],0.125,[-15,0,0],0.1667,[7.5,0,0],0.25,[21.67,0,0],0.4167,[12.5,0,0],0.4583,[7.5,0,0],0.5,[0,0,0]],rleg2,57.5,0,0);
				animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.0833,[15,0,0],0.125,[27.5,0,0],0.1667,[0,0,0],0.25,[1.67,0,0],0.4167,[-2.5,0,0],0.4583,[2.5,0,0],0.5,[0,0,0]],rleg3,-65,0,0);
				animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.125,[12.5,0,0],0.1667,[-15,0,0],0.25,[-13.33,0,0],0.4167,[12.5,0,0],0.4583,[25,0,0],0.5,[0,0,0]],rpaw,12.5,0,0);
				body_c.setRotationX(12.5);
				lleg1.setPositionZ(3);
				rleg1.setPositionZ(3);
			}
			else 
			{
				lleg1.setPositionZ(0);
				rleg1.setPositionZ(0);
				body_c.setRotationX(0);
				animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.125,[50,0,0],0.25,[-10,0,0],0.375,[-52.5,0,0],0.5,[0,0,0]],rleg1,-5,0,0);
				animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.125,[-57.5,0,0],0.1667,[-10,0,0],0.2083,[2.5,0,0],0.25,[25,0,0],0.2917,[25,0,0],0.375,[10,0,0],0.5,[0,0,0]],rleg2,57.5,0,0);
				animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.125,[37.5,0,0],0.1667,[13.33,0,0],0.2083,[-5.84,0,0],0.25,[0,0,0],0.2917,[6.66,0,0],0.375,[57.5,0,0],0.5,[0,0,0]],rleg3,-65,0,0);
				animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.0833,[-13.05,0,0],0.125,[2.92,0,0],0.1667,[-6.94,0,0],0.25,[-12.66,0,0],0.375,[12.5,0,0],0.4167,[10.83,0,0],0.5,[0,0,0]],rpaw,12.5,0,0);
				animation_rotation_walk(entity,walking_timer,[0.0,[-10,0,0],0.125,[-52.5,0,0],0.25,[0,0,0],0.375,[50,0,0],0.5,[-10,0,0]],lleg1,-5,0,0);
				animation_rotation_walk(entity,walking_timer,[0.0,[25,0,0],0.0417,[25,0,0],0.125,[10,0,0],0.25,[0,0,0],0.375,[-57.5,0,0],0.4167,[-10,0,0],0.4583,[2.5,0,0],0.5,[25,0,0]],lleg2,57.5,0,0);
				animation_rotation_walk(entity,walking_timer,[0.0,[0,0,0],0.0417,[6.66,0,0],0.125,[57.5,0,0],0.25,[0,0,0],0.375,[37.5,0,0],0.4167,[13.33,0,0],0.4583,[-5.84,0,0],0.5,[0,0,0]],lleg3,-65,0,0);
				animation_rotation_walk(entity,walking_timer,[0.0,[-12.66,0,0],0.125,[12.5,0,0],0.1667,[10.83,0,0],0.25,[0,0,0],0.3333,[-13.05,0,0],0.375,[2.92,0,0],0.4167,[-6.94,0,0],0.5,[-12.66,0,0]],lpaw,12.5,0,0);
			}
			left_arm_c.setPosition(Math.abs(Math.sin(0.175*body_angle)), walking_bump, -1*Math.sin(0.175*body_angle));
			right_arm_c.setPosition(-1*Math.abs(Math.sin(0.175*body_angle)), walking_bump, Math.sin(0.175*body_angle));
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
		rleg1.setRotation(-5, 0,0);
		rleg2.setRotation(57.5, 0, 0);
		rleg3.setRotation(-65, 0,0);
		lleg1.setRotation(-5, 0,0);
		lleg2.setRotation(57.5, 0, 0);
		lleg3.setRotation(-65, 0,0);
		rpaw.setRotation(12.5, 0,0);
		lpaw.setRotation(12.5, 0,0);
	}
	if (entity.getPose() == "crouching" && !isrealywalking) {
		rleg1.setRotation(-25,0,0);
		rleg2.setRotation(97.5,0, 0);
		rleg3.setRotation(-85, 0,0);
		lleg1.setRotation(-25,0,0);
		lleg2.setRotation(97.5,0, 0);
		lleg3.setRotation(-85, 0,0);
		rpaw.setRotation(12.5, 0,0);
		lpaw.setRotation(12.5, 0,0);
	}
	if (entity.isRiding() && !isrealywalking) {
		lleg1.setRotation(-20,-85,0);
		lleg2.setRotation(97.5,0, 0);
		lleg3.setRotation(25, 0,0);
		lpaw.setPositionZ(0);
		rleg1.setRotation(-20,85,0);
		rleg2.setRotation(97.5,0, 0);
		rleg3.setRotation(25, 0,0);
		rpaw.setPositionZ(0);
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