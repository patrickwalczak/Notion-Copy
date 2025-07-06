type OperationsType =
	| { name: 'duplicate'; options?: { 0: { name: 'withContent' }; 1: { name: 'withoutContent' } } }
	| { name: 'copyParentLink' }
	| { name: 'color' }
	| { name: 'delete' }
	| { name: 'turnInto' }
	| { name: 'rename' }
	| { name: 'move' }
	| { name: 'addToFavorites' }
	| { name: 'copyLink' }
	| { name: 'turnIntoInlineDatabase' }
	| { name: 'editIcon' }
	| { name: 'lockDatabase' }
	| { name: 'undo' }
	| { name: 'export' }
	| { name: 'import' }
	| { name: 'lockPage' };
