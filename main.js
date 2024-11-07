class RightClickEnabler
{
	static patchGame()
	{
		const fnStr = Game.prototype.activateListeners.toString();
		const patchedFnStr = fnStr.replace(`document.addEventListener("contextmenu", ev => ev.preventDefault());`, ``);
		Game.prototype.activateListeners = Function('"use strict"; return (function ' + patchedFnStr + ')')();
	}
};

// The Game class has to be patched pre-init
RightClickEnabler.patchGame();