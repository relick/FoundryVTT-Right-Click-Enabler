class RightClickEnabler
{
	static patchGame()
	{
		const fnStr = Game.prototype.activateListeners.toString();
		const patchedFnStr = fnStr.replace(`document.addEventListener("contextmenu", ev => ev.preventDefault());`, ``);
		Game.prototype.activateListeners = Function('"use strict"; return (function ' + patchedFnStr + ')')();
	}

	static ready()
	{
		// Canvas doesn't handle global right-click being re-enabled properly (still true as of V12)
		const canvas = document.getElementById("board");
		canvas.addEventListener("contextmenu", (ev) => ev.preventDefault(), { capture: true });
	}
};

// The Game class has to be patched pre-init
RightClickEnabler.patchGame();
Hooks.once("ready", RightClickEnabler.ready);