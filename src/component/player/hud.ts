class Hud {
	// $('#fight-size').change(function() {
	// 	game.toggleSize()
	// 	hud.updateSettings()
	// })
	// $('#fight-debug').change(function() {
	// 	game.toggleDebug()
	// })
	// $('#fight-tactic').change(function() {
	// 	game.toggleTactic()
	// })
	// $('#fight-cells').change(function() {
	// 	game.toggleCells()
	// })
	// $('#fight-lifes').change(function() {
	// 	game.toggleLifes()
	// })
	// $('#fight-discrete-pause').change(function() {
	// 	game.toggleDiscretePause()
	// })
	// $('#fight-quality').change(function() {
	// 	game.toggleShadows()
	// })

	// var updateSoundSetting = function() {
	// 	if (game.sound) {
	// 		$('#sound-setting img').attr('src', LW.staticURL + 'image/icon/sound.png')
	// 		$('#sound-setting .icon').text('volume_up')
	// 		$('#sound-setting span').text(_.lang.get('fight', 'sound_activated'))
	// 	} else {
	// 		$('#sound-setting img').attr('src', LW.staticURL + 'image/icon/no_sound.png')
	// 		$('#sound-setting .icon').text('volume_mute')
	// 		$('#sound-setting span').text(_.lang.get('fight', 'sound_disactivated'))
	// 	}
	// }

	// $('#progress-bar').mousemove(function(e) {
	// 	var tooltip = $('#progress-bar-turn')
	// 	var turn = 0
	// 	var pos = (e.pageX - $(this).offset().left) / $(this).width()

	// 	for (var i in game.turnPosition) {
	// 		if (game.turnPosition.hasOwnProperty(i) && pos >= game.turnPosition[i]) {
	// 			turn = i
	// 		}
	// 	}
	// 	var margin = Math.min(Math.max((e.pageX - $(this).offset().left) - (tooltip.outerWidth() / 2), 0), $(this).outerWidth() - tooltip.outerWidth())
	// 	tooltip.find('.content').text(_.lang.get('fight', 'turn_n', turn))
	// 	tooltip.css('margin-left', margin)
	// })

	// $('#progress-bar').hover(function() {
	// 	$('#progress-bar-turn').show()
	// }, function() {
	// 	$('#progress-bar-turn').hide()
	// })

	public addLog(log: string[]) {
		let div = "<div class='action'>"
		for (let i = 0; i < log.length; i += 2) {
			const text = log[i]
			const color = log[i + 1]
			div += "<span style='color: " + color + ";'>" + text + "</span>"
		}
		div += "</div>"
		this.addActionInternal(div)
	}

	public addPersonalLog(log: any) {

	// 	var leek = game.leeks[log[0]];
	// 	var color = (new Array("black", "orange", "red"))[log[1] - 1];
	// 	if (log.length > 3) color = _.colorToHex(log[3])
	// 	var message = log[2];

	// 	var div = "<div class='action log'>"
	//     div += "<pre style='color: " + color + ";'>" + "[" + leek.name + "] " + message + "</pre>";
	// 	div += "</div>"

	// 	this.addActionInternal(div)
	}

	public addActionInternal(actionDiv: any) {
		// var actions = $("#actions")
		// actions.append(actionDiv)

		// if (actions.height() > $('#left-part').height()) {
		// 	actions.children().first().remove()
		// }
		// var margin = Math.min(0, $('#layers').height() - actions.height() - 120)
		// actions.css('margin-top', margin)
	}

	public draw() {

		/// Bottom part
		// if (game.speed > 1 && !game.paused) {
		// 	this.speedButtonFrame += dt;
		// 	if (this.speedButtonFrame > 50) {
		// 		this.speedButtonFrame = 0;
		// 		this.speedButtonVisible = !this.speedButtonVisible * 1.0;
		// 		$('#speed-button').css('opacity', this.speedButtonVisible);
		// 	}
		// }

		/// Mouse hover
		// document.body.style.cursor = ''

		// if (game.going_to_report) return null

		// var selected_entity = null
		// document.body.style.cursor = 'default'
		// for (var i in game.leeks) {
		// 	var leek = game.leeks[i];
		// 	if (leek.isDead() || !leek.active) continue;
		// 	if (game.showLifes) {
		// 		leek.drawName()
		// 	}
		// 	if (game.mouseCell == leek.cell || game.mouseCell == leek.cell - 35 || game.mouseCell == leek.cell - 17 || game.mouseCell == leek.cell - 18) {
		// 		if (!game.showLifes) {
		// 			leek.drawName()
		// 		}
		// 		document.body.style.cursor = 'pointer';
		// 	}
		// 	if (game.mouseCell == leek.cell) {
		// 		selected_entity = leek.id
		// 	}
		// }
		// if (this.selected_entity != selected_entity) {
		// 	this.selected_entity = selected_entity
		// 	$('#details .entity-details').hide()
		// 	if (selected_entity !== null) {
		// 		var p = $('#timeline .entity[entity=' + selected_entity + ']').offset()
		// 		$('#details .entity-details[entity=' + selected_entity + ']').css('margin-left', p.left - $('#game').offset().left - 125).show()
		// 	}
		// }
	}
}
