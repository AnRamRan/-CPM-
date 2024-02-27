var tail;
var swing = 0.0;

function init(entity, model)
{
	model.getBone("taildown").physicalize(0, 3, 0.6, 0, 0);
	model.getBone("tailmiddle").physicalize(0, 4, 0.7, 0, 0);
}

function tick(entity, model) {
    model.getBone("taildown").setRotationY(10*Math.cos(swing/10));
	swing = swing + 1;
	if (entity.getSwingProgress()!=0) {
		model.getBone("right_arm_c").setRotation(0,0,0);
		swing=swing+10;
	}
}