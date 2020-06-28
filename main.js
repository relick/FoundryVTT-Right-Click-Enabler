class RightClickEnabler
{
	static patchGame()
	{
		const classStr = Game.toString();
		const patchedClassStr = classStr.replace(`document.addEventListener("contextmenu", ev => ev.preventDefault());`, ``);
		Game = Function('"use strict"; return (' + patchedClassStr + ')')();
	}
		
	static init()
	{
		// Canvas doesn't handle global right-click being re-enabled properly in 0.6.4
		var oldCanvas = Canvas;
		Canvas = class extends oldCanvas
		{
			constructor()
			{
				super();
				const canvas = document.getElementById("board");
				canvas.addEventListener("contextmenu", (ev) => ev.preventDefault(), { capture: true });
			}
		}
	}
};

// The Game class has to be patched pre-init
RightClickEnabler.patchGame();
Hooks.once("init", RightClickEnabler.init);