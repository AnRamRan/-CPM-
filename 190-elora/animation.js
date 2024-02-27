/*===== Library =====*/
var q={};
function setScale(m,b,x,y,z) {
    var bone = m.getBone(b);
    !isNaN(x)?bone.setScaleX(x):'';
    !isNaN(y)?bone.setScaleY(y):'';
    !isNaN(z)?bone.setScaleZ(z):'';
}
function setRotation(m,b,x,y,z) {
    var bone = m.getBone(b);
    !isNaN(x)?bone.setRotationX(x):'';
    !isNaN(y)?bone.setRotationY(y):'';
    !isNaN(z)?bone.setRotationZ(z):'';
}
function setPosition(m,b,x,y,z) {
    var bone = m.getBone(b);
    !isNaN(x)?bone.setPositionX(x):'';
    !isNaN(y)?bone.setPositionY(y):'';
    !isNaN(z)?bone.setPositionZ(z):'';
}
/*===== Code =====*/
function init(entity, model) {
		/*Физика*/
		model.getBone("ear_right").physicalize(0.5, 4, 0.5, 0.5, 0.3);
		model.getBone("ear_left").physicalize(0.5, 4, 0.5, 0.5, 0.3);
		model.getBone("tale").physicalize(0.5, 9, 0.8, 0.5, -1);
		model.getBone("tale_1").physicalize(0.5, 9, 0.5, 0.5, -1);
		model.getBone("tale_2").physicalize(0.5, 9, 0.5, 0.5, -1);
		/*броня*/
		//нагрудник торс
		setScale(model,"builtin_chestplate_body_body",0.8,0.8,1);
		setPosition(model,"builtin_chestplate_body_body",0,-1,-0.1);
		//нагрудник наплечи
		setScale(model,"builtin_chestplate_left_left_arm",0.6,0.6,0.6);
		setPosition(model,"builtin_chestplate_left_left_arm",0,-1.8,0);
		setScale(model,"builtin_chestplate_right_right_arm",0.6,0.6,0.6);
		setPosition(model,"builtin_chestplate_right_right_arm",0,-1.8,0);
		//штаны ноги
		setScale(model,"builtin_leggings_left_left_leg",0.82,0.82,0.82);
		setScale(model,"builtin_leggings_right_right_leg",0.82,0.82,0.82);
		//setRotation(model,"builtin_leggings_left_left_leg",-30,10,-5);
		//setRotation(model,"builtin_leggings_right_right_leg",-30,-10,5);
		//шатны пояс builtin_leggings_body_body
		setScale(model,"builtin_leggings_body_body",0.9,0.8,0.9);
		setPosition(model,"builtin_leggings_body_body",0,-2.5,-2.3);
		setRotation(model,"builtin_leggings_body_body",15,0,0);
		//боты
		setScale(model,"builtin_boots_left_left_leg",0.6,0.6,0.6);
		setScale(model,"builtin_boots_right_right_leg",0.6,0.6,0.6);
		/*предмет в руках*/
		setScale(model,"builtin_item_left_left_arm",0.8,0.8,0.8);
		setScale(model,"builtin_item_right_right_arm",0.8,0.8,0.8);
		setPosition(model,"builtin_item_left_left_arm",0.5,-12,-1.5);
		setPosition(model,"builtin_item_right_right_arm",-0.5,-12,-1.5);
}
function tick(entity, model) {
	if (entity.getPose()=="crouching"){
		setRotation(model,"right_leg_c",-70,5,5);
		setPosition(model,"right_leg_c",0,-0.8,0);
		setRotation(model,"right_leg_c_1",130,0,-2.5);
		setPosition(model,"right_leg_c_1",0,-4.5,1);
		setRotation(model,"left_leg_c",-70,-5,-5);
		setPosition(model,"left_leg_c",0,-0.8,0);
		setRotation(model,"left_leg_c_1",130,0,2.5);
		setPosition(model,"left_leg_c_1",0,-4.5,1);
		//Бронь
		setRotation(model,"builtin_leggings_left_left_leg",-70+180,-5,-5);
		setRotation(model,"builtin_leggings_right_right_leg",-70+180,5,5);
		setPosition(model,"builtin_leggings_left_left_leg",0.7,-2.8,-5.5);
		setPosition(model,"builtin_leggings_right_right_leg",-0.7,-2.8,-5.5);

		setPosition(model,"builtin_boots_left_left_leg",0.5,-2.3,-1.1);
		setPosition(model,"builtin_boots_right_right_leg",-0.5,-2.3,-1.1);
		setRotation(model,"builtin_boots_left_left_leg",-1,-2.4,-1.8);
		setRotation(model,"builtin_boots_right_right_leg",-1,2.4,1.8);

	}
	if (entity.getPose()=="standing") {
		setRotation(model,"right_leg_c",-30,-10,5);
		setPosition(model,"right_leg_c",0,0,0);
		setRotation(model,"right_leg_c_1",80,0,0);
		setPosition(model,"right_leg_c_1",0,-6,0);
		setRotation(model,"left_leg_c",-30,10,-5);
		setPosition(model,"left_leg_c",0,0,0);
		setRotation(model,"left_leg_c_1",80,0,0);
		setPosition(model,"left_leg_c_1",0,-6,0);
		//Броня
		setRotation(model,"builtin_leggings_left_left_leg",-30+180,10,-5);
		setRotation(model,"builtin_leggings_right_right_leg",-30+180,-10,5);
		// setPosition(model,"builtin_leggings_left_left_leg",0,0.9,0.5);
		// setPosition(model,"builtin_leggings_right_right_leg",0,0.9,0.5);
		setPosition(model,"builtin_leggings_left_left_leg",-0.1,-5,-2.8);
		setPosition(model,"builtin_leggings_right_right_leg",0.1,-5,-2.8);

		setPosition(model,"builtin_boots_left_left_leg",0.8,-4.9,0.3);
		setPosition(model,"builtin_boots_right_right_leg",-0.8,-4.9,0.3);
		setRotation(model,"builtin_boots_left_left_leg",-15,8,0);
		setRotation(model,"builtin_boots_right_right_leg",-15,-8,0);
	}
}