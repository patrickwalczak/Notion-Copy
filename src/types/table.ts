type ColumnTypesType =
	| 'name'
	| 'text'
	| 'number'
	| 'select'
	| 'date'
	| 'status'
	| 'checkbox'
	| 'multiSelect'
	| 'description';

type ColumnOperationsType =
	| { name: 'editProperty'; options?: {} }
	| { name: 'changeType' }
	| { name: 'filter' }
	| { name: 'sort'; options?: {} }
	| { name: 'group' }
	| { name: 'freeze' }
	| { name: 'hide' }
	| { name: 'unwrapText' }
	| { name: 'wrapText' }
	| { name: 'insertLeft' }
	| { name: 'insertRight' }
	| { name: 'duplicate' }
	| { name: 'delete' };
