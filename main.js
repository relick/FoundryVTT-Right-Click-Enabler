class RightClickEnabler
{
	static patchGame()
	{
		const classStr = Game.toString();
		const patchedClassStr = classStr.replace(`document.addEventListener("contextmenu", ev => ev.preventDefault());`, ``);
		Game = Function('"use strict"; return (' + patchedClassStr + ')')();
	}

	static ready()
	{
		// Canvas doesn't handle global right-click being re-enabled properly (still true as of 0.7.9)
		const canvas = document.getElementById("board");
		canvas.addEventListener("contextmenu", (ev) => ev.preventDefault(), { capture: true });
	}
};

// The Game class has to be patched pre-init
RightClickEnabler.patchGame();
Hooks.once("ready", RightClickEnabler.ready);