
var toggle = true;
$('.flip-container').on('click',function(){
	var self = $(this);
	flipCard(self);
	self.data('isfront', !self.data('isfront') )
})

function flipCard(self){
	var x = self.data('isfront') ? {transform: 'rotateY(180deg)'}:{transform: 'rotateY(0deg)'}
	$('#'+ self.attr('id')+ ' >  .flipper').css(x)
}

function words(){
	$('.flip-container').data('isfront', true )
	$('.flip-container .flipper').css({transform: 'rotateY(0deg)'})
}
function defintions(){
	$('.flip-container').data('isfront', false )
	$('.flip-container .flipper').css({transform: 'rotateY(180deg)'})
}
